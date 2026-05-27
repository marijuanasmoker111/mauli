"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#clients", label: "Clients" },
  { href: "#leadership", label: "Leadership" },
  { href: "#contact", label: "Contact" },
] as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Track active hash
  useEffect(() => {
    const handleHashChange = () => setActiveHash(window.location.hash || "#home");
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!mobileMenuOpen || !mobileMenuRef.current) return;

    const menuEl = mobileMenuRef.current;
    const focusableEls = menuEl.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableEls[0];
    const lastFocusable = focusableEls[focusableEls.length - 1];

    // Focus first element on open
    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-700 border-b ${
        isScrolled
          ? "bg-black/60 backdrop-blur-xl border-white/5 py-4"
          : "bg-transparent border-transparent py-7"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
        
        {/* Sleek Editorial Logo Block */}
        <a href="#home" className="flex flex-col text-left group select-none">
          <span className="font-display font-black text-lg md:text-xl tracking-tight text-white group-hover:text-accent-blue transition-colors duration-300">
            MAULI
          </span>
          <span className="font-micro text-[7px] tracking-[0.25em] text-text-muted group-hover:text-white transition-colors duration-300">
            ENTERPRISES
          </span>
        </a>

        {/* Desktop Nav - Clean, Invisible HUD Style */}
        <nav className="hidden md:flex items-center gap-10 font-micro text-[10px] tracking-widest uppercase">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeHash === link.href ? "page" : undefined}
              className={`relative py-1 transition-colors duration-300 ${
                activeHash === link.href
                  ? "text-white font-bold flex items-center gap-1.5"
                  : "text-text-muted hover:text-white"
              }`}
            >
              {activeHash === link.href && (
                <span className="w-1 h-1 bg-accent-blue rounded-full" />
              )}
              {link.label}
            </a>
          ))}
        </nav>

        {/* Premium Invisible CTA with soft hover glow */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#contact"
            className="px-6 py-3 bg-white/5 border border-white/10 hover:border-accent-blue/50 font-micro text-[9px] uppercase tracking-widest text-[#f8f9fa] hover:text-accent-blue transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">CONTACT US</span>
            <div className="absolute inset-0 bg-accent-blue/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </a>
        </div>

        {/* Mobile menu trigger — 44x44 touch target */}
        <button
          ref={hamburgerRef}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-menu"
          className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 text-[#f8f9fa] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 rounded-md hover:text-accent-blue transition-colors duration-300"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Panel — slide-down animation */}
      <div
        id="mobile-nav-menu"
        ref={mobileMenuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`md:hidden fixed inset-x-0 bottom-0 bg-black/95 backdrop-blur-2xl z-50 flex flex-col border-t border-white/5 transition-all duration-300 ease-out ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        style={{ top: headerRef.current?.offsetHeight ?? 72 }}
      >
        <nav className="flex flex-col flex-1 overflow-y-auto p-8 pt-4 font-micro text-xs tracking-widest uppercase text-left">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              aria-current={activeHash === link.href ? "page" : undefined}
              className={`min-h-[48px] flex items-center border-b border-white/5 transition-colors duration-200 ${
                activeHash === link.href
                  ? "text-white font-bold gap-2"
                  : "text-text-muted hover:text-white"
              }`}
            >
              {activeHash === link.href && (
                <span className="w-1 h-1 bg-accent-blue rounded-full flex-shrink-0" />
              )}
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={closeMobileMenu}
            className="mt-10 mb-4 py-4 bg-white text-black font-section text-center text-[10px] font-bold uppercase tracking-widest hover:bg-accent-blue hover:text-white transition-colors duration-300"
          >
            CONTACT US
          </a>
        </nav>
      </div>
    </header>
  );
}
