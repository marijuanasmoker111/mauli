"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { projects } from "@/data/mock";

export default function VerticalProjects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".project-slide") as HTMLElement[];
      
      // Create a master timeline pinned to the container with full spacing and hardware acceleration
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${window.innerHeight * (sections.length - 1)}`,
          invalidateOnRefresh: true,
        }
      });

      // Stagger slide reveals on the master timeline to prevent overlaps with strict hardware acceleration
      sections.forEach((section, index) => {
        if (index === 0) return; // First slide is already visible

        const image = section.querySelector(".project-img") as HTMLElement;
        const content = section.querySelector(".project-content") as HTMLElement;

        // Reveal slide using high-performance clipPath polygon transition on the master timeline
        tl.fromTo(section,
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
          { 
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", 
            ease: "power2.inOut",
            force3D: true
          },
          index - 1
        );

        if (image) {
          tl.fromTo(image,
            { scale: 1.25, yPercent: 15 },
            { 
              scale: 1, 
              yPercent: 0, 
              ease: "none",
              force3D: true 
            },
            index - 1
          );
        }

        if (content) {
          tl.fromTo(content,
            { opacity: 0, y: 40 },
            { 
              opacity: 1, 
              y: 0, 
              ease: "expo.out",
              force3D: true
            },
            index - 0.75
          );
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-black bg-dot-grid">
      {projects.map((project, index) => (
        <section
          key={project.id}
          className="project-slide absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between"
          style={{ zIndex: index + 1 }}
        >
          {/* Background image & mask overlay */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="project-img w-full h-full relative gpu-accelerated">
              <Image
                src={project.image}
                alt={project.client}
                fill
                sizes="100vw"
                className="object-cover object-center opacity-40 mix-blend-luminosity scale-110"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
            </div>
          </div>

          {/* Project Details Content */}
          <div className="project-content relative z-10 w-full h-full flex flex-col justify-end p-8 md:p-16 lg:p-24 max-w-4xl select-none">
            <span className="font-micro text-[9px] md:text-[10px] text-accent-blue uppercase tracking-[0.25em] mb-3 block font-bold">
              0{index + 1} / PROJECT DETAILS
            </span>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7.5vw font-black text-[#f8f9fa] mb-6 leading-none tracking-tighter">
              {project.client}
            </h2>
            <p className="font-body text-text-muted text-base md:text-lg max-w-2xl mb-10 leading-relaxed font-medium">
              {project.description}
            </p>

            {/* Spec Sheets - Asymmetrical Industrial Style */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-white/10 font-micro text-left max-w-2xl">
              <div>
                <span className="block text-[9px] text-text-muted uppercase tracking-widest mb-1 font-bold">Service Type</span>
                <span className="block text-xs md:text-sm font-bold text-white uppercase tracking-wider">{project.type}</span>
              </div>
              <div>
                <span className="block text-[9px] text-text-muted uppercase tracking-widest mb-1 font-bold">Project Area</span>
                <span className="block text-xs md:text-sm font-bold text-accent-green uppercase tracking-wider">{project.area}</span>
              </div>
              <div>
                <span className="block text-[9px] text-text-muted uppercase tracking-widest mb-1 font-bold">Location</span>
                <span className="block text-xs md:text-sm font-bold text-white uppercase tracking-wider">{project.location}</span>
              </div>
            </div>
          </div>

          {/* Floating HUD Card on Desktop */}
          <div className="hidden lg:flex relative z-10 mr-24 w-80 h-[480px] border border-white/10 bg-surface/40 backdrop-blur-xl p-8 flex-col justify-between shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-dot-grid opacity-10" />
            <div className="relative z-10 font-micro text-[8px] text-text-muted flex justify-between tracking-widest">
              <span>MAULI FLOORING</span>
              <span>INDEX: 0{index + 1}/0{projects.length}</span>
            </div>
            
            <div className="relative h-1/2 w-full border border-white/10 overflow-hidden">
              <Image
                src={project.image}
                alt={project.client}
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            <div className="relative z-10 text-left">
              <p className="font-body text-[11px] text-text-muted mb-5 leading-relaxed font-medium">
                {project.description}
              </p>
              
              <button className="w-full py-3 bg-[#f8f9fa] hover:bg-accent-blue text-black hover:text-white font-micro text-[9px] font-bold uppercase tracking-widest transition-all duration-300 relative group overflow-hidden border border-transparent">
                <span className="relative z-10">View Details</span>
                <div className="absolute inset-0 bg-accent-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
