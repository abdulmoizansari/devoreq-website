import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { BRAND, SERVICES } from "@/lib/site";

const Facebook = ({ size = 24, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Instagram = ({ size = 24, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const Twitter = ({ size = 24, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const Linkedin = ({ size = 24, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const Youtube = ({ size = 24, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2.5 7.1C2.6 5 4.3 3.3 6.4 3.1 9.8 2.8 14.2 2.8 17.6 3.1c2.1.2 3.8 1.9 3.9 4 .2 1.6.2 3.2.2 4.9 0 1.7 0 3.3-.2 4.9-.1 2.1-1.8 3.8-3.9 4-3.4.3-7.8.3-11.2 0-2.1-.2-3.8-1.9-3.9-4-.2-1.6-.2-3.2-.2-4.9 0-1.7 0-3.3.2-4.9z"/><path d="m10 15 5-3-5-3v6z"/></svg>
);

export function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, interest: "Newsletter", source: "footer" }),
      });
      setStatus("success");
      setName("");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("idle");
    }
  };

  return (
    <footer className="bg-[#F8FAFC] text-[#0F172A]/70">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 font-serif italic text-[#0F172A]/80">{BRAND.tagline}</p>
          <div className="mt-5 flex gap-3 text-[#38BDF8] text-lg">
            <a href="https://www.facebook.com/profile.php?id=61581005583169" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="https://www.instagram.com/devoreq_/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="https://www.linkedin.com/company/devoreq/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
          </div>
          <div className="mt-5 text-sm text-[#0F172A]/70 flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>108 W 13th St, Wilmington,<br/>DE 19801, USA 🇺🇸</span>
          </div>
        </div>

        <div>
          <h4 className="text-[#0F172A] text-sm font-semibold mb-4 tracking-wide">Services</h4>
          <ul className="space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}><Link href="/services" className="hover:text-[#38BDF8] transition-colors">{s.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[#0F172A] text-sm font-semibold mb-4 tracking-wide">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-[#38BDF8]">About</Link></li>
            <li><Link href="/portfolio" className="hover:text-[#38BDF8]">Portfolio</Link></li>
            <li><Link href="/blog" className="hover:text-[#38BDF8]">Blog</Link></li>
            <li><Link href="/testimonials" className="hover:text-[#38BDF8]">Testimonials</Link></li>
            <li><Link href="/faq" className="hover:text-[#38BDF8]">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-[#38BDF8]">Contact</Link></li>
            <li><Link href="/portal" className="hover:text-[#38BDF8]">Client Portal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#0F172A] text-sm font-semibold mb-4 tracking-wide">Get publishing tips weekly</h4>
          <form className="space-y-3" onSubmit={handleSubscribe}>
            <input required value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your name" className="w-full rounded-md bg-white border border-[#E2E8F0] px-3 py-2 text-sm placeholder:text-[#64748B] focus:outline-none focus:border-[#38BDF8]" />
            <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com" className="w-full rounded-md bg-white border border-[#E2E8F0] px-3 py-2 text-sm placeholder:text-[#64748B] focus:outline-none focus:border-[#38BDF8]" />
            <button disabled={status !== "idle"} className="btn-gold w-full justify-center text-sm">
              {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-[#0EA5E9]/30">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
          <div>© 2025 {BRAND.name}. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[#38BDF8]">Privacy Policy</a>
            <a href="#" className="hover:text-[#38BDF8]">Terms of Service</a>
            <a href="#" className="hover:text-[#38BDF8]">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
