"use client";
import { SiteShell } from "@/components/SiteShell";
import { HeroPremium } from "@/components/home/HeroPremium";
import { TrustBar } from "@/components/home/TrustBar";
import { BookGrid } from "@/components/home/BookGrid";
import { PublishingTimeline } from "@/components/home/PublishingTimeline";
import { GenresShelves } from "@/components/home/GenresShelves";
import { ServiceShowcase } from "@/components/home/ServiceShowcase";
import { AuthorSuccess } from "@/components/home/AuthorSuccess";
import { BeforeAfterSlider } from "@/components/home/BeforeAfterSlider";
import { TrailerShowcase } from "@/components/home/TrailerShowcase";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <SiteShell>
      <HeroPremium />
      <TrustBar />
      <BookGrid />
      <PublishingTimeline />
      <GenresShelves />
      <ServiceShowcase />
      <AuthorSuccess />
      <BeforeAfterSlider />
      <TrailerShowcase />
      <FaqAccordion />
      <FinalCTA />
    </SiteShell>
  );
}
