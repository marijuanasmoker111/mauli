"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function NumbersThatMatter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const number1Ref = useRef<HTMLSpanElement>(null);
  const number2Ref = useRef<HTMLSpanElement>(null);
  const number3Ref = useRef<HTMLSpanElement>(null);
  const number4Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const animateNumber = (ref: React.RefObject<HTMLSpanElement | null>, endValue: number, suffix: string = "") => {
      if (!ref.current) return;
      const obj = { value: 0 };
      
      gsap.to(obj, {
        value: endValue,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.innerText = Math.floor(obj.value).toLocaleString() + suffix;
          }
        },
      });
    };

    animateNumber(number1Ref, 18, "+");
    animateNumber(number2Ref, 50, "+");
    animateNumber(number3Ref, 11500, " SQM");
    animateNumber(number4Ref, 17, "+");

    // Ambient background color shift on scroll trigger
    gsap.to(containerRef.current, {
      backgroundColor: "#06090e",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      }
    });

  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 lg:py-36 bg-[#030303] text-white overflow-hidden border-y border-white/5 bg-dot-grid transition-colors duration-1000"
    >
      {/* Visual cyber mesh overlays */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-[#c5a880]/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Subtitle / HUD block */}
        <div className="flex flex-col items-start text-left mb-16 md:mb-20">
          <span className="font-micro text-[10px] text-[#c5a880] tracking-widest uppercase block mb-1">
            KEY METRICS
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold uppercase text-white leading-none">
            Proven Track Record
          </h2>
        </div>

        {/* Industrial grid outline blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          
          {/* Stat 1 */}
          <div className="bg-[#030303]/80 backdrop-blur-sm p-8 md:p-10 flex flex-col justify-between items-start text-left h-48 md:h-64 hover:bg-surface/40 transition-colors duration-500 relative group">
            <div className="mt-auto">
              <span 
                ref={number1Ref}
                aria-label="18+ Years in Business"
                className="font-display text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-tighter"
              >
                0
              </span>
              <span className="block font-micro text-[10px] sm:text-[11px] uppercase tracking-widest text-[#c5a880] mt-4 font-semibold">
                Years in Business
              </span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#c5a880] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </div>

          {/* Stat 2 */}
          <div className="bg-[#030303]/80 backdrop-blur-sm p-8 md:p-10 flex flex-col justify-between items-start text-left h-48 md:h-64 hover:bg-surface/40 transition-colors duration-500 relative group">
            <div className="mt-auto">
              <span 
                ref={number2Ref}
                aria-label="50+ Total Employees"
                className="font-display text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-tighter"
              >
                0
              </span>
              <span className="block font-micro text-[10px] sm:text-[11px] uppercase tracking-widest text-[#9fb89b] mt-4 font-semibold">
                Total Employees
              </span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9fb89b] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </div>

          {/* Stat 3 */}
          <div className="bg-[#030303]/80 backdrop-blur-sm p-8 md:p-10 flex flex-col justify-between items-start text-left h-48 md:h-64 hover:bg-surface/40 transition-colors duration-500 relative group">
            <div className="mt-auto">
              <span 
                ref={number3Ref}
                aria-label="11,500 SQM Maximum Flooring Capacity"
                className="font-display text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-tighter"
              >
                0
              </span>
              <span className="block font-micro text-[10px] sm:text-[11px] uppercase tracking-widest text-[#d28c5a] mt-4 font-semibold">
                Maximum Flooring Capacity
              </span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d28c5a] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </div>

          {/* Stat 4 */}
          <div className="bg-[#030303]/80 backdrop-blur-sm p-8 md:p-10 flex flex-col justify-between items-start text-left h-48 md:h-64 hover:bg-surface/40 transition-colors duration-500 relative group">
            <div className="mt-auto">
              <span 
                ref={number4Ref}
                aria-label="17+ Corporate Clients"
                className="font-display text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-tighter"
              >
                0
              </span>
              <span className="block font-micro text-[10px] sm:text-[11px] uppercase tracking-widest text-white/55 mt-4 font-semibold">
                Corporate Clients
              </span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </div>

        </div>

      </div>
    </section>
  );
}
