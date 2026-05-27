"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, Mail, MapPin, Send } from "lucide-react";

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
  const {
    register,
    handleSubmit,
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

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form Submitted:", data);
    reset();
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 lg:py-44 bg-[#030303] text-white overflow-hidden border-t border-white/5">
      
      {/* Golden/Bronze ambient blurred glows in the background for a luxurious feel */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#c5a880]/3 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#9fb89b]/3 rounded-full blur-[180px] pointer-events-none" />

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
              
              {/* Telephone */}
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 border border-white/10 group-hover:border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] transition-colors duration-500 flex-shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="block text-[8px] text-white/30 uppercase tracking-widest mb-1">Phone Support</span>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+918975155557" className="block text-sm font-bold text-white hover:text-[#c5a880] transition-colors">
                      +91 89751 55557
                    </a>
                    <a href="tel:+919049206690" className="block text-xs font-semibold text-text-muted hover:text-[#c5a880] transition-colors">
                      +91 90492 06690
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 border border-white/10 group-hover:border-[#9fb89b]/40 flex items-center justify-center text-[#9fb89b] transition-colors duration-500 flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="block text-[8px] text-white/30 uppercase tracking-widest mb-1">Email Address</span>
                  <a href="mailto:maulienterprises@gmail.com" className="block text-sm font-bold text-white hover:text-[#9fb89b] transition-colors">
                    maulienterprises@gmail.com
                  </a>
                </div>
              </div>

              {/* HQ Address */}
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 border border-white/10 group-hover:border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] transition-colors duration-500 flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="block text-[8px] text-white/30 uppercase tracking-widest mb-1">Corporate Headquarters</span>
                  <span className="block text-xs font-bold text-white uppercase leading-relaxed tracking-wider">
                    Gut No.170 Plot No.73, CIDCO Waluj,<br />
                    Mahanagar 1, Tisgaon, Aurangabad - 431136
                  </span>
                </div>
              </div>
            </div>

            {/* Board of Directors Sub-Grid (Page 11 facts) */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <span className="block font-micro text-[8px] text-white/30 uppercase tracking-widest mb-4">DIRECTORS&apos; CONTACT</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-micro text-[10px] text-left overflow-hidden">
                <div className="border-l border-[#c5a880]/30 pl-3 break-words">
                  <span className="block text-white/40 uppercase text-[8px] mb-0.5">Owner</span>
                  <span className="block text-white font-bold uppercase tracking-tight">D. B. Mhaske</span>
                  <a href="tel:+919665773377" className="block text-[#c5a880] text-[9px] mt-1 hover:underline">+91 96657 73377</a>
                </div>
                <div className="border-l border-white/10 pl-3 break-words">
                  <span className="block text-white/40 uppercase text-[8px] mb-0.5">Director</span>
                  <span className="block text-white font-bold uppercase tracking-tight">M. D. Mhaske</span>
                  <a href="tel:+919049206690" className="block text-white/60 text-[9px] mt-1 hover:underline">+91 90492 06690</a>
                </div>
                <div className="border-l border-white/10 pl-3 break-words">
                  <span className="block text-white/40 uppercase text-[8px] mb-0.5">Director</span>
                  <span className="block text-white font-bold uppercase tracking-tight">R. D. Mhaske</span>
                  <a href="tel:+918975155557" className="block text-white/60 text-[9px] mt-1 hover:underline">+91 89751 55557</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side (Luxurious Glass Panel with Minimal Floating Inputs) */}
          <div className="bg-zinc-950/60 backdrop-blur-3xl border border-white/10 hover:border-[#c5a880]/30 p-8 md:p-12 relative shadow-[0_30px_80px_rgba(0,0,0,0.9)] transition-all duration-700">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white mb-10 border-b border-white/10 pb-4 text-left">
              Request a Consultation
            </h3>

            {isSubmitSuccessful && (
              <div className="border border-[#9fb89b]/30 bg-[#9fb89b]/10 p-6 mb-8 text-left">
                <h4 className="font-display font-bold text-[#9fb89b] uppercase mb-2">Inquiry Received</h4>
                <p className="font-body text-xs text-text-muted">
                  Thank you. Your inquiry has been successfully submitted. Our team will contact you shortly to discuss your requirements.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 text-left">
              
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-1.5 relative">
                  <label htmlFor="contact-name" className="font-micro text-[9px] uppercase text-white/45 tracking-widest">Full Name</label>
                  <input
                    {...register("name")}
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Enter full name"
                    className="w-full bg-transparent border-b border-white/10 px-0 py-2.5 min-h-[44px] text-sm font-body text-white focus:outline-none focus:border-[#c5a880] transition-colors rounded-none placeholder-white/20"
                  />
                  {errors.name && <span role="alert" className="font-micro text-[8px] text-[#d28c5a] uppercase mt-1 block">{errors.name.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5 relative">
                  <label htmlFor="contact-email" className="font-micro text-[9px] uppercase text-white/45 tracking-widest">Email Address</label>
                  <input
                    {...register("email")}
                    id="contact-email"
                    type="email"
                    required
                    placeholder="Enter email address"
                    className="w-full bg-transparent border-b border-white/10 px-0 py-2.5 min-h-[44px] text-sm font-body text-white focus:outline-none focus:border-[#c5a880] transition-colors rounded-none placeholder-white/20"
                  />
                  {errors.email && <span role="alert" className="font-micro text-[8px] text-[#d28c5a] uppercase mt-1 block">{errors.email.message}</span>}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-1.5 relative">
                  <label htmlFor="contact-phone" className="font-micro text-[9px] uppercase text-white/45 tracking-widest">Phone Number</label>
                  <input
                    {...register("phone")}
                    id="contact-phone"
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    className="w-full bg-transparent border-b border-white/10 px-0 py-2.5 min-h-[44px] text-sm font-body text-white focus:outline-none focus:border-[#c5a880] transition-colors rounded-none placeholder-white/20"
                  />
                  {errors.phone && <span role="alert" className="font-micro text-[8px] text-[#d28c5a] uppercase mt-1 block">{errors.phone.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5 relative">
                  <label htmlFor="contact-facilityType" className="font-micro text-[9px] uppercase text-white/45 tracking-widest">Required Service</label>
                  <select
                    {...register("facilityType")}
                    id="contact-facilityType"
                    required
                    className="w-full bg-transparent border-b border-white/10 px-0 py-2.5 min-h-[44px] text-sm font-body text-white focus:outline-none focus:border-[#c5a880] transition-colors rounded-none placeholder-white/20 cursor-pointer"
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
                  {errors.facilityType && <span role="alert" className="font-micro text-[8px] text-[#d28c5a] uppercase mt-1 block">{errors.facilityType.message}</span>}
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex flex-col gap-1.5 relative">
                <label htmlFor="contact-area" className="font-micro text-[9px] uppercase text-white/45 tracking-widest">Project Area (SQM)</label>
                <input
                  {...register("area")}
                  id="contact-area"
                  type="text"
                  required
                  placeholder="e.g. 5,000 SQM"
                  className="w-full bg-transparent border-b border-white/10 px-0 py-2.5 min-h-[44px] text-sm font-body text-white focus:outline-none focus:border-[#c5a880] transition-colors rounded-none placeholder-white/20"
                />
                {errors.area && <span role="alert" className="font-micro text-[8px] text-[#d28c5a] uppercase mt-1 block">{errors.area.message}</span>}
              </div>

              {/* Row 4 */}
              <div className="flex flex-col gap-1.5 relative">
                <label htmlFor="contact-message" className="font-micro text-[9px] uppercase text-white/45 tracking-widest">Project Details</label>
                <textarea
                  {...register("message")}
                  id="contact-message"
                  rows={4}
                  required
                  placeholder="Describe your project requirements, area dimensions, or paint specifications..."
                  className="w-full bg-transparent border-b border-white/10 px-0 py-2.5 min-h-[44px] text-sm font-body text-white focus:outline-none focus:border-[#c5a880] transition-colors rounded-none placeholder-white/20 resize-none"
                />
                {errors.message && <span role="alert" className="font-micro text-[8px] text-[#d28c5a] uppercase mt-1 block">{errors.message.message}</span>}
              </div>

              {/* Luxury CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 bg-[#c5a880] hover:bg-white text-black font-micro text-[10px] font-bold uppercase tracking-[0.2em] py-5 flex items-center justify-center gap-3 transition-colors duration-500 disabled:opacity-50 relative group overflow-hidden"
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
                <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
