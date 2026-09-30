import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyMobileCta from "@/components/StickyMobileCta";
import { IS_MOCK_DATA, siteConfig } from "@/lib/mockData";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  // Mock data prototype: do not let search engines index it.
  robots: IS_MOCK_DATA ? { index: false, follow: false } : undefined,
  title: "WEDISON | Electric mobility, without the wait",
  description: siteConfig.entityDefinition.en,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col pb-16 lg:pb-0">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyMobileCta />
      </body>
    </html>
  );
}
