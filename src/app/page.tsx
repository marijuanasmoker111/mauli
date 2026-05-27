import Loader from "@/components/layout/Loader";
import Hero from "@/components/sections/Hero";
import NumbersThatMatter from "@/components/sections/NumbersThatMatter";
import HorizontalGallery from "@/components/sections/HorizontalGallery";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Services from "@/components/sections/Services";
import Clients from "@/components/sections/Clients";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] overflow-x-hidden selection:bg-accent-blue/30 selection:text-white">
      {/* Global Interactions */}
      <CustomCursor />

      {/* Schema.org Structured JSON-LD Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Corporation",
              "name": "Mauli Enterprises",
              "legalName": "Mauli Enterprises",
              "url": "https://maulienterprises.com",
              "logo": "https://maulienterprises.com/images/hd_cleanroom_floor.png",
              "foundingDate": "2008",
              "founder": {
                "@type": "Person",
                "name": "Mr. Dnyaneshwar B. Mhaske"
              },
              "knowsAbout": [
                "Epoxy Flooring",
                "Polyurethane Flooring",
                "Clean Room Coving",
                "Anti Fungal Wall Paints",
                "Anti Corrosion Coatings",
                "Car Parking Flooring",
                "Industrial Tank Linings"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressLocality": "Pune",
                "addressRegion": "Maharashtra"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "name": "Mauli Enterprises",
              "description": "Leading industrial flooring & protective coatings service provider since 2008. Premium Epoxy flooring, heavy-duty Polyurethane coatings, hygienic cleanroom coving, anti-fungal paints, and commercial car parking floors.",
              "image": "https://maulienterprises.com/images/hd_cleanroom_floor.png",
              "url": "https://maulienterprises.com",
              "telephone": "+919822606555",
              "priceRange": "$$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Pune & Indore Facilities",
                "addressLocality": "Pune",
                "addressRegion": "Maharashtra",
                "postalCode": "411001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "18.5204",
                "longitude": "73.8567"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "areaServed": [
                {
                  "@type": "AdministrativeArea",
                  "name": "Maharashtra"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Madhya Pradesh"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "India"
                }
              ]
            }
          ])
        }}
      />
      
      {/* Page Loader */}
      <Loader />
      
      {/* Immersive Landing Section */}
      <Hero />
      
      {/* Key Numbers / Metric Metrics */}
      <NumbersThatMatter />
      
      {/* Horizontal Editorial Slide deck */}
      <HorizontalGallery />
      
      {/* Slider Surface Comparison */}
      <BeforeAfter />
      
      {/* Capability Slides Pinned */}
      <Services />
      
      {/* Loop Client marquees */}
      <Clients />
      
      {/* About Bold statement decks */}
      <About />
      
      {/* Contact Brief and Coordinates */}
      <Contact />
      
      {/* Global CSS Footer HUD */}
      <footer className="bg-black py-8 px-6 border-t border-white/5 font-micro text-[11px] sm:text-xs text-text-muted text-center uppercase tracking-widest relative z-10">
        <div>© {new Date().getFullYear()} MAULI ENTERPRISES. ALL RIGHTS RESERVED.</div>
      </footer>
    </main>
  );
}
