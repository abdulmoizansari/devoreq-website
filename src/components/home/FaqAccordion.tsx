"use client";
import { useState } from "react";
import { useReveal, SectionTitle } from "@/components/Section";

const FAQS = [
  { q: "What is an ISBN and why do I need one?", a: "An ISBN (International Standard Book Number) is a unique identifier for your book. It's required by bookstores and libraries to track and catalog your title. We handle the acquisition and assignment of ISBNs for all formats of your book." },
  { q: "What is a Barcode?", a: "A barcode is the graphical representation of your ISBN, usually placed on the back cover of physical books. It allows retailers to scan and price your book at the register. We generate and embed professional barcodes into your print-ready cover files." },
  { q: "How long does the publishing process take?", a: "The timeline depends on the services required. A full package (editing, design, formatting, publishing) typically takes 8-12 weeks. If you only need cover design and publishing setup, it can be completed in 3-4 weeks." },
  { q: "Can you publish my book on Amazon?", a: "Yes, Amazon KDP is a core part of our distribution strategy. However, we also publish "wide" to platforms like Apple Books, Barnes & Noble, Kobo, and IngramSpark to ensure maximum global reach." },
  { q: "Do I keep my royalties and rights?", a: "100%. Unlike traditional publishers or vanity presses, we are a service provider. You retain 100% of your copyright, creative control, and all royalties generated from book sales." }
];

export function FaqAccordion() {
  const ref = useReveal<HTMLDivElement>();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section ref={ref} className="bg-[#FFFFFF] py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-16">
          <SectionTitle eyebrow="FAQ" title="Publishing Questions, Answered." />
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="reveal border border-[#0F172A]/10 rounded-xl overflow-hidden">
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center bg-white hover:bg-[#F8F5EE] transition-colors"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="font-serif text-xl text-[#0F172A] font-medium pr-8">{faq.q}</span>
                <i className={`ti ti-chevron-down text-[#D4AF37] text-xl transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out bg-[#F8F5EE]/50 ${openIdx === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 pt-2 text-[#0F172A]/80 font-sans leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
