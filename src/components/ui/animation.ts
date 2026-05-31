import gsap from "gsap";

/**
 * Reusable "Wet Paint" viscous tactile ripple micro-interaction.
 * Spawns an absolute circular element at touch/click coordinates, 
 * scales it up smoothly while warping its boundary via the SVG displacement filter,
 * and fades it out, simulating wet industrial resin spreading.
 */
export const triggerWetPaintRipple = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
  const button = e.currentTarget;
  
  // Clean up any stale ripples
  const activeRipples = button.querySelectorAll(".wet-paint-ripple");
  activeRipples.forEach(r => r.remove());

  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Create absolute ripple element
  const ripple = document.createElement("span");
  ripple.className = "wet-paint-ripple absolute rounded-full pointer-events-none bg-white/20";
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.style.width = "40px";
  ripple.style.height = "40px";
  ripple.style.transform = "translate(-50%, -50%) scale(0)";
  ripple.style.filter = "url(#epoxy-liquid-filter)"; // Warps the circle organically

  // Ensure button has relative positioning (handled in classes, reinforced inline)
  if (window.getComputedStyle(button).position === "static") {
    button.style.position = "relative";
  }
  
  button.style.overflow = "hidden";

  // Append to button
  button.appendChild(ripple);

  // Animate scale/opacity and clean up
  gsap.to(ripple, {
    scale: 10,
    opacity: 0,
    duration: 0.7,
    ease: "power2.out",
    onComplete: () => {
      ripple.remove();
    }
  });
};
