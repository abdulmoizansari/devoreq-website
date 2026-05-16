import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { NAV_LINKS } from "@/lib/site";
import { Menu, X, User } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Check Auth Session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "h-14 backdrop-blur bg-[#F8FAFC]/85 border-b border-white/5" : "h-[72px] bg-[#F8FAFC]/60"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center"><Logo /></Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              className={`nav-link ${path === l.to ? "active text-[#0F172A]" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <Link href="/portal" className="btn-gold flex items-center gap-2 text-sm">
              <User size={16} />
              Dashboard
            </Link>
          ) : (
            <>
              <button onClick={() => window.dispatchEvent(new Event("openLeadModal"))} className="nav-link text-[#0F172A] font-medium text-sm">Sign In</button>
              <Link href="/contact" className="btn-gold text-sm">Start Your Project</Link>
            </>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden text-[#0F172A]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-[#F8FAFC] border-t border-white/5 px-6 py-6">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <Link key={l.to} href={l.to} className="text-[#0F172A]/85 text-base">{l.label}</Link>
            ))}
            {user ? (
              <Link href="/portal" className="btn-gold w-fit text-sm mt-2 flex items-center gap-2">
                <User size={16} /> Dashboard
              </Link>
            ) : (
              <>
                <button onClick={() => window.dispatchEvent(new Event("openLeadModal"))} className="text-[#0F172A]/85 text-base text-left">Sign In</button>
                <Link href="/contact" className="btn-gold w-fit text-sm mt-2">Start Your Project</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
