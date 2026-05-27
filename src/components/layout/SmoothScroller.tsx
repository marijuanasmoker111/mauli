"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function SmoothScroller({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scrolling with manual tick sync
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      infinite: false,
      syncTouch: true,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll events directly to GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Feed Lenis RAF into GSAP Ticker for absolute frame synchronization
    const rafUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafUpdate);

    // Optimize GSAP lag smoothing
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafUpdate);
      lenis.destroy();
    };
  }, []);

  return <div className="w-full relative">{children}</div>;
}
