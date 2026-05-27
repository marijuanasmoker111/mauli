import Loader from "@/components/layout/Loader";
import Hero from "@/components/sections/Hero";
import NumbersThatMatter from "@/components/sections/NumbersThatMatter";
import HorizontalGallery from "@/components/sections/HorizontalGallery";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Services from "@/components/sections/Services";
import Clients from "@/components/sections/Clients";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] overflow-x-hidden selection:bg-accent-blue/30 selection:text-white">
      {/* Global Interactions */}
      <CustomCursor />
      
      {/* Page Loader */}
      <Loader />
      
      {/* Immersive Landing Section */}
      <Hero />
      
      {/* Key Numbers / Metric Metrics */}
      <NumbersThatMatter />
      
      {/* Horizontal Editorial Slide deck */}
      <HorizontalGallery />
      
      {/* Slider Surface Comparison */}
      <BeforeAfter />
      
      {/* Capability Slides Pinned */}
      <Services />
      
      {/* Loop Client marquees */}
      <Clients />
      
      {/* About Bold statement decks */}
      <About />
      
      {/* Contact Brief and Coordinates */}
      <Contact />
      
      {/* Global CSS Footer HUD */}
      <footer className="bg-black py-8 px-6 border-t border-white/5 font-micro text-[11px] sm:text-xs text-text-muted text-center uppercase tracking-widest relative z-10">
        <div>© {new Date().getFullYear()} MAULI ENTERPRISES. ALL RIGHTS RESERVED.</div>
      </footer>
    </main>
  );
}
