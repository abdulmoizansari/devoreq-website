"use client";
import { useReveal, SectionTitle } from "@/components/Section";

const STEPS = [
  { icon: "ti-file-pencil", title: "Manuscript Review", desc: "We evaluate your draft and pair you with an expert editor." },
  { icon: "ti-cut", title: "Professional Editing", desc: "Developmental, line, and copy editing to polish your story." },
  { icon: "ti-palette", title: "Cover Design", desc: "Our award-winning designers craft a cover built to sell." },
  { icon: "ti-layout", title: "Interior Formatting", desc: "Flawless typography for eBook, paperback, and hardcover." },
  { icon: "ti-barcode", title: "ISBN & Metadata", desc: "We handle the technical setup, keywords, and barcodes." },
  { icon: "ti-upload", title: "Global Publishing", desc: "Distribution to Amazon, Apple, Barnes & Noble, and more." },
  { icon: "ti-speakerphone", title: "Marketing & Launch", desc: "Strategic campaigns, book trailers, and ads to drive sales." }
];

export function PublishingTimeline() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="bg-[#F8F5EE] py-24 border-t border-[#0F172A]/5">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-16">
          <SectionTitle eyebrow="The Journey" title="How We Publish Your Book" />
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#D4AF37]/30 transform md:-translate-x-1/2 hidden sm:block" />

          <div className="space-y-12 relative">
            {STEPS.map((step, i) => (
              <div key={i} className={`reveal flex flex-col sm:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-6 md:gap-12 group`}>
                
                {/* Text Content */}
                <div className={`w-full sm:w-1/2 flex flex-col ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'} justify-center`}>
                  <h3 className="font-serif text-2xl text-[#0F172A] mb-2 group-hover:text-[#D4AF37] transition-colors">{step.title}</h3>
                  <p className="text-[#0F172A]/70 text-sm md:text-base">{step.desc}</p>
                </div>

                {/* Center Node */}
                <div className="hidden sm:flex relative z-10 w-16 h-16 rounded-full bg-[#FFFFFF] border-2 border-[#D4AF37] items-center justify-center shrink-0 shadow-lg transform transition-transform group-hover:scale-110">
                  <i className={`ti ${step.icon} text-2xl text-[#0F172A]`} />
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden sm:block w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
