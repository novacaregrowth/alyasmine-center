import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { LenisProvider } from "@/components/layout/LenisProvider";

export const metadata: Metadata = {
  title: {
    default:  "Al Yasmine Center | Coaching & Personal Development",
    template: "%s | Al Yasmine Center",
  },
  description: "Transformative coaching and personal development by Aliyah Al Bahari, CBT Specialist. Book your session today.",
  keywords:    ["coaching", "CBT", "personal development", "Al Yasmine", "life coaching", "UAE", "Aliyah Al Bahari"],
  openGraph: {
    title:       "Al Yasmine Center",
    description: "Transformative coaching & personal development by CBT Specialist Aliyah Al Bahari",
    siteName:    "Al Yasmine Center",
    locale:      "en_US",
    type:        "website",
    url:         "https://alyasminecenter.com",
    images: [
      {
        url:    "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1200&q=80",
        width:  1200,
        height: 630,
        alt:    "Al Yasmine Center — Coaching & Personal Development",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Al Yasmine Center",
    description: "Transformative coaching & CBT-based personal development",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background font-body antialiased">
        <LenisProvider>
          <ScrollProgress />
          <Navbar />
          {/* pb-24 lg:pb-0 — compensates for mobile bottom tab bar */}
          <main className="flex-1 pb-24 lg:pb-0">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
