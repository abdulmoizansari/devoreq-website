"use client";
import { useReveal, SectionTitle } from "@/components/Section";

const GENRES = [
  { name: "Romance", count: "120+ Books", color: "from-pink-900/80 to-rose-900/90" },
  { name: "Fantasy", count: "85+ Books", color: "from-indigo-900/80 to-purple-900/90" },
  { name: "Mystery", count: "60+ Books", color: "from-slate-900/80 to-gray-900/90" },
  { name: "Thriller", count: "90+ Books", color: "from-red-900/80 to-red-950/90" },
  { name: "Children's", count: "45+ Books", color: "from-blue-700/80 to-cyan-800/90" },
  { name: "Self Help", count: "150+ Books", color: "from-emerald-900/80 to-teal-900/90" },
  { name: "Memoirs", count: "70+ Books", color: "from-[#D4AF37]/80 to-amber-800/90" }
];

export function GenresShelves() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="bg-[#0F172A] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <SectionTitle eyebrow="Genres" title="Books We Bring To Life" light={true} />
          <p className="text-white/70 max-w-2xl mx-auto mt-4">We have specialized teams for every genre, ensuring your book fits market expectations while standing out.</p>
        </div>

        <div className="relative">
          {/* Bookshelf structure */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 relative z-10">
            {GENRES.map((genre, i) => (
              <div key={i} className="reveal relative group cursor-pointer flex flex-col justify-end h-48 border-b-[12px] border-[#D4AF37]/20 pb-1">
                <div className={`w-3/4 mx-auto relative transition-transform duration-500 transform origin-bottom group-hover:-translate-y-4 group-hover:-rotate-3`}>
                  {/* Spine of the book */}
                  <div className={`h-40 rounded-t-sm rounded-br-sm shadow-xl bg-gradient-to-br ${genre.color} border-l border-white/10 flex flex-col justify-between p-3 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    <div className="h-4 border-b border-white/20 w-full relative z-10"></div>
                    <div className="flex-1 flex items-center justify-center relative z-10">
                      <span className="font-serif text-lg tracking-widest uppercase transform -rotate-90 whitespace-nowrap text-white/90 drop-shadow-md">
                        {genre.name}
                      </span>
                    </div>
                    <div className="h-4 border-t border-white/20 w-full relative z-10"></div>
                  </div>
                </div>
                
                {/* Shelf label */}
                <div className="absolute -bottom-10 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[#D4AF37] text-xs uppercase tracking-widest">{genre.count}</span>
                </div>
              </div>
            ))}
            
            {/* Empty space for grid balancing */}
            <div className="hidden md:block border-b-[12px] border-[#D4AF37]/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
