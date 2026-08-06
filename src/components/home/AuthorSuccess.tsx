"use client";
import { useReveal, SectionTitle } from "@/components/Section";

const TESTIMONIALS = [
  { 
    quote: "Devoreq turned my notes into a #1 launch on Amazon. They handled everything: writing, cover, and marketing. Seeing my book hold its own next to traditionally published bestsellers is a feeling I will never forget.", 
    name: "Amelia Brooks", 
    role: "Memoir Author",
    results: "Top 10 Biography Category",
    image: "/portfolio/ebook/Characters Illustrations Collection __ Behance/imgi_42_e786a9188218915.6598622410111.jpeg" // using a placeholder from portfolio
  },
  { 
    quote: "The cover design alone sold out my first print run. Their team understands the deep psychology of what makes a reader click. I have never felt so supported by a publishing team.", 
    name: "Marcus Okafor", 
    role: "Business Author",
    results: "5,000+ Copies Sold First Month",
    image: "/portfolio/ebook/Characters Illustrations Collection __ Behance/imgi_7_3ae2c6188218915.6598449895566.jpeg"
  }
];

export function AuthorSuccess() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="bg-[#0F172A] py-24 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <SectionTitle eyebrow="Success Stories" title="Words From Our Authors" light={true} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <div key={i} className="reveal bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-sm relative">
              <i className="ti ti-quote absolute top-8 right-8 text-6xl text-[#D4AF37]/20" />
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#D4AF37]">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-white">{testimonial.name}</h4>
                  <p className="text-[#D4AF37] text-sm uppercase tracking-wider">{testimonial.role}</p>
                </div>
              </div>

              <blockquote className="font-serif text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
                "{testimonial.quote}"
              </blockquote>

              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 px-4 py-2 rounded-full">
                <i className="ti ti-trophy text-[#D4AF37]" />
                <span className="text-sm font-medium text-white">{testimonial.results}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
