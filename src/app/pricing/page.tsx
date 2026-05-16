"use client";
import Link from "next/link";
import { useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { PageHeader, SectionTitle, useReveal } from "@/components/Section";
import { PRICING_PLANS } from "@/lib/site";

const COMPARISON = [
  ["Cover Design", "Standard", "Premium", "Premium+", "Custom"],
  ["eBook Formatting", "✓", "✓", "✓", "✓"],
  ["Paperback Formatting", "-", "✓", "✓", "✓"],
  ["Hardcover Formatting", "-", "-", "✓", "✓"],
  ["Ghostwriting Support", "-", "-", "Partial", "Full"],
  ["Publishing Platforms", "3", "8", "All Major", "Custom"],
  ["Audiobook Support", "-", "-", "✓", "✓"],
  ["Book Trailer", "-", "Basic", "Cinematic", "Premium"],
  ["Social Media Kit", "-", "✓", "✓", "✓"],
  ["Marketing Support", "-", "Basic", "Advanced", "Ongoing"],
  ["Author Website", "-", "-", "Standard", "AI-Powered"],
  ["Dedicated Project Manager", "-", "-", "-", "✓"],
];

const ADDONS = [
  ["Hardcover Formatting", "$99"],
  ["Additional Revisions", "$79"],
  ["Amazon A+ Content", "$149"],
  ["Author Logo Design", "$99"],
  ["TikTok/Reels Package", "$199"],
  ["Press Release Kit", "$199"],
  ["ARC Reviewer Campaign", "$299"],
  ["Email Marketing Setup", "$249"],
  ["AI Book Trailer", "$199"],
  ["Launch-Day Marketing Kit", "$399"],
];

const PRICING_FAQ = [
  { q: "Do you offer payment plans?", a: "Yes, 50/50 and milestone plans are available on most engagements." },
  { q: "What's your refund policy?", a: "Milestone-based refunds before the next phase begins. Details in our Refund Policy." },
  { q: "Are revisions included?", a: "Yes, each tier defines a number of rounds. Premium tier is unlimited until approval." },
  { q: "Do you accept international payments?", a: "Yes. USD, EUR, GBP, AUD, CAD, and INR." },
  { q: "What does 'on consultation' mean?", a: "Some services are too custom for a fixed price. We confirm during your free discovery call." },
  { q: "Is there a rush surcharge?", a: "Yes, 30% rush adds priority queue and dedicated capacity." },
  { q: "Do you publish exclusively to Amazon?", a: "No. We publish to all 13 major platforms unless you specifically request Amazon-only." },
  { q: "Can I upgrade between plans?", a: "Yes, any time, you only pay the difference." },
  { q: "Do prices include taxes?", a: "Prices are exclusive of local taxes." },
  { q: "What happens after I pay the deposit?", a: "We kick off within 48 hours with a discovery call and onboarding doc." },
  { q: "Do you offer discounts for series?", a: "Yes, multi-book contracts receive 10–20% off." },
  { q: "What if I'm not happy?", a: "Our 100% Satisfaction Guarantee covers unlimited revisions within the agreed scope." },
];

function PricingPage() {
  const ref = useReveal<HTMLDivElement>();
  const [rush, setRush] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <SiteShell>
      <div ref={ref}>
        <section className="bg-[#F8FAFC] py-24 text-center px-6 border-b border-[#E2E8F0]">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl text-[#0F172A]">Transparent Pricing for Every Author.</h1>
            <p className="mt-4 text-[#64748B] text-lg max-w-2xl mx-auto">
              No hidden fees. No confusing contracts. Just premium-quality publishing services designed for modern authors and creators. Whether you're publishing your first eBook or building a long-term author brand, our packages are designed to scale with your goals.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="btn-gold">Start Your Project</Link>
            </div>
          </div>
        </section>

        <section className="bg-[#F8FAFC] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-8">
              <h3 className="font-serif text-xl text-[#0F172A] mb-4">Choose Your Timeline</h3>
              <div className="inline-flex bg-white rounded-full border border-[#E2E8F0] p-1">
                <button onClick={() => setRush(false)} className={`px-5 py-2 text-sm rounded-full ${!rush ? "bg-[#0EA5E9] text-white" : "text-[#64748B] hover:text-[#0F172A]"}`}>Standard Timeline</button>
                <button onClick={() => setRush(true)} className={`px-5 py-2 text-sm rounded-full ${rush ? "bg-[#0EA5E9] text-white" : "text-[#64748B] hover:text-[#0F172A]"}`}>Rush Delivery (+30%)</button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRICING_PLANS.map((p) => {
                const adj = p.price ? Math.round(p.price * (rush ? 1.3 : 1)) : null;
                return (
                  <div key={p.name} className={`reveal card-hover relative bg-white rounded-2xl p-7 border ${p.popular ? "border-[#0EA5E9] border-2" : "border-[#E2E8F0]"}`}>
                    {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0EA5E9] text-white text-[11px] font-semibold tracking-wider px-3 py-1 rounded-full">MOST POPULAR</div>}
                    <h3 className="font-serif text-2xl text-[#0F172A]">{p.name}</h3>
                    <p className="text-xs text-[#64748B] mt-1">{p.desc}</p>
                    <div className="mt-5 font-serif text-[48px] md:text-[64px] tracking-[-2px] leading-none text-[#0EA5E9]">
                      {adj !== null ? <>${adj.toLocaleString()}</> : <span>Custom</span>}
                    </div>
                    <div className="mt-6">
                      <div className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-3">What's Included</div>
                      <ul className="space-y-2 text-sm text-[#64748B]">
                        {p.features.map((f) => <li key={f} className="flex gap-2 items-start"><i className="ti ti-check text-[#38BDF8] shrink-0 mt-0.5" /><span>{f}</span></li>)}
                      </ul>
                    </div>
                    <Link href="/contact" className="btn-gold mt-7 w-full justify-center text-sm">{p.price ? "Choose Plan" : "Let's Talk"}</Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="bg-white py-20 border-y border-[#E2E8F0]">
          <div className="mx-auto max-w-7xl px-6">
            <SectionTitle eyebrow="Compare" title="Feature Comparison" />
            <div className="overflow-x-auto reveal mt-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b-2 border-[#E2E8F0]">
                    <th className="py-4 font-semibold text-[#0F172A] w-[28%]">Feature</th>
                    {PRICING_PLANS.map((p) => <th key={p.name} className="py-4 font-semibold text-[#0EA5E9] w-[18%]">{p.name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row[0]} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                      {row.map((cell, i) => <td key={i} className={`py-4 ${i === 0 ? "text-[#0F172A] font-medium" : "text-[#64748B]"}`}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Addons */}
        <section className="bg-[#F8FAFC] py-20">
          <div className="mx-auto max-w-3xl px-6">
            <SectionTitle eyebrow="Add-Ons" title="Optional Add-On Services" />
            <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden mt-8 reveal">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b bg-[#F8FAFC] border-[#E2E8F0]">
                    <th className="py-4 px-6 font-semibold text-[#0F172A]">Service</th>
                    <th className="py-4 px-6 font-semibold text-[#0EA5E9] text-right">Starting Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {ADDONS.map((row) => (
                    <tr key={row[0]} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-4 px-6 text-[#0F172A] font-medium">{row[0]}</td>
                      <td className="py-4 px-6 text-[#64748B] text-right">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Guarantee */}
        <section className="bg-white py-24 text-center px-6">
          <div className="mx-auto max-w-3xl reveal">
            <div className="text-xs uppercase tracking-[0.3em] text-[#0EA5E9] mb-4">Guarantee</div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0F172A]">Publishing Should Feel Professional. Not Risky.</h2>
            <div className="mt-6 text-[#64748B] space-y-4 text-base md:text-lg">
              <p>We stand behind the quality of our work.</p>
              <p>If a deliverable doesn't align with the approved project scope, we'll revise it at no additional cost. Our goal is to build long-term relationships through transparency, communication, and premium-quality execution.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#F8FAFC] py-20 border-y border-[#E2E8F0]">
          <div className="mx-auto max-w-3xl px-6">
            <SectionTitle eyebrow="Pricing FAQ" title="The Questions We Hear Most." />
            <div className="space-y-2 mt-8">
              {PRICING_FAQ.map((f, i) => (
                <div key={i} className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-5 py-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-[#0F172A]">{f.q}</span>
                    <i className={`ti ti-chevron-down transition-transform ${openFaq === i ? "rotate-180 text-[#0EA5E9]" : "text-[#64748B]"}`} />
                  </button>
                  <div className={`grid transition-all ${openFaq === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-sm text-[#64748B]">{f.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-white py-24 px-6 text-center">
          <div className="mx-auto max-w-4xl reveal">
            <h2 className="font-serif text-3xl md:text-5xl text-[#0F172A]">Ready to Publish Like a Professional?</h2>
            <p className="mt-6 text-[#64748B] text-lg max-w-2xl mx-auto">
              Whether you're launching your first eBook or building a complete publishing brand, Devoreq gives you the creative, technical, and marketing support needed to launch with confidence.
            </p>
            <div className="mt-8 text-sm font-medium text-[#0EA5E9] bg-[#F8FAFC] inline-block px-6 py-3 rounded-full border border-[#E2E8F0]">
              Most clients invest between $1,000–$5,000 depending on project scope and marketing goals.
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn-gold">Start Your Project</Link>
              <Link href="/contact" className="btn-ghost">Book Free Consultation</Link>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}

export default PricingPage;
