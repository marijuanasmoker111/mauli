"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <section className="relative py-24 md:py-36 bg-[#050505] text-white overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <span className="font-micro text-xs text-accent-green uppercase tracking-widest block mb-2 font-bold">
              THE TRANSFORMATION
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-tight text-balance">
              Premises
              <br />
              Transformation.
            </h2>
          </div>
          <div>
            <p className="font-body text-text-muted text-base md:text-lg max-w-lg">
              We transform your work premises into attractive and efficient workplaces. Swipe the slider below to see how our high-quality flooring applications drastically improve industrial spaces.
            </p>
          </div>
        </div>

        {/* Drag Comparison Slider Container */}
        <div
          ref={containerRef}
          className="relative aspect-[4/3] sm:aspect-[16/9] w-full max-w-5xl mx-auto bg-surface overflow-hidden border border-white/10 select-none cursor-ew-resize"
          style={{ touchAction: 'none' }}
          role="slider"
          aria-label="Before and after comparison slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPosition)}
          tabIndex={0}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerDown={handlePointerDown}
        >
          {/* Before Image (Old Floor) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hd_old_floor.png"
              alt="Before Application"
              fill
              className="object-cover pointer-events-none filter mix-blend-luminosity brightness-75"
            />
            <span role="img" aria-label="Before: Substrate before application" className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/10 px-4 py-1.5 font-micro text-xs uppercase tracking-widest">
              Substrate Before Application
            </span>
          </div>

          {/* After Image (New Floor with Clip Path) */}
          <div
            className="absolute inset-0 z-10 overflow-hidden"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <Image
              src="/images/hd_new_floor.png"
              alt="Attractive & Efficient Workplace"
              fill
              className="object-cover pointer-events-none"
            />
            <span role="img" aria-label="After: Attractive and efficient workplace" className="absolute top-4 right-4 bg-accent-blue/90 border border-white/10 px-4 py-1.5 font-micro text-xs uppercase tracking-widest text-black font-bold">
              Attractive & Efficient Workplace
            </span>
          </div>

          {/* Slider line & handle */}
          <div
            className="absolute top-0 bottom-0 z-20 w-0.5 bg-accent-blue pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black border border-accent-blue flex items-center justify-center pointer-events-none shadow-2xl transition-transform duration-150 ${isDragging ? 'scale-110' : 'scale-100'}`}>
              <span className="text-[10px] text-accent-blue font-bold tracking-tighter select-none font-micro">↔</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
