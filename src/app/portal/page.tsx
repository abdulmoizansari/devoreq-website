"use client";
import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";
import { supabase } from "@/lib/supabase";



const NAV = [
  { icon: "ti-layout-dashboard", label: "Dashboard", key: "dashboard" },
  { icon: "ti-books", label: "My Projects", key: "projects" },
  { icon: "ti-folder", label: "Files", key: "files" },
  { icon: "ti-messages", label: "Messages", key: "messages" },
  { icon: "ti-file-invoice", label: "Invoices", key: "invoices" },
  { icon: "ti-settings", label: "Settings", key: "settings" },
];

function PortalPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("dashboard");

  // Email login state
  const [email, setEmail] = useState("");
  const [loginStatus, setLoginStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginStatus("loading");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + "/portal" }
    });
    if (error) {
      alert(error.message);
      setLoginStatus("idle");
    } else {
      setLoginStatus("success");
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/portal" }
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) return <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-[#64748B]">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] grid place-items-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 border border-[#E2E8F0]">
          <div className="flex justify-center mb-6"><Logo variant="light" /></div>
          <h1 className="font-serif text-2xl text-[#0F172A] text-center">Welcome back</h1>
          <form onSubmit={handleEmailLogin} className="mt-6 space-y-4">
            <input 
              type="email" 
              placeholder="Email address" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-[#E2E8F0] px-3 py-3 text-sm focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] outline-none transition-all" 
            />
            <button disabled={loginStatus !== "idle"} className="btn-gold w-full justify-center">
              {loginStatus === "loading" ? "Sending Link..." : loginStatus === "success" ? "Check Your Email!" : "Continue with Email"}
            </button>
            <div className="flex items-center gap-3 text-xs text-[#64748B] pt-2"><div className="flex-1 h-px bg-[#E2E8F0]" />or<div className="flex-1 h-px bg-[#E2E8F0]" /></div>
            <button type="button" onClick={handleGoogleLogin} className="w-full border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors rounded-md py-3 text-sm flex items-center justify-center gap-2">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" /> 
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      <aside className="w-60 bg-[#F8FAFC] text-[#0F172A] flex flex-col p-5">
        <Logo />
        <nav className="mt-8 flex-1 space-y-1">
          {NAV.map((n) => (
            <button key={n.key} onClick={() => setTab(n.key)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm ${tab === n.key ? "bg-[#38BDF8]/10 text-[#38BDF8]" : "text-[#0F172A]/70 hover:bg-white"}`}>
              <i className={`ti ${n.icon}`} />{n.label}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} className="text-sm text-[#64748B] flex items-center gap-2 hover:text-[#0F172A]"><i className="ti ti-logout" /> Logout</button>
      </aside>

      <main className="flex-1 p-10 overflow-x-hidden">
        {tab === "dashboard" && <Dashboard />}
        {tab === "projects" && <Section title="My Projects"><Project /></Section>}
        {tab === "files" && <FilesView />}
        {tab === "messages" && <MessagesView />}
        {tab === "invoices" && <InvoicesView />}
        {tab === "settings" && <Section title="Settings"><p className="text-sm text-[#64748B]">Account settings.</p></Section>}
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h1 className="font-serif text-3xl text-[#0F172A] mb-6">{title}</h1>{children}</div>;
}

function Dashboard() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user));
  }, []);

  return (
    <>
      <h1 className="font-serif text-3xl text-[#0F172A]">Welcome back{user ? `, ${user.user_metadata?.full_name || user.email?.split("@")[0]}` : ""}</h1>
      <p className="text-sm text-[#64748B] mt-1">Here's where your projects stand today.</p>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Project />
          <Project title="The Lantern Keeper" pm="Mara Iqbal" progress={42} milestone="Cover Design, Round 2" />
        </div>
        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
          <h3 className="font-semibold text-[#0F172A]">Notifications</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {[["Cover round 2 ready for review", "2h ago"], ["Invoice INV-1042 paid", "1d ago"], ["Ghostwriter delivered Ch. 7", "2d ago"]].map(([t, ts]) => (
              <li key={t} className="border-b border-[#E2E8F0] pb-2"><div className="text-[#0F172A]">{t}</div><div className="text-xs text-[#64748B]">{ts}</div></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {[["ti-folder", "Recent Files", "12 new"], ["ti-messages", "Unread Messages", "3"], ["ti-file-invoice", "Next Invoice Due", "$1,250"]].map(([i, l, v]) => (
          <div key={l} className="bg-white rounded-xl p-5 border border-[#E2E8F0] flex items-center gap-4">
            <i className={`ti ${i} text-2xl text-[#38BDF8]`} />
            <div><div className="text-xs text-[#64748B]">{l}</div><div className="font-serif text-lg text-[#0F172A]">{v}</div></div>
          </div>
        ))}
      </div>
    </>
  );
}

function Project({ title = "The Quiet Algorithm", pm = "James Hale", progress = 68, milestone = "Manuscript editing, Ch. 12" }: { title?: string; pm?: string; progress?: number; milestone?: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-serif text-xl text-[#0F172A]">{title}</h3>
          <div className="text-xs text-[#64748B] mt-1">PM: {pm} · {milestone}</div>
        </div>
        <span className="text-xs px-2 py-1 rounded bg-[#38BDF8]/10 text-[#0F172A]">In Progress</span>
      </div>
      <div className="mt-5 h-2 bg-black/5 rounded-full overflow-hidden">
        <div className="h-full bg-[#38BDF8]" style={{ width: `${progress}%` }} />
      </div>
      <div className="text-xs text-[#64748B] mt-2">{progress}% complete</div>
    </div>
  );
}

function FilesView() {
  const folders = ["Manuscripts", "Covers", "Audio", "Marketing Assets", "Invoices"];
  return (
    <Section title="Files">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {folders.flatMap((f) => [1, 2].map((i) => (
          <div key={f + i} className="bg-white rounded-xl p-5 border border-[#E2E8F0]">
            <div className="text-xs uppercase tracking-wider text-[#64748B]">{f}</div>
            <div className="mt-1 font-medium text-[#0F172A]">{f.toLowerCase().replace(" ", "_")}_v{i}.pdf</div>
            <div className="text-xs text-[#64748B]">May 10, 2026 · 2.4 MB</div>
            <button className="btn-gold mt-3 text-xs">Download</button>
          </div>
        )))}
      </div>
    </Section>
  );
}

function MessagesView() {
  return (
    <Section title="Messages">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-4 max-w-2xl">
        {[["James Hale", "Round 2 cover is uploaded, let me know your thoughts.", "10:42 AM"], ["You", "Looks great. Let's push to print.", "11:08 AM"], ["James Hale", "Sending to IngramSpark today.", "11:12 AM"]].map(([who, msg, ts], i) => (
          <div key={i} className={`max-w-[80%] ${who === "You" ? "ml-auto text-right" : ""}`}>
            <div className={`inline-block px-4 py-2 rounded-lg text-sm ${who === "You" ? "bg-[#F8FAFC] text-[#0F172A]" : "bg-[#F8FAFC] text-[#0F172A]"}`}>{msg}</div>
            <div className="text-xs text-[#64748B] mt-1">{who} · {ts}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function InvoicesView() {
  const rows: [string, string, string, "Paid" | "Pending" | "Overdue"][] = [
    ["INV-1042", "May 1, 2026", "$1,250", "Paid"],
    ["INV-1041", "Apr 15, 2026", "$2,499", "Paid"],
    ["INV-1040", "Apr 1, 2026", "$999", "Pending"],
    ["INV-1039", "Mar 10, 2026", "$1,200", "Overdue"],
  ];
  const color = { Paid: "text-emerald-600 bg-emerald-50", Pending: "text-amber-600 bg-amber-50", Overdue: "text-rose-600 bg-rose-50" } as const;
  return (
    <Section title="Invoices">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 mb-6 flex items-center justify-between">
        <div><div className="text-xs text-[#64748B]">Outstanding Balance</div><div className="font-serif text-3xl text-[#0F172A]">$2,199</div></div>
        <button className="btn-gold text-sm">Pay Now</button>
      </div>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F8FAFC] text-left text-[#64748B]">
            <tr><th className="px-4 py-3">Invoice</th><th>Date</th><th>Amount</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {rows.map(([n, d, a, s]) => (
              <tr key={n} className="border-t border-[#E2E8F0]">
                <td className="px-4 py-3 font-medium text-[#0F172A]">{n}</td>
                <td>{d}</td><td>{a}</td>
                <td><span className={`px-2 py-0.5 rounded text-xs ${color[s]}`}>{s}</span></td>
                <td className="text-right pr-4"><a href="#" className="text-[#38BDF8]">PDF</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

export default PortalPage;
