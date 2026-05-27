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

    // Bento grid stagger reveals
    const bentoCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".bento-grid",
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.fromTo(".bento-card",
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: "power3.out",
              stagger: 0.12
            }
          );
        }
      });
    }, containerRef);

    return () => bentoCtx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-28 lg:py-36 bg-[#030303] text-white overflow-hidden border-y border-white/5 bg-dot-grid transition-colors duration-1000"
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

        {/* Asymmetrical Bento Grid */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Card 1: 11,500 SQM Capacity (Col-span 2) */}
          <div className="bento-card bg-[#030303]/65 border border-white/5 hover:border-[#c5a880]/30 backdrop-blur-md p-8 md:p-10 flex flex-col justify-between items-start text-left h-64 md:h-72 transition-all duration-500 relative group overflow-hidden md:col-span-2">
            {/* Tech crosshairs */}
            <div className="absolute top-2 left-2 font-mono text-[9px] text-white/10 select-none pointer-events-none">+</div>
            <div className="absolute top-2 right-2 font-mono text-[9px] text-white/10 select-none pointer-events-none">+</div>
            <div className="absolute bottom-2 left-2 font-mono text-[9px] text-white/10 select-none pointer-events-none">+</div>
            <div className="absolute bottom-2 right-2 font-mono text-[9px] text-white/10 select-none pointer-events-none">+</div>
            
            {/* Top Info Bar */}
            <div className="flex justify-between items-center w-full font-micro text-[9px] text-white/30 uppercase tracking-widest border-b border-white/5 pb-3">
              <span>CAPACITY METRIC [01]</span>
              <span className="text-[#c5a880] font-semibold">[ FDA & GMP CLEANROOMS ]</span>
            </div>

            <div className="my-auto">
              <span 
                ref={number3Ref}
                aria-label="11,500 SQM Maximum Flooring Capacity"
                className="font-display text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 tracking-tighter"
              >
                0
              </span>
              <span className="block font-micro text-[10px] sm:text-[11px] uppercase tracking-widest text-[#c5a880] mt-3 font-bold">
                Maximum Flooring Capacity
              </span>
            </div>

            <p className="font-body text-[11px] sm:text-xs text-text-muted max-w-xl leading-relaxed mt-2 border-l border-[#c5a880]/20 pl-4">
              Successfully delivered high-performance industrial flooring and cleanroom finishing works across massive pharmaceutical manufacturing corridors.
            </p>

            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#c5a880] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </div>

          {/* Card 2: 18+ Years in Business (Col-span 1) */}
          <div className="bento-card bg-[#030303]/65 border border-white/5 hover:border-[#9fb89b]/30 backdrop-blur-md p-8 md:p-10 flex flex-col justify-between items-start text-left h-64 md:h-72 transition-all duration-500 relative group overflow-hidden md:col-span-1">
            <div className="absolute top-2 left-2 font-mono text-[9px] text-white/10 select-none pointer-events-none">+</div>
            <div className="absolute top-2 right-2 font-mono text-[9px] text-white/10 select-none pointer-events-none">+</div>
            <div className="absolute bottom-2 left-2 font-mono text-[9px] text-white/10 select-none pointer-events-none">+</div>
            <div className="absolute bottom-2 right-2 font-mono text-[9px] text-white/10 select-none pointer-events-none">+</div>

            <div className="flex justify-between items-center w-full font-micro text-[9px] text-white/30 uppercase tracking-widest border-b border-white/5 pb-3">
              <span>FOUNDATION [02]</span>
              <span className="text-[#9fb89b] font-semibold">[ EST. 2008 ]</span>
            </div>

            <div className="my-auto">
              <span 
                ref={number1Ref}
                aria-label="18+ Years in Business"
                className="font-display text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 tracking-tighter"
              >
                0
              </span>
              <span className="block font-micro text-[10px] sm:text-[11px] uppercase tracking-widest text-[#9fb89b] mt-3 font-bold">
                Years in Business
              </span>
            </div>

            <p className="font-body text-[11px] sm:text-xs text-text-muted leading-relaxed mt-2 border-l border-[#9fb89b]/20 pl-4">
              Providing flawless sales, service and material application support since 2008.
            </p>

            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9fb89b] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </div>

          {/* Card 3: 50+ Employees (Col-span 1) */}
          <div className="bento-card bg-[#030303]/65 border border-white/5 hover:border-[#d28c5a]/30 backdrop-blur-md p-8 md:p-10 flex flex-col justify-between items-start text-left h-64 md:h-72 transition-all duration-500 relative group overflow-hidden md:col-span-1">
            <div className="absolute top-2 left-2 font-mono text-[9px] text-white/10 select-none pointer-events-none">+</div>
            <div className="absolute top-2 right-2 font-mono text-[9px] text-white/10 select-none pointer-events-none">+</div>
            <div className="absolute bottom-2 left-2 font-mono text-[9px] text-white/10 select-none pointer-events-none">+</div>
            <div className="absolute bottom-2 right-2 font-mono text-[9px] text-white/10 select-none pointer-events-none">+</div>

            <div className="flex justify-between items-center w-full font-micro text-[9px] text-white/30 uppercase tracking-widest border-b border-white/5 pb-3">
              <span>TEAM SCALE [03]</span>
              <span className="text-[#d28c5a] font-semibold">[ EXPERT FORCE ]</span>
            </div>

            <div className="my-auto">
              <span 
                ref={number2Ref}
                aria-label="50+ Total Employees"
                className="font-display text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 tracking-tighter"
              >
                0
              </span>
              <span className="block font-micro text-[10px] sm:text-[11px] uppercase tracking-widest text-[#d28c5a] mt-3 font-bold">
                Total Employees
              </span>
            </div>

            <p className="font-body text-[11px] sm:text-xs text-text-muted leading-relaxed mt-2 border-l border-[#d28c5a]/20 pl-4">
              A dedicated board of directors and a strong, highly skilled force of specialized technicians.
            </p>

            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d28c5a] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </div>

          {/* Card 4: 17+ Corporate Clients (Col-span 2) */}
          <div className="bento-card bg-[#030303]/65 border border-white/5 hover:border-white/20 backdrop-blur-md p-8 md:p-10 flex flex-col justify-between items-start text-left h-64 md:h-72 transition-all duration-500 relative group overflow-hidden md:col-span-2">
            <div className="absolute top-2 left-2 font-mono text-[9px] text-white/10 select-none pointer-events-none">+</div>
            <div className="absolute top-2 right-2 font-mono text-[9px] text-white/10 select-none pointer-events-none">+</div>
            <div className="absolute bottom-2 left-2 font-mono text-[9px] text-white/10 select-none pointer-events-none">+</div>
            <div className="absolute bottom-2 right-2 font-mono text-[9px] text-white/10 select-none pointer-events-none">+</div>

            <div className="flex justify-between items-center w-full font-micro text-[9px] text-white/30 uppercase tracking-widest border-b border-white/5 pb-3">
              <span>ESTABLISHED TRUST [04]</span>
              <span className="text-white/60 font-semibold">[ INDUSTRIAL LEADERS ]</span>
            </div>

            <div className="my-auto">
              <span 
                ref={number4Ref}
                aria-label="17+ Corporate Clients"
                className="font-display text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 tracking-tighter"
              >
                0
              </span>
              <span className="block font-micro text-[10px] sm:text-[11px] uppercase tracking-widest text-white/70 mt-3 font-bold">
                Reputed Corporate Clients
              </span>
            </div>

            <p className="font-body text-[11px] sm:text-xs text-text-muted max-w-xl leading-relaxed mt-2 border-l border-white/20 pl-4">
              Successfully executed dynamic flooring projects for leading giants like Cipla Ltd, Wockhardt, Lupin, Glenmark, and Johnson & Johnson.
            </p>

            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </div>

        </div>

      </div>
    </section>
  );
}

