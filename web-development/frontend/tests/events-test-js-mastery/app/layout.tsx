import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import GradientWaves from "@/components/GradientWaves";
import NavBar from "@/components/NavBar";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CrewEvents",
  description: "The hub for every dev event you mustn't miss",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB">
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen antialiased`}
      >
        <GradientWaves
          horizonColor="#5dfeca"
          waveColor="#3abfa8"
          crestColor="#ffffff"
          speed={0.15}
          amplitude={2.5}
          waveScale={0.5}
          waveRatio={0.3}
          swell={30}
          turbulence={20}
          tilt={1.3}
          zoom={1.15}
          height={7.7}
          fogDepth={10}
          detail="high"
          brightness={1}
          opacity={0.5}
          mouseInteraction={false}
          parallaxStrength={1}
          grain={false}
          grainIntensity={0.05}
        />
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
