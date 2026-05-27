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

    statements.forEach((statement) => {
      gsap.fromTo(statement,
        { opacity: 0.05, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: statement,
            start: "top 80%",
            end: "top 45%",
            scrub: true,
          }
        }
      );
    });

  }, []);

  return (
    <section 
      id="leadership"
      ref={containerRef}
      className="relative py-20 md:py-32 lg:py-48 bg-[#030303] text-white overflow-hidden border-b border-white/5 bg-dot-grid"
    >
      {/* Background cyber accent vectors */}
      <div className="absolute inset-y-0 left-12 w-px bg-white/5 hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-px bg-white/5 hidden md:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Conceptual introduction HUD block */}
        <div className="max-w-2xl mb-12 md:mb-24 text-left">
          <span className="font-micro text-[10px] text-accent-orange tracking-widest uppercase block mb-1">
            COMPANY LEADERSHIP & FOUNDATION
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold uppercase text-white leading-none">
            About Mauli Enterprises
          </h2>
        </div>

        <div className="flex flex-col gap-16 md:gap-24 lg:gap-36 text-left max-w-5xl">
          
          {/* Statement 1 */}
          <div className="statement-item flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-16 border-t border-white/10 pt-10">
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
          <div className="statement-item flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-16 border-t border-white/10 pt-10">
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
          <div className="statement-item flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-16 border-t border-white/10 pt-10">
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
          <div className="statement-item flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-16 border-t border-white/10 pt-10">
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
          <div className="statement-item flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-16 border-t border-white/10 pt-10">
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
