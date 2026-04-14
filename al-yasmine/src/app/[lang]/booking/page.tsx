import type { Metadata } from "next";
import BookingPage from "./PageClient";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Book a discovery call or coaching session with Aliyah Al Bahari at Al Yasmine Center.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return <BookingPage lang={lang} />;
}
