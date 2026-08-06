"use client";
import { useState } from "react";
import { useReveal, SectionTitle } from "@/components/Section";

const TRAILERS = [
  {
    title: "Cinematic Fantasy Release",
    video: "/portfolio/videos/NnGdRYIn-6__576.mp4",
  },
  {
    title: "Sci-Fi Thriller Campaign",
    video: "/portfolio/videos/Sr94Anpfgmi_720.mp4",
  }
];

export function TrailerShowcase() {
  const ref = useReveal<HTMLDivElement>();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section ref={ref} className="bg-[#0F172A] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <SectionTitle eyebrow="Visual Marketing" title="Cinematic Book Trailers" light={true} />
          <p className="text-white/70 max-w-2xl mx-auto mt-4">We produce Netflix-quality trailers that capture your book's atmosphere and stop scrollers in their tracks.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {TRAILERS.map((trailer, i) => (
            <div 
              key={i} 
              className="reveal relative group aspect-video rounded-2xl overflow-hidden cursor-pointer bg-black/50 border border-white/10"
              onClick={() => setActiveVideo(trailer.video)}
            >
              {/* Video Thumbnail / Preview */}
              <video 
                src={trailer.video} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                muted 
                loop 
                playsInline
                onMouseOver={(e) => e.currentTarget.play().catch(() => {})}
                onMouseOut={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-300">
                  <i className="ti ti-player-play-filled text-2xl text-white ml-1" />
                </div>
              </div>

              {/* Title Gradient */}
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <h4 className="font-serif text-2xl text-white group-hover:text-[#D4AF37] transition-colors">{trailer.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setActiveVideo(null)}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors" onClick={() => setActiveVideo(null)}>
            <i className="ti ti-x text-4xl" />
          </button>
          <div className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden bg-black shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <video src={activeVideo} controls autoPlay className="w-full h-full" />
          </div>
        </div>
      )}
    </section>
  );
}
