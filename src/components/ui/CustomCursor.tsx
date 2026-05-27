"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Completely bail out on touch devices — no JS listeners, no resources wasted
    if (window.matchMedia("(hover: none)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;
    if (!cursorDot || !cursorOutline) return;

    // Direct pointer tracking using optimized transforms
    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      
      // Hardware accelerated translation
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out"
      });

      gsap.to(cursorOutline, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power3.out"
      });
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    // Soft swell and custom border color when hovering over interactive triggers
    const onMouseEnterLink = () => {
      gsap.to(cursorOutline, {
        scale: 1.6,
        backgroundColor: "rgba(197, 168, 128, 0.08)",
        borderColor: "rgba(197, 168, 128, 0.7)",
        borderWidth: "1.5px",
        duration: 0.25,
        ease: "power2.out"
      });
      gsap.to(cursorDot, {
        scale: 0.4,
        backgroundColor: "#c5a880",
        duration: 0.25,
        ease: "power2.out"
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursorOutline, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(248, 249, 250, 0.35)",
        borderWidth: "1px",
        duration: 0.2,
        ease: "power2.out"
      });
      gsap.to(cursorDot, {
        scale: 1,
        backgroundColor: "#f8f9fa",
        duration: 0.2,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    const attachListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, select, input, textarea, [role='button'], .draggable-trigger"
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    attachListeners();

    // Throttled MutationObserver to avoid excessive DOM re-scanning
    let mutationTimeout: ReturnType<typeof setTimeout> | null = null;
    const observer = new MutationObserver(() => {
      if (mutationTimeout) return;
      mutationTimeout = setTimeout(() => {
        attachListeners();
        mutationTimeout = null;
      }, 300);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
      if (mutationTimeout) clearTimeout(mutationTimeout);
    };
  }, []);

  // Don't render cursor elements at all on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      <style jsx global>{`
        @media (min-width: 768px) {
          body, a, button, select, input, textarea {
            cursor: none !important;
          }
        }
      `}</style>
      
      {/* Precision Micro Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 bg-[#f8f9fa] rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 hidden md:block opacity-0 gpu-accelerated`}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      
      {/* Precision Micro Circle */}
      <div
        ref={cursorOutlineRef}
        className={`fixed top-0 left-0 w-7 h-7 border border-[#f8f9fa]/35 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 hidden md:block opacity-0 gpu-accelerated`}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
}
