import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { Web3Provider } from "@/providers/Web3Provider";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

// Primary font - Inter (clean, modern, highly readable)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Secondary font - Space Grotesk (modern geometric for headings)
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Accent font for protocol labels, object IDs, counters, and loading states.
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Suivan - Community Wealth Protocol on Sui",
  description: "A Sui-native frontend for global ROSCA communities, rotating savings cycles, pool state, APY signals, and transparent member progress.",
  keywords: ["Suivan", "ROSCA", "Arisan", "Sui", "community finance", "rotating savings"],
  icons: {
    icon: [
      { url: "/suivan-icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/suivan-icon.svg" },
    ],
    shortcut: ["/suivan-icon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/suivan-icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/suivan-icon.svg" />
        <link rel="shortcut icon" href="/suivan-icon.svg" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <Web3Provider>
          <LanguageProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </LanguageProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
