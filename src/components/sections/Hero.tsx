"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Header from "../layout/Header";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hardware accelerated parallax transition
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    if (bgImageRef.current) {
      tl.to(bgImageRef.current, { 
        yPercent: 15, 
        scale: 1.05, 
        force3D: true,
        ease: "none" 
      });
    }

    // Initial stagger text reveals - elegant, premium curve
    const revealTl = gsap.timeline({ delay: 0.5 });
    
    if (titleRef.current) {
      const titleLines = titleRef.current.querySelectorAll("span > span");
      revealTl.fromTo(
        titleLines,
        { yPercent: 105 },
        { 
          yPercent: 0, 
          stagger: 0.15, 
          duration: 1.2, 
          ease: "power4.out",
          force3D: true 
        }
      );
    }
    
    if (subtitleRef.current) {
      revealTl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          force3D: true 
        },
        "-=0.8"
      );
    }

    if (ctaRef.current) {
      revealTl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          force3D: true 
        },
        "-=0.8"
      );
    }

    if (indicatorRef.current) {
      revealTl.fromTo(
        indicatorRef.current,
        { opacity: 0, autoAlpha: 0 },
        { opacity: 1, autoAlpha: 1, duration: 1 },
        "-=0.4"
      );
    }

    return () => {
      tl.kill();
      revealTl.kill();
    };
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      role="banner"
      className="relative min-h-screen md:h-screen w-full overflow-hidden bg-[#060708] text-[#f8f9fa] flex flex-col justify-center pt-28 md:pt-36 pb-24 px-6 md:px-12 lg:px-24"
    >
      <Header />

      {/* Cinematic Parallax Ambient Background */}
      <div ref={bgImageRef} className="absolute inset-0 z-0 h-[115%] -top-[7.5%] select-none pointer-events-none gpu-accelerated">
        <Image
          src="/images/hd_hero_floor.png"
          alt="Mauli Enterprises Cleanroom Flooring"
          fill
          quality={85}
          fetchPriority="high"
          className="object-cover object-center opacity-75"
          priority
        />
        {/* Soft elegant gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base/75 via-transparent to-bg-base" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-base/80 via-bg-base/35 to-transparent" />
      </div>

      {/* Architectural Meta Tag */}
      <div className="absolute top-32 left-6 md:left-12 lg:left-24 z-10 hidden md:flex items-center gap-4 font-micro text-[10px] text-[#c5a880] tracking-[0.2em] uppercase opacity-90">
        <span className="w-1.5 h-1.5 bg-[#c5a880] rounded-full" />
        <span>MAULI ENTERPRISES</span>
        <span className="w-8 h-[1px] bg-[#c5a880]/30" />
        <span>EST. 2008</span>
      </div>

      <div className="relative z-10 max-w-5xl text-left mt-12 md:mt-0 select-none">
        <h1 
          ref={titleRef} 
          className="font-display font-bold fluid-heading-xl mb-6 leading-[1.05] tracking-tight"
        >
          <span className="block overflow-hidden relative py-1">
            <span className="block text-white select-none">Make Happy</span>
          </span>
          <span className="block overflow-hidden relative py-1">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c5a880] via-[#e2cda3] to-[#c5a880] select-none">
              Workplace.
            </span>
          </span>
        </h1>

        <p 
          ref={subtitleRef}
          className="font-body text-[#f5f6f7]/70 text-base md:text-lg lg:text-xl max-w-2xl mb-8 md:mb-12 leading-relaxed font-light"
        >
          We transform your work premises into attractive and efficient workplaces. We are one of the leading service providers in Industrial Flooring material supply and application since 2008.
        </p>

        {/* Premium Call to Actions */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 font-micro text-[11px] tracking-[0.15em]">
          <a href="#gallery" className="w-full sm:w-auto min-h-[48px] px-10 py-4 bg-[#c5a880] hover:bg-[#d6b991] text-[#060708] font-bold uppercase transition-all duration-500 ease-out text-center shadow-[0_0_40px_rgba(197,168,128,0.15)] inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#c5a880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060708] outline-none">
            <span>View Project Gallery</span>
          </a>
          
          <a href="#contact" className="w-full sm:w-auto min-h-[48px] px-10 py-4 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white font-medium uppercase transition-all duration-500 ease-out border border-white/10 text-center inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#c5a880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060708] outline-none">
            <span>Contact Directors</span>
          </a>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div 
        ref={indicatorRef}
        className="absolute bottom-10 left-6 md:left-12 lg:left-24 z-10 hidden sm:flex flex-col gap-3 font-micro text-[9px] tracking-[0.2em] text-[#f5f6f7]/50 select-none pointer-events-none"
      >
        <span className="w-[1px] h-12 bg-gradient-to-b from-[#c5a880]/50 to-transparent mx-auto sm:mx-0 sm:ml-2"></span>
        <span className="uppercase">Scroll to explore</span>
      </div>
    </section>
  );
}
