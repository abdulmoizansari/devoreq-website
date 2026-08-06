"use client";
import { useState } from "react";
import { useReveal, SectionTitle } from "@/components/Section";

export function BeforeAfterSlider() {
  const ref = useReveal<HTMLDivElement>();
  const [position, setPosition] = useState(50);

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let clientX = 0;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }
    
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setPosition(percent);
  };

  return (
    <section ref={ref} className="bg-[#F8F5EE] py-24 border-y border-[#0F172A]/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <SectionTitle eyebrow="The Transformation" title="Before & After" />
          <p className="text-[#0F172A]/70 max-w-2xl mx-auto mt-4">Slide to see how our premium design team transforms a standard manuscript into a market-ready bestseller.</p>
        </div>

        <div className="max-w-4xl mx-auto reveal">
          <div 
            className="relative w-full aspect-[16/10] md:aspect-[2/1] rounded-2xl overflow-hidden cursor-ew-resize shadow-2xl select-none"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
          >
            {/* After Image (Full width background) */}
            <div className="absolute inset-0 bg-[#0F172A] flex items-center justify-center p-8">
              <div className="w-full h-full flex items-center justify-center gap-8 opacity-90">
                 {/* Placeholder for 'After' - formatted book layout */}
                 <img src="/portfolio/ebook/Book Cover design I E-book Cover Design __ Behance/imgi_70_d3036a241799735.695fbf145dbf5.jpeg" alt="After" className="w-full h-full object-cover rounded shadow-lg" />
              </div>
              <div className="absolute top-6 right-6 bg-[#D4AF37] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
                After (Devoreq)
              </div>
            </div>

            {/* Before Image (Clipped) */}
            <div 
              className="absolute inset-0 bg-white border-r-4 border-[#D4AF37] flex items-center justify-center p-8"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <div className="w-full h-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center flex-col text-gray-400 p-8 text-center rounded">
                <i className="ti ti-file-text text-6xl mb-4 text-gray-300" />
                <div className="font-serif text-2xl text-gray-600 mb-2">Raw Manuscript.docx</div>
                <div className="text-sm font-sans">Times New Roman, 12pt, Unformatted</div>
              </div>
              <div className="absolute top-6 left-6 bg-gray-800 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
                Before
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)] transform -translate-x-1/2 flex items-center justify-center pointer-events-none"
              style={{ left: `${position}%` }}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#D4AF37]">
                <i className="ti ti-arrows-left-right text-[#0F172A]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
