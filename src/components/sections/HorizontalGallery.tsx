"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { projects } from "@/data/mock";
import { triggerWetPaintRipple } from "@/components/ui/animation";

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 768;
    const panels = gsap.utils.toArray(".horizontal-panel") as HTMLElement[];
    const mobileCards = gsap.utils.toArray(".mobile-project-card") as HTMLElement[];
    
    // Desktop mouse move parallax / multi-planar cards & hover gloss
    const desktopMouseHandlers = new Map<HTMLElement, { move: (e: MouseEvent) => void; leave: () => void }>();

    const ctx = gsap.context(() => {
      if (!isMobile) {
        // Desktop Layout: Pinned horizontal scroll traversal
        const container = containerRef.current;
        const trigger = triggerRef.current;
        if (!container || !trigger) return;

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

        // Parallax image rotates inside the panel container
        panels.forEach((panel) => {
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

        // Concept 5 & 2: Desktop 3D Mouse Parallax & Hover Gloss Reflection
        panels.forEach((panel) => {
          const imgContainer = panel.querySelector(".asym-img") as HTMLElement;
          const textCard = panel.querySelector(".offset-text-card") as HTMLElement;
          
          if (!imgContainer) return;

          const handleMouseMove = (e: MouseEvent) => {
            const rect = panel.getBoundingClientRect();
            // Normalized offset from center (-1 to 1)
            const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
            
            // Render Gloss coords on hover
            const imgRect = imgContainer.getBoundingClientRect();
            const glossX = ((e.clientX - imgRect.left) / imgRect.width) * 100;
            const glossY = ((e.clientY - imgRect.top) / imgRect.height) * 100;
            imgContainer.style.setProperty("--gloss-x", `${glossX}%`);
            imgContainer.style.setProperty("--gloss-y", `${glossY}%`);

            gsap.to(imgContainer, {
              x: normX * 14,
              y: normY * 8,
              rotateY: normX * 4,
              rotateX: -normY * 4,
              transformPerspective: 1000,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
              force3D: true
            });

            if (textCard) {
              gsap.to(textCard, {
                x: -normX * 20, // Opposite direction shift
                y: -normY * 12,
                duration: 0.45,
                ease: "power2.out",
                overwrite: "auto",
                force3D: true
              });
            }
          };

          const handleMouseLeave = () => {
            gsap.to(imgContainer, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.8, ease: "power2.out", overwrite: "auto" });
            if (textCard) {
              gsap.to(textCard, { x: 0, y: 0, duration: 0.8, ease: "power2.out", overwrite: "auto" });
            }
          };

          panel.addEventListener("mousemove", handleMouseMove);
          panel.addEventListener("mouseleave", handleMouseLeave);
          desktopMouseHandlers.set(panel, { move: handleMouseMove, leave: handleMouseLeave });
        });
      } else {
        // Mobile Layout: Scroll-driven paint-roll card reveals
        mobileCards.forEach((card, idx) => {
          const clipPathEl = document.getElementById(`mobile-gallery-path-${idx}`);
          
          ScrollTrigger.create({
            trigger: card,
            start: "top 88%",
            once: true,
            onEnter: () => {
              const tl = gsap.timeline();
              if (clipPathEl) {
                // Initial sagging roller wave
                gsap.set(clipPathEl, { attr: { d: "M 0 0.12 C 0.3 0.28, 0.7 0.28, 1 0.12 L 1 1 L 0 1 Z" } });
                
                // Roll sweep reveal
                tl.to(clipPathEl, {
                  attr: { d: "M 0 0 C 0.3 -0.06, 0.7 -0.06, 1 0 L 1 1 L 0 1 Z" },
                  duration: 0.85,
                  ease: "power2.inOut"
                }).to(clipPathEl, {
                  attr: { d: "M 0 0 C 0.3 0, 0.7 0, 1 0 L 1 1 L 0 1 Z" },
                  duration: 0.45,
                  ease: "power2.out"
                }, "-=0.15");
              }
            }
          });
        });
      }
    }, triggerRef);

    // Concept 2: Mobile Gyroscopic Gloss + Parallax Tracking (Global Tilt Response)
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const { gamma, beta } = e;
      if (gamma !== null && beta !== null) {
        // Map tilt to 0% - 100% gloss gradient position
        targetX = Math.max(0, Math.min(100, ((gamma + 30) / 60) * 100));
        targetY = Math.max(0, Math.min(100, ((beta - 15) / 60) * 100));
        
        // Multi-planar gyroscopic parallax for mobile cards
        if (isMobile) {
          const tiltX = Math.max(-1, Math.min(1, gamma / 30));
          const tiltY = Math.max(-1, Math.min(1, (beta - 45) / 30));
          
          mobileCards.forEach((card) => {
            const img = card.querySelector(".mobile-project-image") as HTMLElement;
            const textCard = card.querySelector(".mobile-text-card") as HTMLElement;
            
            if (img) {
              gsap.to(img, { x: tiltX * 8, y: tiltY * 5, duration: 0.45, ease: "power1.out", overwrite: "auto" });
            }
            if (textCard) {
              gsap.to(textCard, { x: -tiltX * 12, y: -tiltY * 8, duration: 0.45, ease: "power1.out", overwrite: "auto" });
            }
          });
        }
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);

    const ticker = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      
      // Update custom CSS gloss glare coordinates on all images
      const images = document.querySelectorAll(".asym-img, .mobile-project-image-container");
      images.forEach((img) => {
        (img as HTMLElement).style.setProperty("--gloss-x", `${currentX}%`);
        (img as HTMLElement).style.setProperty("--gloss-y", `${currentY}%`);
      });
    };

    gsap.ticker.add(ticker);

    return () => {
      ctx.revert();
      window.removeEventListener("deviceorientation", handleOrientation);
      gsap.ticker.remove(ticker);
      
      panels.forEach((panel) => {
        const handler = desktopMouseHandlers.get(panel);
        if (handler) {
          panel.removeEventListener("mousemove", handler.move);
          panel.removeEventListener("mouseleave", handler.leave);
        }
      });
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
            className="mobile-project-card relative bg-zinc-950/80 border border-white/10 overflow-hidden"
          >
            {/* Image */}
            <div 
              className="mobile-project-image-container aspect-[16/10] w-full relative overflow-hidden"
              style={{
                clipPath: `url(#mobile-gallery-clip-${idx})`,
                WebkitClipPath: `url(#mobile-gallery-clip-${idx})`
              }}
            >
              <Image
                src={project.image}
                alt={project.client}
                fill
                sizes="100vw"
                className="mobile-project-image object-cover"
              />
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-black/90 backdrop-blur-md px-2.5 py-1 border border-white/10 font-micro text-[7px] text-[#c5a880] tracking-widest uppercase">
                  PROJECT 0{idx + 1}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="mobile-text-card p-5 relative z-10 bg-zinc-950/85 border-t border-white/10">
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

              <p className="font-body text-xs text-text-muted mb-5 leading-relaxed font-medium font-medium">
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
          <a href="#contact" onClick={triggerWetPaintRipple} className="inline-block px-7 py-3.5 bg-[#c5a880] text-black font-micro text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 relative group overflow-hidden border border-transparent shadow-lg">
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
                  className="offset-text-card absolute bg-zinc-950/85 backdrop-blur-2xl border border-white/10 hover:border-[#c5a880]/30 p-6 md:p-8 w-[min(420px,85%)] z-20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-transform duration-[0.45s] ease-out text-left"
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
              <a href="#contact" onClick={triggerWetPaintRipple} className="inline-block px-9 py-4 bg-[#c5a880] text-black font-micro text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 relative group overflow-hidden border border-transparent shadow-lg">
                <span className="relative z-10">CONTACT OUR DIRECTORS</span>
                <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Invisible SVG Definition for mobile Paint-Roll reveals */}
      <svg className="absolute pointer-events-none opacity-0" aria-hidden="true" style={{ width: 0, height: 0 }}>
        <defs>
          {projects.map((project, idx) => (
            <clipPath 
              key={`mobile-clip-${project.id}`} 
              id={`mobile-gallery-clip-${idx}`} 
              clipPathUnits="objectBoundingBox"
            >
              <path 
                id={`mobile-gallery-path-${idx}`} 
                d="M 0 0 C 0.3 0, 0.7 0, 1 0 L 1 1 L 0 1 Z" 
              />
            </clipPath>
          ))}
        </defs>
      </svg>
    </div>
  );
}
