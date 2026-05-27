import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/layout/SmoothScroller";
import AmbientLight from "@/components/ui/AmbientLight";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maulienterprises.com"),
  title: {
    default: "Mauli Enterprises | Industrial Flooring & Cleanroom Solutions",
    template: "%s | Mauli Enterprises",
  },
  description:
    "Leading industrial flooring & protective coatings service provider since 2008. Premium Epoxy flooring, heavy-duty Polyurethane coatings, hygienic cleanroom coving, anti-fungal paints, and commercial car parking floors for pharmaceutical & manufacturing industries.",
  keywords: [
    "Industrial Flooring India",
    "Epoxy Flooring Pune",
    "Polyurethane Floor Coating",
    "Clean Room Coving Systems",
    "Pharmaceutical Cleanroom Flooring",
    "FDA Compliant Flooring",
    "Mauli Enterprises Pune",
    "Anti Corrosion Coatings",
    "Car Parking Flooring",
    "Industrial Wall Painting Service",
  ],
  authors: [{ name: "Mauli Enterprises", url: "https://maulienterprises.com" }],
  creator: "Mauli Enterprises",
  publisher: "Mauli Enterprises",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://maulienterprises.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://maulienterprises.com",
    siteName: "Mauli Enterprises",
    title: "Mauli Enterprises | Premium Industrial Flooring & Cleanrooms",
    description:
      "Since 2008, Mauli Enterprises has engineered high-durability epoxy flooring, PU coatings, seamless hygienic coving, and sterile cleanroom finishes for global pharmaceutical and industrial manufacturing giants.",
    images: [
      {
        url: "/images/hd_cleanroom_floor.png",
        width: 1200,
        height: 630,
        alt: "Mauli Enterprises High-Performance Sterile Cleanroom Floor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mauli Enterprises | Premium Industrial Flooring",
    description:
      "Engineered industrial flooring, cleanroom finishes, and protective coatings since 2008. Trusted by Cipla, Wockhardt, and Johnson & Johnson.",
    images: ["/images/hd_cleanroom_floor.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f131d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link
          rel="preload"
          as="style"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=satoshi@400,500,700&f[]=cabinet-grotesk@400,500,700,800,900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=satoshi@400,500,700&f[]=cabinet-grotesk@400,500,700,800,900&display=swap"
        />
      </head>
      <body
        className={`${interTight.variable} font-body bg-bg-base text-text-primary antialiased selection:bg-accent-blue/30 selection:text-white`}
      >
        {/* Global tactile noise and visual ambient lighting elements */}
        <div className="noise-overlay" />
        <AmbientLight />

        <SmoothScroller>{children}</SmoothScroller>
      </body>
    </html>
  );
}
