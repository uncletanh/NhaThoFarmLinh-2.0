import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import { MusicProvider } from "@/context/MusicContext";
import MiniPlayer from "@/components/MiniPlayer";

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
        <script src="https://cnpm-group-1.vercel.app/script.umd.cjs"
          data-workspace-id="5"
          data-widget-token="c43666f8f1774e2cb1f8c5962780adf0"
          data-api-url="https://cnpm-group-1.onrender.com/api/v1"
          async></script>
      </body>
    </html>
  );
}
