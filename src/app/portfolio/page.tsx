"use client";
import { useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { PageHeader, useReveal } from "@/components/Section";
import { PORTFOLIO_IMAGES } from "@/lib/portfolioData";

function PortfolioPage() {
  const ref = useReveal<HTMLDivElement>();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <SiteShell>
      <div ref={ref}>
        <PageHeader title="Our Published Works." subtitle="Explore books we have written, designed, published, and launched." />

        <section className="bg-[#F8FAFC] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
              {PORTFOLIO_IMAGES.map((src, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImage(src)} 
                  className="reveal block w-full rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
                >
                  {src.match(/\.(mp4|webm)$/i) ? (
                    <video src={src} autoPlay loop muted playsInline className="w-full h-auto object-cover rounded-xl border border-[#E2E8F0]" />
                  ) : (
                    <img src={src} alt={`Portfolio work ${i + 1}`} className="w-full h-auto object-cover rounded-xl border border-[#E2E8F0]" loading="lazy" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {activeImage && (
          <div className="fixed inset-0 z-[60] bg-[#F8FAFC]/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-hidden" onClick={() => setActiveImage(null)}>
            <div className="relative max-h-[90vh] max-w-[90vw] w-auto h-auto" onClick={(e) => e.stopPropagation()}>
              <button className="absolute -top-12 right-0 text-[#0F172A] hover:text-[#0EA5E9] transition-colors" onClick={() => setActiveImage(null)}>
                <i className="ti ti-x text-3xl" />
              </button>
              {activeImage.match(/\.(mp4|webm)$/i) ? (
                <video src={activeImage} controls autoPlay className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl bg-black/10" />
              ) : (
                <img src={activeImage} alt="Portfolio zoom" className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl" />
              )}
            </div>
          </div>
        )}
      </div>
    </SiteShell>
  );
}

export default PortfolioPage;
