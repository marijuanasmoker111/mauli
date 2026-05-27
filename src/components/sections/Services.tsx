"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { services } from "@/data/mock";

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray(".service-slide") as HTMLElement[];

      // Slide 0 entrance animation on initial page load
      const slide0 = slides[0];
      if (slide0) {
        const title0 = slide0.querySelector(".reveal-title");
        const subtitle0 = slide0.querySelector(".reveal-subtitle");
        const specs0 = slide0.querySelectorAll(".reveal-spec");
        
        gsap.timeline({ delay: 0.6 })
          .fromTo(title0, { yPercent: 105 }, { yPercent: 0, duration: 1.1, ease: "power4.out" })
          .fromTo(subtitle0, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.75")
          .fromTo(specs0, { opacity: 0, x: -15 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.7, ease: "power3.out" }, "-=0.65");
      }

      // Create a single master timeline pinned to the parent container to prevent overlaps
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${window.innerHeight * (slides.length - 1)}`,
          invalidateOnRefresh: true,
        }
      });

      // Stagger slide transitions and multi-planar parallax on the master timeline
      slides.forEach((slide, index) => {
        if (index === 0) return;

        const img = slide.querySelector(".bg-parallax-image");

        // 1. Animate slide panel entering vertically
        tl.fromTo(slide,
          { yPercent: 100 },
          { yPercent: 0, ease: "none" },
          index - 1
        );

        // 2. Animate background image translating in opposite direction (parallax depth)
        if (img) {
          tl.fromTo(img,
            { yPercent: -30 },
            { yPercent: 0, ease: "none" },
            index - 1
          );
        }

        // 3. Staggered inner text reveals inside the active scroll slide frame
        const title = slide.querySelector(".reveal-title");
        const subtitle = slide.querySelector(".reveal-subtitle");
        const specs = slide.querySelectorAll(".reveal-spec");

        if (title) {
          tl.fromTo(title,
            { yPercent: 105 },
            { yPercent: 0, ease: "power2.out" },
            (index - 1) + 0.15
          );
        }
        if (subtitle) {
          tl.fromTo(subtitle,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, ease: "power2.out" },
            (index - 1) + 0.3
          );
        }
        if (specs.length > 0) {
          tl.fromTo(specs,
            { opacity: 0, x: -15 },
            { opacity: 1, x: 0, stagger: 0.08, ease: "power2.out" },
            (index - 1) + 0.4
          );
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div id="services" ref={containerRef} className="relative h-screen bg-[#050505] overflow-hidden">
      {services.map((service, idx) => (
        <section
          key={service.id}
          className="service-slide absolute inset-0 w-full h-full flex flex-col justify-between p-5 sm:p-8 md:p-16 lg:p-24 bg-black"
          style={{ zIndex: idx + 1 }}
          aria-label={`Service: ${service.title}`}
        >
          {/* Background image & gradient overlay */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="bg-parallax-image absolute inset-0 w-full h-[130%] -top-[15%]">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover opacity-45 sm:opacity-55"
                {...(idx > 0 ? { loading: "lazy" } : { priority: true })}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/20 z-10" />
          </div>

          {/* Top Bar with Number indicator and Crosshairs */}
          <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-4 w-full">
            {/* Corner crosshairs */}
            <div className="absolute bottom-[-5px] left-0 font-mono text-[9px] text-white/20 select-none pointer-events-none">+</div>
            <div className="absolute bottom-[-5px] right-0 font-mono text-[9px] text-white/20 select-none pointer-events-none">+</div>

            <span className="font-micro text-xs text-[#c5a880] uppercase tracking-widest flex items-center gap-2 select-none">
              <span className="w-1.5 h-1.5 bg-[#c5a880] rounded-full animate-pulse" />
              CAPABILITIES & SERVICES
            </span>
            <span className="font-display font-bold text-lg text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>
              [ 0{idx + 1} / 0{services.length} ]
            </span>
          </div>

          {/* Main Info */}
          <div className="relative z-10 max-w-4xl mt-auto mb-4 sm:mb-12">
            <h2 className="font-display text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight text-balance text-left overflow-hidden py-1">
              <span className="block translate-y-[105%] reveal-title select-none">
                {service.title}
              </span>
            </h2>
            <p className="font-body text-text-muted text-xs sm:text-base md:text-xl max-w-2xl mb-6 sm:mb-12 text-left reveal-subtitle opacity-0 select-none leading-relaxed">
              {service.subtitle}
            </p>

            {/* Spec grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3 sm:gap-6 font-micro border-t border-white/10 pt-4 sm:pt-8 text-left relative">
              {/* Corner crosshairs */}
              <div className="absolute top-[-5px] left-0 font-mono text-[9px] text-white/20 select-none pointer-events-none">+</div>
              <div className="absolute top-[-5px] right-0 font-mono text-[9px] text-white/20 select-none pointer-events-none">+</div>

              {service.specs.map((spec, sIdx) => (
                <div key={sIdx} className="reveal-spec border-l border-[#c5a880]/30 pl-3 py-0.5 sm:pl-4 sm:py-1 opacity-0">
                  <span className="block text-[8px] sm:text-[9px] text-text-muted uppercase tracking-wider mb-0.5 sm:mb-1">
                    FEATURE 0{sIdx + 1}
                  </span>
                  <span className="block text-[10px] sm:text-xs md:text-sm font-bold text-white uppercase tracking-wider leading-tight">
                    {spec}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
