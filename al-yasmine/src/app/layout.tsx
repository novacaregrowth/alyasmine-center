import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default:  "Al Yasmine Center | Coaching & Personal Development",
    template: "%s | Al Yasmine Center",
  },
  description: "Transformative coaching and personal development by Alia AlBahri, CBT Specialist. Book your session today.",
  keywords:    ["coaching", "CBT", "personal development", "Al Yasmine", "life coaching", "UAE", "Alia AlBahri"],
  openGraph: {
    title:       "Al Yasmine Center",
    description: "Transformative coaching & personal development by CBT Specialist Alia AlBahri",
    siteName:    "Al Yasmine Center",
    locale:      "en_US",
    type:        "website",
    url:         "https://alyasminecenter.com",
    images: [
      {
        url:    '/images/og-image.png',
        width:  1200,
        height: 630,
        alt:    'Al Yasmine Center: Grow. Transform. Bloom.',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       "Al Yasmine Center",
    description: "Transformative coaching & CBT-based personal development",
    images:      ['/images/og-image.png'],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
