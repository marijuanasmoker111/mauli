"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import gsap from "gsap";
import { triggerWetPaintRipple } from "@/components/ui/animation";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  facilityType: z.string().min(1, { message: "Please select a service type." }),
  area: z.string().min(1, { message: "Area scale is required." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [formPhase, setFormPhase] = useState<"form" | "melting" | "success">("form");
  const liquidProgressPathRef = useRef<SVGPathElement>(null);
  
  // Refs for each input underline
  const nameUnderlineRef = useRef<SVGPathElement>(null);
  const emailUnderlineRef = useRef<SVGPathElement>(null);
  const phoneUnderlineRef = useRef<SVGPathElement>(null);
  const serviceUnderlineRef = useRef<SVGPathElement>(null);
  const areaUnderlineRef = useRef<SVGPathElement>(null);
  const messageUnderlineRef = useRef<SVGPathElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      facilityType: "",
      area: "",
      message: "",
    }
  });

  const watchedValues = watch();

  // Concept 2: Glare Card + Gyro drift
  useEffect(() => {
    const formCard = document.querySelector(".form-glass-panel") as HTMLElement;
    if (!formCard) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = formCard.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      gsap.to(formCard, {
        "--gloss-x": `${x}%`,
        "--gloss-y": `${y}%`,
        duration: 0.35,
        ease: "power2.out"
      });
    };
    
    formCard.addEventListener("mousemove", handleMouseMove);

    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const { gamma, beta } = e;
      if (gamma !== null && beta !== null) {
        targetX = Math.max(0, Math.min(100, ((gamma + 30) / 60) * 100));
        targetY = Math.max(0, Math.min(100, ((beta - 15) / 60) * 100));
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);

    const ticker = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      formCard.style.setProperty("--gloss-x", `${currentX}%`);
      formCard.style.setProperty("--gloss-y", `${currentY}%`);
      
      const gyroX = (currentX - 50) * 0.2;
      const gyroY = (currentY - 50) * 0.2;
      document.querySelectorAll(".magnetic-target").forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.setProperty("--gyro-x", `${gyroX}px`);
        htmlEl.style.setProperty("--gyro-y", `${gyroY}px`);
      });
    };
    
    gsap.ticker.add(ticker);

    return () => {
      formCard.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleOrientation);
      gsap.ticker.remove(ticker);
    };
  }, []);

  // Magnetic Pull Handlers
  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(container.querySelector(".magnetic-target") || container, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    gsap.to(container.querySelector(".magnetic-target") || container, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)"
    });
  };

  // Underline fluid morph animator
  const animateUnderline = (ref: React.RefObject<SVGPathElement | null>, isFocus: boolean) => {
    const path = ref.current;
    if (!path) return;
    if (isFocus) {
      const obj = { y1: 10, y2: 10, y3: 10 };
      gsap.killTweensOf(obj);
      gsap.timeline({
        onUpdate: () => {
          if (path) {
            path.setAttribute("d", `M 0,10 C 50,${obj.y1} 100,${obj.y2} 150,${obj.y3} 200,10`);
          }
        }
      })
      .to(obj, { y1: 22, y2: -2, y3: 18, duration: 0.25, ease: "power2.out" })
      .to(obj, { y1: 2, y2: 18, y3: 4, duration: 0.2, ease: "power1.inOut" })
      .to(obj, { y1: 10, y2: 10, y3: 10, duration: 0.8, ease: "elastic.out(1, 0.4)" });
    } else {
      gsap.to(path, {
        attr: { d: "M 0,10 C 50,10 100,10 150,10 200,10" },
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  // CTA specularity position
  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    btn.style.setProperty("--btn-gloss-x", `${x}%`);
    btn.style.setProperty("--btn-gloss-y", `${y}%`);
  };

  // Epoxy mixing level physics
  useEffect(() => {
    let targetHeightPct = 0;
    let currentHeightPct = 0;
    let sloshAmplitude = 0;
    
    const fields = ["name", "email", "phone", "facilityType", "area", "message"] as const;
    const count = fields.filter(f => {
      const val = watchedValues[f];
      return val && val.trim() !== "";
    }).length;
    targetHeightPct = (count / fields.length) * 100;
    
    sloshAmplitude = 8; // Slosh on update
    
    const ticker = () => {
      currentHeightPct += (targetHeightPct - currentHeightPct) * 0.08;
      sloshAmplitude += (1.5 - sloshAmplitude) * 0.05;
      
      if (liquidProgressPathRef.current) {
        const maxH = 280;
        const fillH = (currentHeightPct / 100) * maxH;
        const yTop = maxH - fillH;
        
        const phase = Date.now() / 200;
        const waveOffset = Math.sin(phase) * sloshAmplitude;
        
        const path = `M 0,${maxH} L 0,${yTop} Q 8,${yTop + waveOffset} 16,${yTop} L 16,${maxH} Z`;
        liquidProgressPathRef.current.setAttribute("d", path);
      }
    };
    
    gsap.ticker.add(ticker);
    return () => gsap.ticker.remove(ticker);
  }, [watchedValues]);

  // Melter success effect
  useEffect(() => {
    if (isSubmitSuccessful) {
      setFormPhase("melting");
      
      const displacementEl = document.getElementById("contact-displacement");
      const formEl = document.querySelector(".contact-form-fields") as HTMLElement;
      const successEl = document.querySelector(".contact-success-fields") as HTMLElement;
      
      if (displacementEl && formEl && successEl) {
        const tl = gsap.timeline({
          onComplete: () => {
            setFormPhase("success");
          }
        });
        
        gsap.set(successEl, { display: "flex", opacity: 0, y: 30 });
        
        tl.to(displacementEl, {
          attr: { scale: 80 },
          duration: 0.8,
          ease: "power2.in"
        })
        .to(formEl, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.in"
        }, "-=0.3")
        .to(successEl, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.2")
        .to(displacementEl, {
          attr: { scale: 0 },
          duration: 0.4
        });
      } else {
        setFormPhase("success");
      }
    }
  }, [isSubmitSuccessful]);

  const onSubmit = async (data: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form Submitted:", data);
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 lg:py-44 bg-bg-base text-white overflow-hidden border-t border-white/5">
      
      {/* Golden/Bronze ambient blurred glows in the background */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#c5a880]/3 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#9fb89b]/3 rounded-full blur-[180px] pointer-events-none" />

      {/* Viscous Noise Melt SVG Filter */}
      <svg className="absolute pointer-events-none opacity-0" style={{ width: 0, height: 0 }}>
        <defs>
          <filter id="contact-dissolve-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" id="contact-displacement" />
          </filter>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Info Side */}
          <div className="flex flex-col h-full justify-between text-left">
            <div>
              <span className="font-micro text-xs text-[#c5a880] uppercase tracking-[0.25em] block mb-3 font-bold">
                LET&apos;S CONNECT
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-[5.5vw] font-black text-white mb-8 tracking-tighter uppercase leading-[0.95]">
                Get in
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a880] via-[#f8f9fa] to-[#9fb89b]">
                  Touch.
                </span>
              </h2>
              <p className="font-body text-text-muted text-base sm:text-lg max-w-md mb-12 leading-relaxed font-medium">
                Get in touch with our technical team for premium industrial flooring and painting material supply and application.
              </p>
            </div>

            {/* Quick Contacts Coordinates */}
            <div className="flex flex-col gap-8 font-micro border-t border-white/10 pt-10">
              
              {/* Phone */}
              <div 
                onMouseMove={handleMagneticMove} 
                onMouseLeave={handleMagneticLeave}
                className="flex items-start gap-5 group cursor-pointer"
              >
                <div 
                  className="magnetic-target w-12 h-12 border border-white/10 group-hover:border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] transition-colors duration-500 flex-shrink-0"
                  style={{ transform: 'translate(var(--gyro-x, 0px), var(--gyro-y, 0px))' }}
                >
                  <Phone size={16} />
                </div>
                <div 
                  className="magnetic-target"
                  style={{ transform: 'translate(var(--gyro-x, 0px), var(--gyro-y, 0px))' }}
                >
                  <span className="block text-[8px] text-white/30 uppercase tracking-widest mb-1">Phone Support</span>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+918975155557" onClick={triggerWetPaintRipple} className="block text-sm font-bold text-white hover:text-[#c5a880] transition-colors relative overflow-hidden">
                      +91 89751 55557
                    </a>
                    <a href="tel:+919049206690" onClick={triggerWetPaintRipple} className="block text-xs font-semibold text-text-muted hover:text-[#c5a880] transition-colors relative overflow-hidden">
                      +91 90492 06690
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div 
                onMouseMove={handleMagneticMove} 
                onMouseLeave={handleMagneticLeave}
                className="flex items-start gap-5 group cursor-pointer"
              >
                <div 
                  className="magnetic-target w-12 h-12 border border-white/10 group-hover:border-[#9fb89b]/40 flex items-center justify-center text-[#9fb89b] transition-colors duration-500 flex-shrink-0"
                  style={{ transform: 'translate(var(--gyro-x, 0px), var(--gyro-y, 0px))' }}
                >
                  <Mail size={16} />
                </div>
                <div 
                  className="magnetic-target"
                  style={{ transform: 'translate(var(--gyro-x, 0px), var(--gyro-y, 0px))' }}
                >
                  <span className="block text-[8px] text-white/30 uppercase tracking-widest mb-1">Email Address</span>
                  <a href="mailto:maulienterprises@gmail.com" onClick={triggerWetPaintRipple} className="block text-sm font-bold text-white hover:text-[#9fb89b] transition-colors relative overflow-hidden">
                    maulienterprises@gmail.com
                  </a>
                </div>
              </div>

              {/* HQ Address */}
              <div 
                onMouseMove={handleMagneticMove} 
                onMouseLeave={handleMagneticLeave}
                className="flex items-start gap-5 group cursor-pointer"
              >
                <div 
                  className="magnetic-target w-12 h-12 border border-white/10 group-hover:border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] transition-colors duration-500 flex-shrink-0"
                  style={{ transform: 'translate(var(--gyro-x, 0px), var(--gyro-y, 0px))' }}
                >
                  <MapPin size={16} />
                </div>
                <div 
                  className="magnetic-target"
                  style={{ transform: 'translate(var(--gyro-x, 0px), var(--gyro-y, 0px))' }}
                >
                  <span className="block text-[8px] text-white/30 uppercase tracking-widest mb-1">Corporate Headquarters</span>
                  <span className="block text-xs font-bold text-white uppercase leading-relaxed tracking-wider">
                    Gut No.170 Plot No.73, CIDCO Waluj,<br />
                    Mahanagar 1, Tisgaon, Aurangabad - 431136
                  </span>
                </div>
              </div>
            </div>

            {/* Board of Directors Sub-Grid */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <span className="block font-micro text-[8px] text-white/30 uppercase tracking-widest mb-4">DIRECTORS&apos; CONTACT</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-micro text-[10px] text-left overflow-hidden">
                <div className="border-l border-[#c5a880]/30 pl-3 break-words">
                  <span className="block text-white/40 uppercase text-[8px] mb-0.5">Owner</span>
                  <span className="block text-white font-bold uppercase tracking-tight">D. B. Mhaske</span>
                  <a href="tel:+919665773377" onClick={triggerWetPaintRipple} className="block text-[#c5a880] text-[9px] mt-1 hover:underline relative overflow-hidden">+91 96657 73377</a>
                </div>
                <div className="border-l border-white/10 pl-3 break-words">
                  <span className="block text-white/40 uppercase text-[8px] mb-0.5">Director</span>
                  <span className="block text-white font-bold uppercase tracking-tight">M. D. Mhaske</span>
                  <a href="tel:+919049206690" onClick={triggerWetPaintRipple} className="block text-white/60 text-[9px] mt-1 hover:underline relative overflow-hidden">+91 90492 06690</a>
                </div>
                <div className="border-l border-white/10 pl-3 break-words">
                  <span className="block text-white/40 uppercase text-[8px] mb-0.5">Director</span>
                  <span className="block text-white font-bold uppercase tracking-tight">R. D. Mhaske</span>
                  <a href="tel:+918975155557" onClick={triggerWetPaintRipple} className="block text-white/60 text-[9px] mt-1 hover:underline relative overflow-hidden">+91 89751 55557</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="form-glass-panel bg-zinc-950/60 backdrop-blur-3xl border border-white/10 hover:border-[#c5a880]/30 p-8 md:p-12 relative shadow-[0_30px_80px_rgba(0,0,0,0.9)] transition-all duration-700 overflow-hidden">
            
            <div className="flex gap-8 items-stretch">
              
              {/* Vertical Liquid Epoxy Mixing Indicator (Laboratory Vial) */}
              {formPhase === "form" && (
                <div className="hidden sm:flex flex-col items-center justify-between py-8 w-12 border border-white/10 bg-zinc-900/40 relative overflow-hidden flex-shrink-0 rounded-full shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)] z-20">
                  <div className="absolute inset-y-8 right-2.5 flex flex-col justify-between text-[7px] font-micro text-white/30 z-20 pointer-events-none select-none">
                    <span>100%</span>
                    <span>75%</span>
                    <span>50%</span>
                    <span>25%</span>
                    <span>0%</span>
                  </div>
                  
                  <div className="absolute inset-y-8 left-2.5 w-3.5 border border-white/10 bg-black/40 rounded-full overflow-hidden z-10">
                    <svg className="absolute left-0 bottom-0 w-full h-[280px]" viewBox="0 0 16 280" preserveAspectRatio="none">
                      <path 
                        ref={liquidProgressPathRef}
                        d="M 0,280 L 0,280 Q 8,280 16,280 L 16,280 Z" 
                        fill="url(#beakerGradient)"
                      />
                      <defs>
                        <linearGradient id="beakerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#f5e5c9" />
                          <stop offset="40%" stopColor="#c5a880" />
                          <stop offset="100%" stopColor="#4e3c28" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/30 pointer-events-none z-30" />
                </div>
              )}

              {/* Form Content Side */}
              <div className="flex-1 min-w-0 relative">
                
                {formPhase !== "success" ? (
                  <div 
                    className="contact-form-fields flex flex-col gap-8 text-left"
                    style={{ filter: formPhase === "melting" ? "url(#contact-dissolve-filter)" : "none" }}
                  >
                    <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white mb-2 border-b border-white/10 pb-4 text-left">
                      Request a Consultation
                    </h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 text-left">
                      
                      {/* Row 1 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-1.5 relative group">
                          <label htmlFor="contact-name" className="font-micro text-[9px] uppercase text-white/45 tracking-widest">Full Name</label>
                          <input
                            {...register("name")}
                            id="contact-name"
                            type="text"
                            required
                            onFocus={() => animateUnderline(nameUnderlineRef, true)}
                            onBlur={() => animateUnderline(nameUnderlineRef, false)}
                            placeholder="Enter full name"
                            className="peer w-full bg-transparent px-0 py-2.5 min-h-[44px] text-sm font-body text-white focus:outline-none transition-colors rounded-none placeholder-white/20"
                          />
                          <svg className="absolute bottom-0 left-0 w-full h-[10px] pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                            <path 
                              ref={nameUnderlineRef}
                              d="M 0,10 C 50,10 100,10 150,10 200,10" 
                              className="stroke-white/10 peer-focus:stroke-[#c5a880] transition-colors"
                              strokeWidth="1.5"
                              fill="none"
                            />
                          </svg>
                          {errors.name && <span role="alert" className="font-micro text-[8px] text-[#d28c5a] uppercase mt-1 block">{errors.name.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5 relative group">
                          <label htmlFor="contact-email" className="font-micro text-[9px] uppercase text-white/45 tracking-widest">Email Address</label>
                          <input
                            {...register("email")}
                            id="contact-email"
                            type="email"
                            required
                            onFocus={() => animateUnderline(emailUnderlineRef, true)}
                            onBlur={() => animateUnderline(emailUnderlineRef, false)}
                            placeholder="Enter email address"
                            className="peer w-full bg-transparent px-0 py-2.5 min-h-[44px] text-sm font-body text-white focus:outline-none transition-colors rounded-none placeholder-white/20"
                          />
                          <svg className="absolute bottom-0 left-0 w-full h-[10px] pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                            <path 
                              ref={emailUnderlineRef}
                              d="M 0,10 C 50,10 100,10 150,10 200,10" 
                              className="stroke-white/10 peer-focus:stroke-[#c5a880] transition-colors"
                              strokeWidth="1.5"
                              fill="none"
                            />
                          </svg>
                          {errors.email && <span role="alert" className="font-micro text-[8px] text-[#d28c5a] uppercase mt-1 block">{errors.email.message}</span>}
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-1.5 relative group">
                          <label htmlFor="contact-phone" className="font-micro text-[9px] uppercase text-white/45 tracking-widest">Phone Number</label>
                          <input
                            {...register("phone")}
                            id="contact-phone"
                            type="tel"
                            required
                            onFocus={() => animateUnderline(phoneUnderlineRef, true)}
                            onBlur={() => animateUnderline(phoneUnderlineRef, false)}
                            placeholder="Enter phone number"
                            className="peer w-full bg-transparent px-0 py-2.5 min-h-[44px] text-sm font-body text-white focus:outline-none transition-colors rounded-none placeholder-white/20"
                          />
                          <svg className="absolute bottom-0 left-0 w-full h-[10px] pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                            <path 
                              ref={phoneUnderlineRef}
                              d="M 0,10 C 50,10 100,10 150,10 200,10" 
                              className="stroke-white/10 peer-focus:stroke-[#c5a880] transition-colors"
                              strokeWidth="1.5"
                              fill="none"
                            />
                          </svg>
                          {errors.phone && <span role="alert" className="font-micro text-[8px] text-[#d28c5a] uppercase mt-1 block">{errors.phone.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5 relative group">
                          <label htmlFor="contact-facilityType" className="font-micro text-[9px] uppercase text-white/45 tracking-widest">Required Service</label>
                          <select
                            {...register("facilityType")}
                            id="contact-facilityType"
                            required
                            onFocus={() => animateUnderline(serviceUnderlineRef, true)}
                            onBlur={() => animateUnderline(serviceUnderlineRef, false)}
                            className="peer w-full bg-transparent px-0 py-2.5 min-h-[44px] text-sm font-body text-white focus:outline-none transition-colors rounded-none placeholder-white/20 cursor-pointer"
                            style={{ colorScheme: 'dark' }}
                          >
                            <option value="" className="bg-zinc-950 text-white/40">Select service category</option>
                            <option value="epoxy-flooring" className="bg-zinc-950 text-white">Epoxy Flooring & Coating</option>
                            <option value="epoxy-coving" className="bg-zinc-950 text-white">Epoxy Coving & Pencil Coving</option>
                            <option value="polyurethane-flooring" className="bg-zinc-950 text-white">Polyurethane Flooring</option>
                            <option value="polyurethane-coating" className="bg-zinc-950 text-white">Polyurethane Coating</option>
                            <option value="parking-flooring" className="bg-zinc-950 text-white">Car Parking Flooring</option>
                            <option value="corrosion-coatings" className="bg-zinc-950 text-white">Anti Corrosion Coatings</option>
                            <option value="fungal-paints" className="bg-zinc-950 text-white">Anti Fungal Wall Paints</option>
                            <option value="water-linings" className="bg-zinc-950 text-white">Under Water Tank Coatings</option>
                            <option value="painting-work" className="bg-zinc-950 text-white">Wall & MS Structure Painting</option>
                          </select>
                          <svg className="absolute bottom-0 left-0 w-full h-[10px] pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                            <path 
                              ref={serviceUnderlineRef}
                              d="M 0,10 C 50,10 100,10 150,10 200,10" 
                              className="stroke-white/10 peer-focus:stroke-[#c5a880] transition-colors"
                              strokeWidth="1.5"
                              fill="none"
                            />
                          </svg>
                          {errors.facilityType && <span role="alert" className="font-micro text-[8px] text-[#d28c5a] uppercase mt-1 block">{errors.facilityType.message}</span>}
                        </div>
                      </div>

                      {/* Row 3 */}
                      <div className="flex flex-col gap-1.5 relative group">
                        <label htmlFor="contact-area" className="font-micro text-[9px] uppercase text-white/45 tracking-widest">Project Area (SQM)</label>
                        <input
                          {...register("area")}
                          id="contact-area"
                          type="text"
                          required
                          onFocus={() => animateUnderline(areaUnderlineRef, true)}
                          onBlur={() => animateUnderline(areaUnderlineRef, false)}
                          placeholder="e.g. 5,000 SQM"
                          className="peer w-full bg-transparent px-0 py-2.5 min-h-[44px] text-sm font-body text-white focus:outline-none transition-colors rounded-none placeholder-white/20"
                        />
                        <svg className="absolute bottom-0 left-0 w-full h-[10px] pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                          <path 
                            ref={areaUnderlineRef}
                            d="M 0,10 C 50,10 100,10 150,10 200,10" 
                            className="stroke-white/10 peer-focus:stroke-[#c5a880] transition-colors"
                            strokeWidth="1.5"
                            fill="none"
                          />
                        </svg>
                        {errors.area && <span role="alert" className="font-micro text-[8px] text-[#d28c5a] uppercase mt-1 block">{errors.area.message}</span>}
                      </div>

                      {/* Row 4 */}
                      <div className="flex flex-col gap-1.5 relative group">
                        <label htmlFor="contact-message" className="font-micro text-[9px] uppercase text-white/45 tracking-widest">Project Details</label>
                        <textarea
                          {...register("message")}
                          id="contact-message"
                          rows={4}
                          required
                          onFocus={() => animateUnderline(messageUnderlineRef, true)}
                          onBlur={() => animateUnderline(messageUnderlineRef, false)}
                          placeholder="Describe your project requirements, area dimensions, or paint specifications..."
                          className="peer w-full bg-transparent px-0 py-2.5 min-h-[44px] text-sm font-body text-white focus:outline-none transition-colors rounded-none placeholder-white/20 resize-none"
                        />
                        <svg className="absolute bottom-0 left-0 w-full h-[10px] pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                          <path 
                            ref={messageUnderlineRef}
                            d="M 0,10 C 50,10 100,10 150,10 200,10" 
                            className="stroke-white/10 peer-focus:stroke-[#c5a880] transition-colors"
                            strokeWidth="1.5"
                            fill="none"
                          />
                        </svg>
                        {errors.message && <span role="alert" className="font-micro text-[8px] text-[#d28c5a] uppercase mt-1 block">{errors.message.message}</span>}
                      </div>

                      {/* Luxury CTA Button */}
                      <button
                        type="submit"
                        onClick={triggerWetPaintRipple}
                        onMouseMove={handleBtnMouseMove}
                        disabled={isSubmitting}
                        className="w-full mt-6 bg-[#c5a880] hover:bg-white text-black font-micro text-[10px] font-bold uppercase tracking-[0.2em] py-5 flex items-center justify-center gap-3 transition-colors duration-500 disabled:opacity-50 relative group overflow-hidden cursor-pointer"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {isSubmitting ? (
                            <span>SENDING INQUIRY...</span>
                          ) : (
                            <>
                              <span>SUBMIT INQUIRY</span>
                              <Send size={12} className="text-black" />
                            </>
                          )}
                        </span>
                        <span 
                          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_var(--btn-gloss-x,50%)_var(--btn-gloss-y,50%),rgba(255,255,255,0.45)_0%,transparent_50%)] z-20" 
                        />
                        <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 pointer-events-none" />
                      </button>

                    </form>
                  </div>
                ) : (
                  <div className="contact-success-fields flex flex-col items-center justify-center text-center py-16 px-6 relative z-10">
                    <div className="w-20 h-20 rounded-full border-2 border-[#c5a880] flex items-center justify-center text-[#c5a880] mb-8 relative overflow-hidden group">
                      <span className="absolute inset-0 bg-[#c5a880]/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                      <Send size={32} />
                    </div>
                    <h4 className="font-display font-black text-2xl text-white uppercase mb-4 tracking-tight">
                      Resin Cured
                      <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a880] via-white to-[#9fb89b]">
                        Form Sealed.
                      </span>
                    </h4>
                    <p className="font-body text-sm text-text-muted max-w-sm mb-8 leading-relaxed">
                      Your consultation request has been successfully poured. Our technical engineers are reviewing your specifications and will respond with a tailored floor coating plan.
                    </p>
                    <button
                      onClick={() => {
                        reset();
                        setFormPhase("form");
                        const displacementEl = document.getElementById("contact-displacement");
                        if (displacementEl) displacementEl.setAttribute("scale", "0");
                      }}
                      className="border border-[#c5a880]/30 hover:border-[#c5a880] text-[#c5a880] hover:text-black hover:bg-[#c5a880] font-micro text-[9px] font-bold uppercase tracking-widest py-3.5 px-8 transition-colors duration-500 rounded-none relative overflow-hidden cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                  </div>
                )}
                
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
