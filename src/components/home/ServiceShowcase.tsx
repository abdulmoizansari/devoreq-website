"use client";
import Link from "next/link";
import { useReveal, SectionTitle } from "@/components/Section";

const SERVICES = [
  {
    title: "Cover Design",
    description: "A book is judged by its cover. Our award-winning designers craft custom artwork that captures the essence of your story while adhering to genre expectations that drive sales.",
    image: "/portfolio/ebook/Leonardo And Me _ Cover Illustration and Book Design __ Behance/imgi_36_1e7d48243420291.6982b49c0f4ec.jpeg",
    points: ["Custom Concepts", "Typography & Title Treatment", "Full Wrap for Print", "3D Marketing Mockups"]
  },
  {
    title: "Interior Formatting",
    description: "Beautiful words deserve beautiful typography. We format your manuscript to the highest traditional publishing standards, ensuring a flawless reading experience on every device and page.",
    image: "/portfolio/ebook/Editorial Design of a Personal Branding eBook __ Behance/imgi_69_e24401235435409.68d6c62ea7a21.jpeg",
    points: ["eBook & Print Ready", "Custom Chapter Headers", "Drop Caps & Flourishes", "Error-Free Layouts"]
  },
  {
    title: "Global Publishing",
    description: "We navigate the complex web of global distribution so you don't have to. Your book will be available to thousands of retailers, libraries, and readers worldwide.",
    image: "/portfolio/ebook/Book Cover design I E-book Cover Design __ Behance/imgi_70_d3036a241799735.695fbf145dbf5.jpeg",
    points: ["Amazon KDP & IngramSpark", "ISBN & Barcode Assignment", "Category & Keyword SEO", "100% Royalty Ownership"]
  },
  {
    title: "Marketing & Launch",
    description: "Publishing is just the beginning. We build momentum through cinematic book trailers, social media campaigns, and targeted advertising to push your book up the charts.",
    image: "/portfolio/A Mingled Yarn E-book Marketing Posts __ Behance/imgi_46_f77a2c217957965.67994d898e454.jpeg",
    points: ["Cinematic Book Trailers", "Social Media Graphics", "Amazon Ads Strategy", "Author Website Development"]
  }
];

export function ServiceShowcase() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="bg-[#FFFFFF] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-20">
          <SectionTitle eyebrow="Our Craft" title="Premium Publishing Services" />
        </div>

        <div className="space-y-32">
          {SERVICES.map((service, i) => (
            <div key={i} className={`reveal flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}>
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 to-transparent" />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <h3 className="font-serif text-4xl text-[#0F172A] mb-6">{service.title}</h3>
                <p className="text-lg text-[#0F172A]/80 mb-8 leading-relaxed font-sans">{service.description}</p>
                
                <ul className="space-y-4 mb-10">
                  {service.points.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[#0F172A]/90 font-medium">
                      <i className="ti ti-point-filled text-[#D4AF37]" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div>
                  <Link href="/contact" className="btn-outline">
                    Discuss Your Project
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
