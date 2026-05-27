"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!loaderRef.current || !textRef.current || !subtextRef.current) return;

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        document.body.style.overflow = "";
      },
    });

    // Stagger letter reveals (Using clipPath or split words for cinematic effect)
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power4.out" }
    )
    .fromTo(
      subtextRef.current,
      { opacity: 0, letterSpacing: "0.1em" },
      { opacity: 1, letterSpacing: "0.2em", duration: 0.5, ease: "power3.out" },
      "-=0.3"
    )
    .to(
      loaderRef.current,
      { 
        yPercent: -100, 
        duration: 0.65, 
        ease: "expo.inOut" 
      },
      "+=0.5"
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303] text-white select-none pointer-events-none"
      style={{ willChange: "transform" }}
    >
      
      <div className="relative z-10 text-center">
        <h1
          ref={textRef}
          className="font-display font-black text-5xl md:text-7xl tracking-tighter uppercase mb-4 leading-none"
        >
          MAULI
          <br />
          ENTERPRISES
        </h1>
        <p
          ref={subtextRef}
          className="font-micro uppercase tracking-widest text-[9px] md:text-[10px] text-text-muted"
        >
          Building precision surfaces since 2008
        </p>
      </div>
    </div>
  );
}
