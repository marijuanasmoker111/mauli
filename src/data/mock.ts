export interface Project {
  id: string;
  client: string;
  type: string;
  area: string;
  location: string;
  image: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  specs: string[];
  image: string;
}

export interface Client {
  id: string;
  name: string;
}

// 5 exact projects and capacities listed on Page 1-2 of the PDF
export const projects: Project[] = [
  {
    id: "cipla",
    client: "Cipla Ltd",
    type: "Epoxy Flooring & Coating",
    area: "11,500 Sq Mtr",
    location: "Indore & Pune, India",
    image: "/images/hd_cleanroom_floor.png",
    description: "Successfully executed dynamic flooring projects for this reputed pharmaceutical company across facilities in Indore and Pune, covering an extensive 11,500 Sq Mtr."
  },
  {
    id: "mylan",
    client: "Mylan Laboratories Limited",
    type: "Epoxy / PU Flooring",
    area: "8,500 Sq Mtr",
    location: "India",
    image: "/images/hd_blue_epoxy.png",
    description: "Provided high-quality Epoxy and PU flooring solutions for this reputed pharmaceutical company, completing a massive 8,500 Sq Mtr application."
  },
  {
    id: "wockhardt",
    client: "Wockhardt Ltd",
    type: "Epoxy Flooring & Clean Room Finishing",
    area: "6,500 Sq Mtr",
    location: "India",
    image: "/images/hd_orange_floor.png",
    description: "Delivered specialized cleanroom coving and premium floor finishing, spanning a total area of 6,500 Sq Mtr."
  },
  {
    id: "jnj",
    client: "Johnson & Johnson",
    type: "Polyurethane Flooring & Coating",
    area: "4,500 Sq Mtr",
    location: "India",
    image: "/images/hd_parking_deck.png",
    description: "Applied highly durable Polyurethane flooring and coating solutions for this reputed pharmaceutical brand, covering 4,500 Sq Mtr."
  },
  {
    id: "iff",
    client: "International Flavours & Fragrances",
    type: "Polyurethane Coating & Painting",
    area: "3,500 Sq Mtr",
    location: "India",
    image: "/images/hd_green_floor.png",
    description: "Executed comprehensive Polyurethane coating and painting services for this reputed company, with a total coverage of 3,500 Sq Mtr."
  }
];

// Exact 8 services listed on Page 2 of the PDF, with description from Page 1
export const services: Service[] = [
  {
    id: "epoxy-floor",
    title: "Epoxy Flooring & Coating",
    subtitle: "Highly durable industrial epoxy flooring and protective coating, specially formulated to meet strict clean room hygiene requirements.",
    specs: ["Clean Room Standards", "High Durability", "Expert Application", "Sales & Service Support"],
    image: "/images/hd_cleanroom_floor.png"
  },
  {
    id: "coving",
    title: "Epoxy Coving & Pencil Coving",
    subtitle: "Seamless epoxy coving and pencil coving solutions to eliminate sharp corners, preventing dust accumulation and ensuring a completely hygienic environment.",
    specs: ["Hygienic Finishing", "Dust Prevention", "Expert Application", "Sales & Service Support"],
    image: "/images/hd_blue_epoxy.png"
  },
  {
    id: "pu-flooring",
    title: "Polyurethane Flooring",
    subtitle: "Heavy-duty polyurethane flooring designed to withstand extreme impact, heavy traffic, and thermal shock in demanding industrial facilities.",
    specs: ["Impact Resistant", "Heavy Traffic Durable", "Expert Application", "Sales & Service Support"],
    image: "/images/hd_orange_floor.png"
  },
  {
    id: "pu-coating",
    title: "Polyurethane Coating",
    subtitle: "High-performance polyurethane protective coatings that provide excellent resistance to chemicals, wear, and continuous UV exposure.",
    specs: ["Chemical Resistant", "UV Stable", "Expert Application", "Sales & Service Support"],
    image: "/images/hd_green_floor.png"
  },
  {
    id: "parking-floor",
    title: "Car Parking Flooring",
    subtitle: "Anti-skid and highly durable flooring solutions specifically designed for commercial car parking decks and high-friction vehicular traffic.",
    specs: ["Anti-Skid Surface", "Tire Mark Resistant", "Expert Application", "Sales & Service Support"],
    image: "/images/hd_parking_deck.png"
  },
  {
    id: "corrosion",
    title: "Anti Corrosion Coatings",
    subtitle: "Specialized protective painting and coating solutions engineered to prevent rusting and structural degradation in highly corrosive environments.",
    specs: ["Rust Prevention", "Structural Protection", "Expert Application", "Sales & Service Support"],
    image: "/images/hd_hero_floor.png"
  },
  {
    id: "fungal-paints",
    title: "Anti Fungal Wall Paints",
    subtitle: "Specialized anti-fungal wall paints reserved strictly for clean rooms to prevent bacterial growth and maintain maximum sterility.",
    specs: ["Bacterial Resistance", "Sterility Maintained", "Only for Clean Rooms", "Sales & Service Support"],
    image: "/images/hd_cleanroom_floor.png"
  },
  {
    id: "water-tank",
    title: "Under Water Tank Coatings",
    subtitle: "Safe and highly resilient industrial tank linings for underwater application, protecting water storage from leakage and contamination.",
    specs: ["Leakage Prevention", "Contamination Safe", "Industrial Tank Lining", "Sales & Service Support"],
    image: "/images/hd_blue_epoxy.png"
  }
];

// Exact list of 17 clients from Page 3 of the PDF
export const clients: Client[] = [
  { id: "1", name: "Cipla Ltd (Indore)" },
  { id: "2", name: "Cipla Ltd (Pune)" },
  { id: "3", name: "Wockhardt Ltd" },
  { id: "4", name: "Glenmark pharmaceutical" },
  { id: "5", name: "MYLAN LABORATORIES LIMITED" },
  { id: "6", name: "Midas-care Pharma ltd" },
  { id: "7", name: "Eurolifepharma ltd" },
  { id: "8", name: "Indoco Remedies Ltd" },
  { id: "9", name: "Par Formulations Private Limited" },
  { id: "10", name: "LUPIN LIMITED" },
  { id: "11", name: "Papcon pharma" },
  { id: "12", name: "Johnson & Johnson" },
  { id: "13", name: "MMC Hardmetal India PVT. LTD. (MITSUBISHI GROUP)" },
  { id: "14", name: "Felix Generics Pvt Ltd" },
  { id: "15", name: "ZIM Laboratories Limited" },
  { id: "16", name: "International Flavours & Fragrances" },
  { id: "17", name: "AMNEAL PHARMACEUTICALS PVT.LTD" }
];
