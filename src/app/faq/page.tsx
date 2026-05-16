"use client";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { PageHeader, useReveal } from "@/components/Section";
import { FAQS } from "@/lib/site";



function FAQPage() {
  const ref = useReveal<HTMLDivElement>();
  const [query, setQuery] = useState("");
  const [openKey, setOpenKey] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return FAQS;
    const q = query.toLowerCase();
    return FAQS.map((g) => ({ ...g, items: g.items.filter((i) => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q)) })).filter((g) => g.items.length);
  }, [query]);

  return (
    <SiteShell>
      <div ref={ref}>
        <PageHeader title="Frequently Asked Questions." subtitle="Search, or browse by topic. Most answers are here." />

        <section className="bg-[#F8FAFC] py-12">
          <div className="mx-auto max-w-3xl px-6">
            <div className="relative">
              <i className="ti ti-search absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the FAQs..." className="w-full bg-white border border-[#E2E8F0] rounded-xl pl-11 pr-4 py-4 text-sm focus:outline-none focus:border-[#38BDF8]" />
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-3xl px-6 space-y-10">
            {filtered.map((g) => (
              <div key={g.group}>
                <h2 className="font-serif text-xl text-[#0F172A] mb-4">{g.group}</h2>
                <div className="space-y-2">
                  {g.items.map((it, i) => {
                    const k = `${g.group}-${i}`;
                    const open = openKey === k;
                    return (
                      <div key={k} className="border border-[#E2E8F0] rounded-lg overflow-hidden">
                        <button onClick={() => setOpenKey(open ? null : k)} className="w-full text-left px-5 py-4 flex items-center justify-between">
                          <span className="text-sm font-medium text-[#0F172A]">{it.q}</span>
                          <i className={`ti ti-chevron-down transition-transform ${open ? "rotate-180" : ""}`} />
                        </button>
                        <div className={`grid transition-all ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                          <div className="overflow-hidden"><p className="px-5 pb-4 text-sm text-[#64748B]">{it.a}</p></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {filtered.length === 0 && <p className="text-sm text-[#64748B] text-center">No matches. Try a different keyword.</p>}
          </div>
        </section>

        <section className="bg-[#F8FAFC] py-16 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-[#0F172A]/80">Still have questions? Our team replies within 2 business hours.</p>
            <button className="btn-gold mt-5">Chat With Us</button>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}

export default FAQPage;
