import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { SuiProvider } from "@/providers/SuiProvider";
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
      { url: "/suivan-logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/suivan-logo.png" },
    ],
    shortcut: ["/suivan-logo.png"],
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
        <link rel="icon" href="/suivan-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/suivan-logo.png" />
        <link rel="shortcut icon" href="/suivan-logo.png" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <SuiProvider>
          <LanguageProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </LanguageProvider>
        </SuiProvider>
      </body>
    </html>
  );
}
