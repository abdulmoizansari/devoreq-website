"use client";
import { useReveal } from "@/components/Section";

export function TrustBar() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="bg-[#F8F5EE] border-b border-[#0F172A]/5 py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm md:text-base font-serif text-[#0F172A]">
          <div className="reveal flex items-center gap-2">
            <i className="ti ti-check text-[#D4AF37] text-xl" />
            <span>100+ Covers Designed</span>
          </div>
          <div className="reveal flex items-center gap-2" style={{ transitionDelay: "100ms" }}>
            <i className="ti ti-check text-[#D4AF37] text-xl" />
            <span>50+ Published Books</span>
          </div>
          <div className="reveal flex items-center gap-2" style={{ transitionDelay: "200ms" }}>
            <i className="ti ti-check text-[#D4AF37] text-xl" />
            <span>Global Authors</span>
          </div>
          <div className="reveal flex items-center gap-2" style={{ transitionDelay: "300ms" }}>
            <i className="ti ti-check text-[#D4AF37] text-xl" />
            <span>Amazon KDP Specialists</span>
          </div>
        </div>
      </div>
    </section>
  );
}
