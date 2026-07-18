import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import { MusicProvider } from "@/context/MusicContext";
import MiniPlayer from "@/components/MiniPlayer";
import Novachat from "@/components/Novachat";
import Script from "next/script";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notebook & Poetry | A Literary Space",
  description: "A space for poetry, thoughts, and music.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${lora.variable}`}>
        <ThemeProvider>
          <MusicProvider>
            <Header />
            {children}
            <MiniPlayer />
          </MusicProvider>
        </ThemeProvider>
        
        {/* Chatbot Script */}
        <Novachat />
      </body>
    </html>
  );
}
