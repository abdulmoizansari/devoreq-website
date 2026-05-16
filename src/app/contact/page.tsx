"use client";
import { useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { PageHeader, useReveal } from "@/components/Section";
import { SERVICES } from "@/lib/site";



import { supabase } from "@/lib/supabase";

function ContactPage() {
  const ref = useReveal<HTMLDivElement>();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState(SERVICES[0].slug);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("Under $1,000");
  const [timeline, setTimeline] = useState("ASAP");
  const [brief, setBrief] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const interestData = `Service: ${service} | Budget: ${budget} | Timeline: ${timeline} | Phone: ${phone} | Brief: ${brief}`;

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          email, 
          interest: interestData, 
          source: "project-brief" 
        }),
      });

      // Auto-create their client portal account
      await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin + "/portal" }
      });

      setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteShell>
      <div ref={ref}>
        <PageHeader title="Tell Us About Your Project." subtitle="We reply within 2 business hours, 7 days a week." />

        <section className="bg-[#F8FAFC] py-16">
          <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-10">
            <div className="reveal bg-white rounded-2xl p-8 border border-[#E2E8F0]">
              {sent ? (
                <div className="text-center py-12">
                  <i className="ti ti-circle-check text-6xl text-[#38BDF8]" />
                  <h3 className="font-serif text-2xl text-[#0F172A] mt-3">Brief received.</h3>
                  <p className="text-sm text-[#64748B] mt-2">We have sent a secure magic link to your email. Click it to access your Client Portal and track this project.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs text-[#64748B]">What service are you interested in?</label>
                    <select value={service} onChange={(e) => setService(e.target.value)} className="mt-1 w-full rounded-md border border-[#E2E8F0] px-3 py-2 text-sm bg-white">
                      {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#64748B]">Full name</label>
                      <input type="text" required value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full rounded-md border border-[#E2E8F0] px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-[#64748B]">Email</label>
                      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-[#E2E8F0] px-3 py-2 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#64748B]">Phone (with country code)</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 w-full rounded-md border border-[#E2E8F0] px-3 py-2 text-sm" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#64748B]">Estimated budget</label>
                      <select value={budget} onChange={e => setBudget(e.target.value)} className="mt-1 w-full rounded-md border border-[#E2E8F0] px-3 py-2 text-sm bg-white">
                        <option>Under $1,000</option><option>$1,000 – $5,000</option><option>$5,000 – $15,000</option><option>$15,000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-[#64748B]">Preferred timeline</label>
                      <select value={timeline} onChange={e => setTimeline(e.target.value)} className="mt-1 w-full rounded-md border border-[#E2E8F0] px-3 py-2 text-sm bg-white">
                        <option>ASAP</option><option>1–2 months</option><option>3–6 months</option><option>Flexible</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#64748B]">Project brief</label>
                    <textarea required value={brief} onChange={e => setBrief(e.target.value)} rows={4} className="mt-1 w-full rounded-md border border-[#E2E8F0] px-3 py-2 text-sm" placeholder="Tell us about your book or campaign." />
                  </div>
                  <button disabled={loading} className="btn-gold w-full justify-center">
                    {loading ? "Processing..." : "Send My Project Brief"}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="reveal bg-white rounded-2xl p-8 border border-[#E2E8F0]">
                <h3 className="font-serif text-xl text-[#0F172A]">Prefer to talk?</h3>
                <p className="text-sm text-[#64748B] mt-1">Book a free 30-minute discovery call.</p>
                <div className="mt-4 aspect-video rounded-md bg-[#F8FAFC] grid place-items-center text-[#64748B] text-sm">Calendly embed</div>
              </div>
              <div className="reveal bg-[#F8FAFC] text-[#0F172A] rounded-2xl p-8">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2"><i className="ti ti-mail text-[#38BDF8]" /> hello@devoreq.com</div>
                  <div className="flex items-center gap-2"><i className="ti ti-brand-whatsapp text-[#38BDF8]" /> WhatsApp: +1 (555) 010-2025</div>
                  <div className="flex items-center gap-2"><i className="ti ti-clock text-[#38BDF8]" /> We reply within 2 business hours</div>
                </div>
                <div className="mt-5 flex gap-3 text-[#38BDF8] text-lg">
                  <a href="#" aria-label="Facebook"><i className="ti ti-brand-facebook" /></a>
                  <a href="#" aria-label="Instagram"><i className="ti ti-brand-instagram" /></a>
                  <a href="#" aria-label="X"><i className="ti ti-brand-x" /></a>
                  <a href="#" aria-label="LinkedIn"><i className="ti ti-brand-linkedin" /></a>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-6 mt-10">
            <div className="reveal h-64 rounded-2xl bg-white border border-[#E2E8F0] grid place-items-center text-[#64748B] text-sm">Google Maps, Devoreq HQ</div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <div>
      <label className="text-xs text-[#64748B]">{label}</label>
      <input type={type} required className="mt-1 w-full rounded-md border border-[#E2E8F0] px-3 py-2 text-sm" />
    </div>
  );
}

export default ContactPage;
