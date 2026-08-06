"use client";
import { useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { PageHeader, useReveal } from "@/components/Section";
import { PORTFOLIO_IMAGES } from "@/lib/portfolioData";

function PortfolioPage() {
  const ref = useReveal<HTMLDivElement>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const navigate = (direction: 1 | -1, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex === null) return;
    let newIndex = activeIndex + direction;
    if (newIndex < 0) newIndex = PORTFOLIO_IMAGES.length - 1;
    if (newIndex >= PORTFOLIO_IMAGES.length) newIndex = 0;
    setActiveIndex(newIndex);
  };

  return (
    <SiteShell>
      <div ref={ref}>
        <PageHeader title="Our Published Works." subtitle="Explore books we have written, designed, published, and launched." />

        <section className="bg-[#F8F5EE] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
              {PORTFOLIO_IMAGES.slice(0, visibleCount).map((src, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveIndex(i)} 
                  className="reveal block w-full rounded-xl overflow-hidden hover:opacity-90 transition-opacity bg-black/5"
                >
                  {src.match(/\.(mp4|webm)$/i) ? (
                    <video src={src} autoPlay loop muted playsInline className="w-full h-auto object-cover rounded-xl border border-[#0F172A]/10" />
                  ) : (
                    <img src={src} alt={`Portfolio work ${i + 1}`} className="w-full h-auto object-cover rounded-xl border border-[#0F172A]/10" loading="lazy" />
                  )}
                </button>
              ))}
            </div>
            
            {visibleCount < PORTFOLIO_IMAGES.length && (
              <div className="mt-12 flex justify-center reveal">
                <button onClick={() => setVisibleCount(v => v + 12)} className="btn-ghost">
                  Load More Works
                </button>
              </div>
            )}
          </div>
        </section>

        {activeIndex !== null && (
          <div className="fixed inset-0 z-[60] bg-[#F8F5EE]/95 backdrop-blur-sm flex items-center justify-center p-4 overflow-hidden" onClick={() => setActiveIndex(null)}>
            <div className="relative max-h-[90vh] max-w-[90vw] w-auto h-auto flex items-center" onClick={(e) => e.stopPropagation()}>
              <button className="absolute -left-12 md:-left-16 text-[#0F172A] hover:text-[#D4AF37] transition-colors p-2" onClick={(e) => navigate(-1, e)}>
                <i className="ti ti-chevron-left text-4xl" />
              </button>
              
              <button className="absolute -top-12 right-0 text-[#0F172A] hover:text-[#D4AF37] transition-colors" onClick={() => setActiveIndex(null)}>
                <i className="ti ti-x text-3xl" />
              </button>
              
              {PORTFOLIO_IMAGES[activeIndex].match(/\.(mp4|webm)$/i) ? (
                <div className="w-[85vw] md:w-[70vw] max-w-5xl rounded-lg overflow-hidden bg-black shadow-2xl">
                  <video src={PORTFOLIO_IMAGES[activeIndex]} controls autoPlay playsInline className="w-full h-auto max-h-[85vh] object-contain" />
                </div>
              ) : (
                <img src={PORTFOLIO_IMAGES[activeIndex]} alt="Portfolio zoom" className="max-h-[90vh] max-w-[85vw] object-contain rounded-lg shadow-2xl" />
              )}
              
              <button className="absolute -right-12 md:-right-16 text-[#0F172A] hover:text-[#D4AF37] transition-colors p-2" onClick={(e) => navigate(1, e)}>
                <i className="ti ti-chevron-right text-4xl" />
              </button>
            </div>
          </div>
        )}
      </div>
    </SiteShell>
  );
}

export default PortfolioPage;
