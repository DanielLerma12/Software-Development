import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: {
    default: "Next.js Course JavaScript Mastery",
    template: "%s | Next.js Course JavaScript Mastery",
  },
  description: "Curso de Next.js con JavaScript Mastery",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Next.js Course JavaScript Mastery",
    description: "Curso de Next.js con JavaScript Mastery",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Course JavaScript Mastery",
    description: "Curso de Next.js con JavaScript Mastery",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
