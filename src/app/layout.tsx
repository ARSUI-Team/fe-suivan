import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Suivan - Community Wealth Protocol on Sui",
  description: "A Sui-native frontend for global ROSCA communities, rotating savings cycles, pool state, APY signals, and transparent member progress.",
  keywords: ["Suivan", "ROSCA", "arisan", "Sui", "community finance", "rotating savings"],
  icons: {
    icon: [
      { url: "/archa-hitam.png" },
      { url: "/archa-hitam.png", sizes: "16x16", type: "image/png" },
      { url: "/archa-hitam.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/archa-hitam.png" },
    ],
    shortcut: ["/archa-hitam.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/archa-hitam.png" type="image/png" />
        <link rel="icon" href="/archa-hitam.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/archa-hitam.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/archa-hitam.png" sizes="48x48" type="image/png" />
        <link rel="apple-touch-icon" href="/archa-hitam.png" />
        <link rel="shortcut icon" href="/archa-hitam.png" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
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
