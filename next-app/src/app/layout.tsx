import type { Metadata } from "next";
import { Be_Vietnam_Pro, Lora, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import { MusicProvider } from "@/context/MusicContext";
import MiniPlayer from "@/components/MiniPlayer";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Nhà Thơ Farm Lính",
  description: "Nơi gieo những mầm thơ, tưới những suy nghĩ và thu hoạch những giai điệu của cuộc sống.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${beVietnamPro.variable} ${lora.variable} ${playfair.variable}`}>
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
