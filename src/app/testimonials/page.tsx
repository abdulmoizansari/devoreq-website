"use client";
import { useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { PageHeader, useReveal } from "@/components/Section";
import { TESTIMONIALS } from "@/lib/site";



const SERVICE_TAGS = ["All", "Ghostwriting", "Design", "Publishing", "Marketing"];

function TestimonialsPage() {
  const ref = useReveal<HTMLDivElement>();
  const [filter, setFilter] = useState("All");
  const items = filter === "All" ? TESTIMONIALS : TESTIMONIALS;

  return (
    <SiteShell>
      <div ref={ref}>
        <PageHeader title="Stories From Our Authors." subtitle="340+ reviews. 4.9 average. From every continent." />

        <section className="bg-white py-10 border-b border-[#E2E8F0]">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="font-serif text-3xl text-[#0F172A]">4.9</div>
              <div className="text-[#0EA5E9]">★★★★★</div>
              <div className="text-sm text-[#64748B]">340+ reviews</div>
            </div>
            <div className="flex gap-5 text-sm text-[#64748B]">
              <span>Google</span><span>Trustpilot</span><span>Clutch</span>
            </div>
          </div>
        </section>

        <section className="bg-[#F8FAFC] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="reveal aspect-video rounded-xl bg-gradient-to-br from-[#F8FAFC] to-[#38BDF8] grid place-items-center relative overflow-hidden">
                  <button className="h-16 w-16 rounded-full bg-white/90 grid place-items-center text-[#0F172A] text-xl"><i className="ti ti-player-play-filled" /></button>
                  <div className="absolute bottom-3 left-3 text-[#0F172A] text-sm font-medium">Client Testimonial {i}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {SERVICE_TAGS.map((t) => (
                <button key={t} onClick={() => setFilter(t)} className={`px-3 py-1.5 rounded-full text-xs ${filter === t ? "bg-[#F8FAFC] text-[#0F172A]" : "bg-white border border-[#E2E8F0] text-[#64748B]"}`}>{t}</button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((t) => (
                <div key={t.name} className="reveal card-hover bg-white rounded-xl p-6 border border-[#E2E8F0]">
                  <div className="text-[#0EA5E9]">★★★★★</div>
                  <p className="mt-3 font-serif italic text-[15px] text-[#0F172A]">"{t.quote}"</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#38BDF8]/15 text-[#0F172A] grid place-items-center font-semibold text-sm">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#0F172A]">{t.name}</div>
                      <div className="text-xs text-[#64748B]">{t.role} · {t.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}

export default TestimonialsPage;
