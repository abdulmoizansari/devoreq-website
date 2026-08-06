"use client";
import { useState } from "react";
import { useReveal, SectionTitle } from "@/components/Section";

const FEATURED_BOOKS = [
  {
    title: "Leonardo And Me",
    author: "Historical Fiction",
    service: "Cover Illustration & Book Design",
    image: "/portfolio/ebook/Leonardo And Me _ Cover Illustration and Book Design __ Behance/imgi_33_95fb9b243420291.6982b49c0fa79.jpeg",
    category: "Fiction"
  },
  {
    title: "Feeling Sexy",
    author: "Self-Help / Confidence",
    service: "Book Cover Design",
    image: "/portfolio/ebook/Book Cover_ Feeling Sexy (Faith & Confidence) __ Behance/imgi_47_ba7955229934813.686de1f05200b.jpeg",
    category: "Self-Help"
  },
  {
    title: "A Mingled Yarn",
    author: "Romance",
    service: "Marketing & Cover Design",
    image: "/portfolio/A Mingled Yarn E-book Marketing Posts __ Behance/imgi_57_b9893c217957965.67994d898d68d.jpeg",
    category: "Romance"
  },
  {
    title: "Personal Branding",
    author: "Business & Strategy",
    service: "Editorial Design",
    image: "/portfolio/ebook/Editorial Design of a Personal Branding eBook __ Behance/imgi_67_6fd01b235435409.68d6c62ea86fa.jpeg",
    category: "Business"
  },
];

const CATEGORIES = ["All", "Fiction", "Romance", "Self-Help", "Business"];

export function BookGrid() {
  const ref = useReveal<HTMLDivElement>();
  const [activeTab, setActiveTab] = useState("All");

  const filteredBooks = activeTab === "All" ? FEATURED_BOOKS : FEATURED_BOOKS.filter(b => b.category === activeTab);

  return (
    <section ref={ref} className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <SectionTitle eyebrow="Portfolio" title="Featured Published Works" />
        </div>

        <div className="flex justify-center gap-6 mb-12 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`font-serif text-lg pb-1 border-b-2 transition-colors ${
                activeTab === cat ? "border-[#D4AF37] text-[#0F172A]" : "border-transparent text-[#0F172A]/60 hover:text-[#0F172A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBooks.map((book, i) => (
            <div key={i} className="group relative perspective-[1000px] reveal">
              <div className="relative w-full aspect-[2/3] transform-style-3d transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:rotate-y-6 shadow-md group-hover:shadow-2xl group-hover:shadow-black/20 rounded-md overflow-hidden bg-gray-100">
                <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/20 to-transparent z-10" />
                
                {/* Overlay that appears on hover */}
                <div className="absolute inset-0 bg-[#0F172A]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-center items-center text-center p-6">
                  <h3 className="font-serif text-2xl text-white mb-2">{book.title}</h3>
                  <p className="text-[#D4AF37] text-sm mb-4">{book.author}</p>
                  <span className="text-white/80 text-xs uppercase tracking-wider">{book.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
