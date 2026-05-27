"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { projects } from "@/data/mock";

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Disable horizontal pinned scroll on mobile — it creates terrible UX
    if (window.innerWidth < 768) return;

    const container = containerRef.current;
    const trigger = triggerRef.current;
    if (!container || !trigger) return;

    const ctx = gsap.context(() => {
      // Horizontally translate the panels on vertical scroll with strict synchronization
      const scrollTween = gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${container.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        }
      });

      // Parallax & rotation effects for individual asymmetrical items using hardware-acceleration
      const sections = gsap.utils.toArray(".horizontal-panel") as HTMLElement[];
      sections.forEach((panel) => {
        const img = panel.querySelector(".asym-img") as HTMLElement;
        if (img) {
          gsap.fromTo(img,
            { rotate: -1.5, yPercent: 3 },
            {
              rotate: 1.5,
              yPercent: -3,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true,
              }
            }
          );
        }
      });
    }, triggerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div id="gallery" className="relative bg-bg-base bg-dot-grid border-b border-white/5">

      {/* ====== MOBILE LAYOUT: Stacked vertical cards (<768px) ====== */}
      <section className="md:hidden px-5 py-16 space-y-6">
        {/* Section Header */}
        <div className="mb-10">
          <span className="font-micro text-[10px] text-[#c5a880] uppercase tracking-[0.25em] mb-4 block font-bold">
            PORTFOLIO ARCHIVE
          </span>
          <h2 className="font-display text-4xl font-black text-white leading-[0.95] tracking-tighter mb-5 uppercase">
            Completed
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a880] via-[#f8f9fa] to-[#9fb89b]">
              Our Projects.
            </span>
          </h2>
          <p className="font-body text-text-muted text-sm leading-relaxed font-medium max-w-lg">
            Explore our successfully completed projects across major pharmaceutical and industrial facilities.
          </p>
        </div>

        {/* Mobile Project Cards */}
        {projects.map((project, idx) => (
          <div
            key={`mobile-${project.id}`}
            className="relative bg-zinc-950/80 border border-white/10 overflow-hidden"
          >
            {/* Image */}
            <div className="aspect-[16/10] w-full relative overflow-hidden">
              <Image
                src={project.image}
                alt={project.client}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-black/90 backdrop-blur-md px-2.5 py-1 border border-white/10 font-micro text-[7px] text-[#c5a880] tracking-widest uppercase">
                  PROJECT 0{idx + 1}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <span className="font-micro text-[9px] text-[#c5a880] uppercase tracking-[0.2em] font-bold">
                  0{idx + 1} • COMPLETED PROJECT
                </span>
                <span className="font-display text-[10px] text-white/30 font-bold uppercase tracking-widest">
                  [ 0{idx + 1} / 0{projects.length} ]
                </span>
              </div>

              <h3 className="font-display text-lg font-black text-white uppercase tracking-tight mb-3">
                {project.client}
              </h3>

              <p className="font-body text-xs text-text-muted mb-5 leading-relaxed font-medium">
                {project.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-[9px] font-micro uppercase text-white/50 pt-4 border-t border-white/10">
                <div className="border-l border-[#c5a880]/30 pl-3">
                  <span className="text-white/30 block mb-0.5">Project Area</span>
                  <span className="text-white font-bold tracking-widest text-[10px]">{project.area}</span>
                </div>
                <div className="border-l border-[#9fb89b]/30 pl-3">
                  <span className="text-white/30 block mb-0.5">Status</span>
                  <span className="text-[#9fb89b] font-bold tracking-widest text-[10px]">COMPLETED ✓</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Mobile Outro */}
        <div className="pt-10 border-l-2 border-[#9fb89b] pl-6">
          <h3 className="font-display text-3xl font-black text-white mb-4 uppercase tracking-tight leading-none">
            Transforming
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9fb89b] to-[#c5a880]">
              Work Premises.
            </span>
          </h3>
          <p className="font-body text-text-muted text-sm mb-8 leading-relaxed font-medium">
            We offer complete sales and service support in epoxy flooring, epoxy coving, polyurethane systems, car parking flooring, anti-corrosion, anti-fungal coating, and under water tank coating.
          </p>
          <a href="#contact" className="inline-block px-7 py-3.5 bg-[#c5a880] text-black font-micro text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 relative group overflow-hidden border border-transparent shadow-lg">
            <span className="relative z-10">CONTACT OUR DIRECTORS</span>
            <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </a>
        </div>
      </section>

      {/* ====== DESKTOP LAYOUT: Horizontal pinned scroll (≥768px) ====== */}
      <div ref={triggerRef} className="hidden md:block relative overflow-hidden">

        {/* Premium ambient decorative gold lighting circles in background */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#c5a880]/3 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#9fb89b]/3 rounded-full blur-[180px] pointer-events-none" />

        {/* Primary Section Header for Traversal Overlay */}
        <div className="absolute top-12 left-12 lg:left-24 z-20 pointer-events-none flex flex-col items-start text-left">
          <span className="font-micro text-[10px] text-[#c5a880] uppercase tracking-[0.25em] mb-1.5 block font-bold">
            COMPLETED WORKS GALLERY
          </span>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#c5a880] rounded-full animate-pulse" />
            <span className="font-micro text-[8px] text-white/35 uppercase tracking-widest">
              SCROLL TO EXPLORE PROJECTS
            </span>
          </div>
        </div>

        <div 
          ref={containerRef} 
          className="flex h-screen items-center scroll-none"
          style={{ width: "max-content" }}
        >
          {/* Intro Panel */}
          <section className="horizontal-panel w-[100vw] h-full flex flex-col justify-center px-12 md:px-24 lg:px-36 flex-shrink-0 select-none relative">
            <div className="max-w-4xl text-left">
              <span className="font-micro text-[10px] text-[#c5a880] uppercase tracking-[0.25em] mb-4 block font-bold">
                PORTFOLIO ARCHIVE
              </span>
              <h2 className="font-display text-5xl sm:text-7xl lg:text-[6.5vw] font-black text-white leading-[0.95] tracking-tighter mb-8 uppercase">
                Completed
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a880] via-[#f8f9fa] to-[#9fb89b]">
                  Our Projects.
                </span>
              </h2>
              <p className="font-body text-text-muted text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed font-medium">
                We are one of the leading service providers in Industrial Flooring material supply and application. We transform your work premises into attractive and efficient workplaces. Explore our successfully completed projects across major pharmaceutical and industrial facilities.
              </p>
            </div>
          </section>

          {/* Project panels with asymmetrical clipping & tilts */}
          {projects.map((project, idx) => (
            <section
              key={`horiz-${project.id}`}
              className="horizontal-panel w-[90vw] lg:w-[70vw] h-full flex items-center justify-center px-8 md:px-16 flex-shrink-0 relative z-10 select-none"
            >
              <div className="w-full max-w-3xl md:max-w-4xl relative flex flex-col group">
                
                {/* Premium Luxury Frame Bezel */}
                <div 
                  className="asym-img aspect-[16/9.5] w-full relative overflow-hidden border border-white/10 filter mix-blend-luminosity hover:filter-none transition-all duration-1000 bg-surface shadow-[0_30px_70px_rgba(0,0,0,0.85)] hover:border-[#c5a880]/30 gpu-accelerated"
                  style={{
                    clipPath: idx % 2 === 0 
                      ? "polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)" 
                      : "polygon(0% 0%, 98% 2%, 100% 100%, 2% 98%)",
                  }}
                >
                  {/* Visual Glassmorphic Shine Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-[#c5a880]/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-10" />
                  
                  {/* Tech indicator spec overlays */}
                  <div className="absolute top-4 left-4 z-15 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-black/90 backdrop-blur-md px-2.5 py-1 border border-white/10 font-micro text-[7px] text-[#c5a880] tracking-widest uppercase">
                      PROJECT 0{idx + 1}
                    </div>
                  </div>

                  <Image
                    src={project.image}
                    alt={project.client}
                    fill
                    sizes="65vw"
                    className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                  />
                </div>

                {/* Offset High-End Typography Card */}
                <div 
                  className="absolute bg-zinc-950/85 backdrop-blur-2xl border border-white/10 hover:border-[#c5a880]/30 p-6 md:p-8 w-[min(420px,85%)] z-20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-700 text-left"
                  style={{
                    bottom: "-10%",
                    right: idx % 2 === 0 ? "3%" : "auto",
                    left: idx % 2 !== 0 ? "3%" : "auto",
                  }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-micro text-[9px] text-[#c5a880] uppercase tracking-[0.2em] block font-bold">
                      0{idx + 1} • COMPLETED PROJECT
                    </span>
                    <span className="font-display text-[10px] text-white/30 font-bold uppercase tracking-widest">
                      [ 0{idx + 1} / 0{projects.length} ]
                    </span>
                  </div>
                  
                  <h3 className="font-display text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-[#c5a880] transition-colors duration-500">
                    {project.client}
                  </h3>
                  
                  <p className="font-body text-xs md:text-sm text-text-muted mb-6 leading-relaxed font-medium">
                    {project.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-[9px] font-micro uppercase text-white/50 pt-5 border-t border-white/10">
                    <div className="border-l border-[#c5a880]/30 pl-3">
                      <span className="text-white/30 block mb-0.5">Project Area</span>
                      <span className="text-white font-bold tracking-widest text-[10px]">{project.area}</span>
                    </div>
                    <div className="border-l border-[#9fb89b]/30 pl-3">
                      <span className="text-white/30 block mb-0.5">Status</span>
                      <span className="text-[#9fb89b] font-bold tracking-widest text-[10px]">COMPLETED ✓</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          ))}

          {/* End Outro Panel */}
          <section className="horizontal-panel w-[100vw] h-full flex flex-col justify-center px-12 md:px-24 lg:px-36 flex-shrink-0 select-none relative">
            <div className="max-w-3xl border-l-2 border-[#9fb89b] pl-8 text-left">
              <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none">
                Transforming
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9fb89b] to-[#c5a880]">
                  Work Premises.
                </span>
              </h3>
              <p className="font-body text-text-muted text-base sm:text-lg mb-10 leading-relaxed font-medium">
                We offer complete sales and service support in epoxy flooring, epoxy coving, polyurethane systems, car parking flooring, anti-corrosion, anti-fungal coating, and under water tank coating.
              </p>
              <a href="#contact" className="inline-block px-9 py-4 bg-[#c5a880] text-black font-micro text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 relative group overflow-hidden border border-transparent shadow-lg">
                <span className="relative z-10">CONTACT OUR DIRECTORS</span>
                <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
