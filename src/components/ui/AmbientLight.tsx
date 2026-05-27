"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function AmbientLight() {
  const mouseBlobRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch / non-hover devices
    if (window.matchMedia("(hover: none)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const blob = mouseBlobRef.current;
    if (!blob) return;

    // Set initial position out of view
    gsap.set(blob, { xPercent: -50, yPercent: -50, x: -500, y: -500 });

    const handleMouseMove = (e: MouseEvent) => {
      // Hardware-accelerated follow with high-end lag smoothing
      gsap.to(blob, {
        x: e.clientX,
        y: e.clientY,
        duration: 2.2,
        ease: "power2.out",
        force3D: true,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 select-none pointer-events-none overflow-hidden gpu-accelerated">
      {/* 1. Dynamic Mouse-following lighting orb (hidden on touch devices for performance) */}
      {!isTouchDevice && (
        <div
          ref={mouseBlobRef}
          className="fixed top-0 left-0 w-[40vw] h-[40vw] rounded-full bg-[#c5a880]/5.5 blur-[100px] mix-blend-screen opacity-90 will-change-transform pointer-events-none"
        />
      )}

      {/* 2. Deep static backdrop layers (Golden/Bronze, Sage green, Terracotta) */}
      <div className="absolute top-[10%] right-[5%] w-[45vw] h-[45vw] rounded-full bg-[#c5a880]/4.5 blur-[140px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#9fb89b]/4 blur-[150px] mix-blend-screen pointer-events-none" />
      <div className="absolute top-[50%] left-[40%] w-[40vw] h-[40vw] rounded-full bg-[#d28c5a]/3.5 blur-[120px] mix-blend-screen pointer-events-none" />
    </div>
  );
}
