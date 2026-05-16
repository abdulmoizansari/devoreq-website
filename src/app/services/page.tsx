"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { PageHeader, useReveal } from "@/components/Section";
import { SERVICES } from "@/lib/site";



const FILTERS = ["All", "Writing", "Design", "Publishing", "Marketing", "Tech"] as const;
type Filter = typeof FILTERS[number];

const accentTop: Record<string, string> = { purple: "bg-[#6b6b8a]", teal: "bg-[#38BDF8]", gold: "bg-[#0EA5E9]" };

function ServicesPage() {
  const ref = useReveal<HTMLDivElement>();
  const [filter, setFilter] = useState<Filter>("All");
  const [estimate, setEstimate] = useState<{ low: number; high: number; picks: string[] } | null>(null);
  const [form, setForm] = useState({ type: "Fiction eBook", words: "30000", picks: [] as string[], timeline: "Standard" });

  const filtered = useMemo(() => filter === "All" ? SERVICES : SERVICES.filter((s) => s.category === filter), [filter]);

  function toggle(slug: string) {
    setForm((f) => ({ ...f, picks: f.picks.includes(slug) ? f.picks.filter((x) => x !== slug) : [...f.picks, slug] }));
  }

  function calc(e: React.FormEvent) {
    e.preventDefault();
    let low = 0, high = 0;
    const picks: string[] = [];
    form.picks.forEach((slug) => {
      const s = SERVICES.find((x) => x.slug === slug); if (!s) return;
      picks.push(s.name);
      const nums = s.price.match(/\$?([\d,]+)/g)?.map((n) => Number(n.replace(/[^\d]/g, ""))) ?? [];
      if (nums.length >= 2) { low += nums[0]; high += nums[1]; }
      else if (nums.length === 1) { low += nums[0]; high += nums[0] * 1.4; }
      else { low += 1000; high += 3000; }
    });
    if (form.timeline === "Rush") { low *= 1.3; high *= 1.3; }
    setEstimate({ low: Math.round(low), high: Math.round(high), picks });
  }

  return (
    <SiteShell>
      <div ref={ref}>
        <PageHeader title="Our Services" subtitle="Everything your book needs, under one roof." />

        {/* Filters */}
        <div className="bg-white border-b border-[#E2E8F0] sticky top-14 z-30">
          <div className="mx-auto max-w-7xl px-6 flex flex-wrap gap-6 py-4 overflow-x-auto">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-sm pb-1 transition-colors ${filter === f ? "text-[#0EA5E9] border-b-2 border-[#0EA5E9]" : "text-[#64748B] hover:text-[#0F172A]"}`}
              >{f}</button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <section className="bg-[#F8FAFC] py-16">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s) => (
              <article key={s.slug} className="reveal card-hover bg-white rounded-xl border border-[#E2E8F0] overflow-hidden flex flex-col">
                <div className={`h-1 ${accentTop[s.accent]}`} />
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-[11px] uppercase tracking-wider text-[#64748B] mb-2">{s.category}</div>
                  <h3 className="font-serif text-xl text-[#0F172A] font-bold">{s.name}</h3>
                  <p className="mt-3 text-[14px] text-[#64748B]">{s.description}</p>
                  <div className="mt-5">
                    <div className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-2">What's Included</div>
                    <ul className="space-y-1.5">
                      {s.included.map((i) => (
                        <li key={i} className="text-[13px] text-[#64748B] flex gap-2"><i className="ti ti-check text-[#38BDF8] shrink-0 mt-0.5" />{i}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                    <div className="text-[#0EA5E9] font-serif text-xl">{s.price}</div>
                    {s.priceNote && <div className="text-xs text-[#64748B] mt-1">{s.priceNote}</div>}
                  </div>
                  <Link href="/contact" className="btn-gold mt-5 justify-center text-sm">Get a Quote</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* AI Scope Estimator */}
        <section className="bg-[#F8FAFC] py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-3xl md:text-4xl text-[#0EA5E9] text-center">Not Sure What You Need? Let Our AI Figure It Out.</h2>
            <p className="text-[#64748B] text-center mt-3">Answer four quick questions and we'll recommend a tailored package.</p>

            <form onSubmit={calc} className="mt-10 bg-[#F8FAFC] rounded-2xl p-8 border border-white/5 space-y-8">
              <div>
                <label className="text-[#0F172A]/70 text-sm">1. What type of project?</label>
                <div className="mt-3 flex flex-wrap gap-3">
                  {["Fiction eBook", "Non-Fiction", "Memoir", "Children's", "Comic", "Business"].map((t) => (
                    <label key={t} className={`px-3 py-2 rounded-md text-sm cursor-pointer border ${form.type === t ? "bg-[#38BDF8]/10 border-[#38BDF8] text-[#0F172A]" : "border-white/15 text-[#0F172A]/70"}`}>
                      <input type="radio" name="type" className="hidden" checked={form.type === t} onChange={() => setForm({ ...form, type: t })} />{t}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[#0F172A]/70 text-sm">2. Estimated word count</label>
                <input value={form.words} onChange={(e) => setForm({ ...form, words: e.target.value })} type="number" className="mt-2 w-full bg-white border border-white/15 rounded-md px-3 py-2 text-[#0F172A]" />
              </div>

              <div>
                <label className="text-[#0F172A]/70 text-sm">3. Services you're interested in</label>
                <div className="mt-3 grid sm:grid-cols-2 gap-2">
                  {SERVICES.map((s) => (
                    <label key={s.slug} className="text-sm text-[#0F172A]/80 flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.picks.includes(s.slug)} onChange={() => toggle(s.slug)} className="accent-[#38BDF8]" />
                      {s.name}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[#0F172A]/70 text-sm">4. Timeline</label>
                <div className="mt-3 flex gap-3">
                  {["Standard", "Rush"].map((t) => (
                    <label key={t} className={`px-4 py-2 rounded-md text-sm cursor-pointer border ${form.timeline === t ? "bg-[#0EA5E9] border-[#0EA5E9] text-[#0F172A]" : "border-white/15 text-[#0F172A]/70"}`}>
                      <input type="radio" name="timeline" className="hidden" checked={form.timeline === t} onChange={() => setForm({ ...form, timeline: t })} />{t}
                    </label>
                  ))}
                </div>
              </div>

              <button className="btn-gold w-full justify-center">Get My Estimate</button>
            </form>

            {estimate && (
              <div className="mt-8 bg-white rounded-2xl p-8">
                <div className="text-[11px] uppercase tracking-wider text-[#64748B]">Recommended Package</div>
                <div className="mt-2 font-serif text-3xl text-[#0F172A]">${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}</div>
                <ul className="mt-4 space-y-1 text-sm text-[#64748B]">
                  {estimate.picks.map((p) => <li key={p} className="flex gap-2"><i className="ti ti-check text-[#38BDF8]" />{p}</li>)}
                </ul>
                <Link href="/contact" className="btn-gold mt-6 inline-flex">Book a Discovery Call</Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}

export default ServicesPage;
