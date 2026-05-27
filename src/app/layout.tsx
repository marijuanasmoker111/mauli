import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/layout/SmoothScroller";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maulienterprises.com"),
  title: "Mauli Enterprises | Industrial Flooring Solutions Since 2008",
  description:
    "Leading industrial flooring service provider since 2008. Specializing in epoxy flooring, polyurethane coating, clean room finishing, and car parking flooring for pharmaceutical and manufacturing industries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
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
        className={`${interTight.variable} font-body bg-black text-text-primary antialiased selection:bg-accent-blue/30 selection:text-white`}
      >
        <SmoothScroller>{children}</SmoothScroller>
      </body>
    </html>
  );
}
