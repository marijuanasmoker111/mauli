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

      // Create a single master timeline pinned to the parent container to prevent overlaps
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          scrub: true,
          start: "top top",
          end: () => `+=${window.innerHeight * (slides.length - 1)}`,
        }
      });

      // Stagger slide transitions on the master timeline
      slides.forEach((slide, index) => {
        if (index === 0) return;

        tl.fromTo(slide,
          { yPercent: 100 },
          { yPercent: 0, ease: "none" },
          index - 1
        );
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
          <div className="absolute inset-0 z-0">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover opacity-25 sm:opacity-35 mix-blend-luminosity"
              {...(idx > 0 ? { loading: "lazy" } : { priority: true })}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/30" />
          </div>

          {/* Top Bar with Number indicator */}
          <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-4 w-full">
            <span className="font-micro text-xs text-[#c5a880] uppercase tracking-widest">
              CAPABILITIES & SERVICES
            </span>
            <span className="font-display font-bold text-lg text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>
              [ 0{idx + 1} / 0{services.length} ]
            </span>
          </div>

          {/* Main Info */}
          <div className="relative z-10 max-w-4xl mt-auto mb-12">
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 uppercase tracking-tight leading-none text-balance text-left">
              {service.title}
            </h2>
            <p className="font-body text-text-muted text-base sm:text-xl max-w-2xl mb-12 text-left">
              {service.subtitle}
            </p>

            {/* Spec grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 font-micro border-t border-white/10 pt-8 text-left">
              {service.specs.map((spec, sIdx) => (
                <div key={sIdx} className="border-l border-[#c5a880]/30 pl-4 py-1">
                  <span className="block text-[9px] text-text-muted uppercase tracking-wider mb-1">
                    FEATURE 0{sIdx + 1}
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-white uppercase">
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
