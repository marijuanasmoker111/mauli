"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { clients } from "@/data/mock";

export default function Clients() {
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);
  const marqueeRef3 = useRef<HTMLDivElement>(null);
  
  const tween1 = useRef<gsap.core.Tween | null>(null);
  const tween2 = useRef<gsap.core.Tween | null>(null);
  const tween3 = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    // Left-to-right marquee (Very slow and elegant)
    const m1 = marqueeRef1.current;
    if (m1) {
      const totalWidth = m1.scrollWidth / 2;
      
      tween1.current = gsap.to(m1, {
        x: -totalWidth,
        duration: 55, // Reduced speed (originally 25s)
        ease: "none",
        repeat: -1,
      });
    }

    // Right-to-left marquee (Even slower, reverse direction)
    const m2 = marqueeRef2.current;
    if (m2) {
      const totalWidth = m2.scrollWidth / 2;
      
      tween2.current = gsap.fromTo(m2,
        { x: -totalWidth },
        {
          x: 0,
          duration: 65, // Reduced speed (originally 20s)
          ease: "none",
          repeat: -1,
        }
      );
    }

    // Third row of marquee (Slowest, distinct weight and size)
    const m3 = marqueeRef3.current;
    if (m3) {
      const totalWidth = m3.scrollWidth / 2;
      
      tween3.current = gsap.to(m3, {
        x: -totalWidth,
        duration: 80, // Slowest speed
        ease: "none",
        repeat: -1,
      });
    }

    return () => {
      tween1.current?.kill();
      tween2.current?.kill();
      tween3.current?.kill();
    };
  }, []);

  // Softly pause and resume animations on hover to feel ultra-premium
  const handleMouseEnter = () => {
    gsap.to([tween1.current, tween2.current, tween3.current], { timeScale: 0.15, duration: 1.2, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to([tween1.current, tween2.current, tween3.current], { timeScale: 1, duration: 1.2, ease: "power2.out" });
  };

  return (
    <section 
      id="clients" 
      className="relative py-20 md:py-32 lg:py-44 bg-[#030303] text-white overflow-hidden border-b border-white/5 flex flex-col justify-center select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Depth ambient layers in background with premium warm bronze/gold gradient glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-[#c5a880]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c5a880]/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#9fb89b]/3 rounded-full blur-[150px] pointer-events-none" />

      {/* Editorial Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-20 w-full text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="font-micro text-xs text-[#c5a880] uppercase tracking-[0.25em] block mb-3 font-bold">
              ESTABLISHED PORTFOLIO
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black leading-tight text-white tracking-tighter uppercase">
              We have done some
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a880] via-[#f8f9fa] to-[#9fb89b]">
                dynamic projects
              </span>
              <br />
              in reputed companies.
            </h2>
          </div>
          <div className="max-w-sm md:mb-2">
            <p className="font-body text-text-muted text-xs sm:text-sm leading-relaxed border-l border-white/10 pl-6">
              Our company has successfully delivered high-performance industrial flooring and cleanroom finishing works for standard corporate manufacturing premises across Indore, Pune, and major industrial hubs.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Top Border */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12 relative z-10" />

      {/* Marquee Row 1: Bold & Clean */}
      <div className="relative z-10 w-full overflow-hidden mb-4 md:mb-8 group cursor-pointer pointer-events-auto">
        <div 
          ref={marqueeRef1} 
          className="flex whitespace-nowrap gap-16 md:gap-24 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black tracking-tighter uppercase items-center"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {/* Double list for infinite loop */}
          {[...clients, ...clients].map((client, idx) => (
            <div 
              key={`mq1-${client.id}-${idx}`}
              className="flex items-center gap-16 md:gap-24 text-white/20 hover:text-[#c5a880] transition-colors duration-500"
            >
              <span>{client.name}</span>
              <span className="text-xs text-[#c5a880]/30 font-micro font-normal">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2: Gold & Italics */}
      <div className="relative z-10 w-full overflow-hidden mb-4 md:mb-8 group cursor-pointer pointer-events-auto">
        <div 
          ref={marqueeRef2} 
          className="flex whitespace-nowrap gap-16 md:gap-24 text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-display font-bold italic tracking-tight uppercase items-center"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {[...clients, ...clients].map((client, idx) => {
            const isGold = idx % 2 === 0;
            const opacityClass = isGold 
              ? "text-[#c5a880]/20 hover:text-white" 
              : "text-white/10 hover:text-[#9fb89b]";
            return (
              <div 
                key={`mq2-${client.id}-${idx}`}
                className={`flex items-center gap-16 md:gap-24 transition-colors duration-500 ${opacityClass}`}
              >
                <span>{client.name}</span>
                <span className="text-xs text-white/20 font-micro font-normal">♦</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marquee Row 3: Light & Minimal */}
      <div className="relative z-10 w-full overflow-hidden group cursor-pointer pointer-events-auto">
        <div 
          ref={marqueeRef3} 
          className="flex whitespace-nowrap gap-16 md:gap-24 text-xl sm:text-2xl md:text-3xl lg:text-5xl font-body font-light tracking-widest uppercase items-center"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {[...clients, ...clients].map((client, idx) => (
            <div 
              key={`mq3-${client.id}-${idx}`}
              className="flex items-center gap-16 md:gap-24 text-white/10 hover:text-[#9fb89b] transition-colors duration-500"
            >
              <span>{client.name}</span>
              <span className="text-xs text-[#9fb89b]/30 font-micro font-normal">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-12 relative z-10" />
      
      {/* Client Count */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mt-8 w-full flex justify-center items-center font-micro text-[11px] sm:text-xs text-white/30 uppercase tracking-widest">
        <span>{clients.length} TRUSTED CLIENTS</span>
      </div>

    </section>
  );
}
