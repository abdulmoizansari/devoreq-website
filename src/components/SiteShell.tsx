import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Chatbot } from "./Chatbot";
import { LeadCaptureModal } from "./LeadCaptureModal";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />
      <LeadCaptureModal />
    </div>
  );
}
