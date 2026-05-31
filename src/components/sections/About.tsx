"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;
    const statements = gsap.utils.toArray(".statement-item") as HTMLElement[];
    const isMobile = window.innerWidth < 768;

    statements.forEach((statement) => {
      const heading = statement.querySelector("h2");
      const sweepDivider = statement.querySelector(".curing-sweep-divider");

      if (isMobile) {
        // Mobile layout: smooth entrance scroll reveal
        ScrollTrigger.create({
          trigger: statement,
          start: "top 88%",
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            tl.fromTo(statement,
              { opacity: 0.25, y: 15 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
            );
            if (sweepDivider) {
              tl.fromTo(sweepDivider,
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 1, duration: 1, ease: "power2.out" },
                "-=0.6"
              );
            }
          }
        });
      } else {
        // Desktop Layout: Focus Curing Scrubbing (Uncured fluid -> Cured solid)
        // 1. Entrance / Curing Timeline: Lights up, disappears blur, and condenses letterSpacing
        const enterTl = gsap.timeline({
          scrollTrigger: {
            trigger: statement,
            start: "top 82%",      // Enters the focus zone
            end: "top 52%",        // Reaches full focus in center
            scrub: true,
            invalidateOnRefresh: true,
          }
        });

        enterTl.fromTo(statement, 
          { opacity: 0.12, filter: "blur(2px)" },
          { opacity: 1, filter: "blur(0px)", ease: "none" }
        );

        if (heading) {
          // Condenses molecular structure from loose to high-strength tight
          enterTl.fromTo(heading,
            { letterSpacing: "0.08em" },
            { letterSpacing: "-0.03em", ease: "none" },
            0
          );
        }

        if (sweepDivider) {
          enterTl.fromTo(sweepDivider,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, ease: "none" },
            0
          );
        }

        // 2. Exit / Decuring Timeline: Dims and blurs back out as it exits the top
        const exitTl = gsap.timeline({
          scrollTrigger: {
            trigger: statement,
            start: "top 44%",      // Leaves full focus center
            end: "top 12%",        // Exits top of viewport
            scrub: true,
            invalidateOnRefresh: true,
          }
        });

        exitTl.to(statement, {
          opacity: 0.12,
          filter: "blur(2.2px)",
          ease: "none"
        });

        if (heading) {
          exitTl.to(heading, {
            letterSpacing: "0.04em",
            ease: "none"
          }, 0);
        }

        if (sweepDivider) {
          exitTl.to(sweepDivider, {
            scaleX: 0,
            opacity: 0,
            ease: "none"
          }, 0);
        }
      }
    });

    // Animate the main intro block
    const intro = containerRef.current.querySelector(".reveal-intro");
    if (intro) {
      const sub = intro.querySelector(".reveal-intro-sub");
      const title = intro.querySelector(".reveal-intro-title");
      
      ScrollTrigger.create({
        trigger: intro,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          if (sub) {
            tl.fromTo(sub, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 });
          }
          if (title) {
            tl.fromTo(title, { yPercent: 105 }, { yPercent: 0, duration: 0.9, ease: "power4.out" }, "-=0.4");
          }
        }
      });
    }

  }, []);

  return (
    <section 
      id="leadership"
      ref={containerRef}
      className="relative py-20 md:py-32 lg:py-48 bg-bg-base text-white overflow-hidden border-b border-white/5 bg-dot-grid"
    >
      {/* Background cyber accent vectors */}
      <div className="absolute inset-y-0 left-12 w-px bg-white/5 hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-px bg-white/5 hidden md:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Conceptual introduction HUD block */}
        <div className="max-w-2xl mb-12 md:mb-24 text-left reveal-intro">
          <span className="reveal-intro-sub font-micro text-[10px] text-accent-orange tracking-widest uppercase block mb-1 select-none">
            COMPANY LEADERSHIP & FOUNDATION
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold uppercase text-white leading-[1.15] overflow-hidden relative pb-2 pt-1">
            <span className="block reveal-intro-title select-none">About Mauli Enterprises</span>
          </h2>
        </div>

        <div className="flex flex-col gap-16 md:gap-24 lg:gap-36 text-left max-w-5xl">
          
          {/* Statement 1 */}
          <div className="statement-item flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-16 border-t border-white/10 pt-10 relative">
            <div className="curing-sweep-divider absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5a880]/80 to-transparent scale-x-0 origin-center pointer-events-none" />
            <div className="md:w-1/2">
              <span className="font-micro text-[10px] text-accent-orange uppercase tracking-widest block mb-4 font-bold">
                BUSINESS SINCE 2008
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter uppercase leading-none">
                ESTABLISHED 2008.
              </h2>
            </div>
            <div className="md:w-1/2 flex flex-col justify-center">
              <p className="font-body text-text-muted text-base md:text-lg leading-relaxed">
                Our founder, Mr. Dnyaneshwar B. Mhaske, established Mauli Enterprises in 2008. Since then, we have grown into a strong, dynamic organization specializing in industrial epoxy flooring and professional painting services.
              </p>
            </div>
          </div>

          {/* Statement 2 */}
          <div className="statement-item flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-16 border-t border-white/10 pt-10 relative">
            <div className="curing-sweep-divider absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5a880]/80 to-transparent scale-x-0 origin-center pointer-events-none" />
            <div className="md:w-1/2">
              <span className="font-micro text-[10px] text-accent-blue uppercase tracking-widest block mb-4 font-bold">
                SERVICE PROVIDER
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-green">
                LEADING PROVIDER.
              </h2>
            </div>
            <div className="md:w-1/2">
              <p className="font-body text-text-muted text-base md:text-lg leading-relaxed">
                As a leading service provider in industrial flooring material supply and application, we are committed to offering comprehensive sales and service support to our customers across all project stages.
              </p>
            </div>
          </div>

          {/* Statement 3 */}
          <div className="statement-item flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-16 border-t border-white/10 pt-10 relative">
            <div className="curing-sweep-divider absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5a880]/80 to-transparent scale-x-0 origin-center pointer-events-none" />
            <div className="md:w-1/2">
              <span className="font-micro text-[10px] text-accent-green uppercase tracking-widest block mb-4 font-bold">
                PHARMACEUTICAL PROJECTS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter uppercase leading-none">
                DYNAMIC PROJECTS.
              </h2>
            </div>
            <div className="md:w-1/2">
              <p className="font-body text-text-muted text-base md:text-lg leading-relaxed">
                We have a strong track record of executing critical flooring projects for highly reputed pharmaceutical companies, including industry leaders such as Cipla Ltd, Mylan, Wockhardt Ltd, Glenmark Pharmaceuticals, Lupin, and Johnson & Johnson.
              </p>
            </div>
          </div>

          {/* Statement 4 */}
          <div className="statement-item flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-16 border-t border-white/10 pt-10 relative">
            <div className="curing-sweep-divider absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5a880]/80 to-transparent scale-x-0 origin-center pointer-events-none" />
            <div className="md:w-1/2">
              <span className="font-micro text-[10px] text-white/50 uppercase tracking-widest block mb-4 font-bold">
                SERVICES OFFERED
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                OUR CORE SERVICES.
              </h2>
            </div>
            <div className="md:w-1/2">
              <p className="font-body text-text-muted text-base md:text-lg leading-relaxed">
                We offer specialized services including wall painting, MS structure painting, Epoxy/PU flooring, coving, and clean room finishing. Our ultimate goal is to transform your premises into attractive, highly efficient workplaces.
              </p>
            </div>
          </div>

          {/* Statement 5: Leadership Board from PDF page 12 */}
          <div className="statement-item flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-16 border-t border-white/10 pt-10 relative">
            <div className="curing-sweep-divider absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5a880]/80 to-transparent scale-x-0 origin-center pointer-events-none" />
            <div className="md:w-1/2">
              <span className="font-micro text-[10px] text-accent-blue uppercase tracking-widest block mb-4 font-bold">
                OWNER & DIRECTORS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-green to-white">
                FOUNDER & BOARD
              </h2>
            </div>
            <div className="md:w-1/2">
              <p className="font-body text-text-muted text-base md:text-lg leading-relaxed mb-8">
                Since its establishment in 2008, Mauli Enterprises has been guided by the strong vision of Mr. Dnyaneshwar B. Mhaske. Together with our dedicated board of directors, we ensure flawless execution across all industrial and manufacturing corridors.
              </p>
              
              <div className="grid grid-cols-1 gap-4 font-micro border border-white/10 p-6 bg-surface/30">
                <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1 border-b border-white/5 pb-2">
                  <span className="text-white/40 uppercase">Owner / Founder</span>
                  <span className="text-white font-bold uppercase">Mr. Dnyaneshwar B. Mhaske</span>
                </div>
                <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1 border-b border-white/5 pb-2">
                  <span className="text-white/40 uppercase">Director</span>
                  <span className="text-white font-bold uppercase">Mr. Mangesh D. Mhaske</span>
                </div>
                <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1">
                  <span className="text-white/40 uppercase">Director</span>
                  <span className="text-white font-bold uppercase">Mr. Rahul D. Mhaske</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
