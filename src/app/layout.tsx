import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/contexts/ThemeContext";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { Navbar } from "@/components/NavBar";
import Providers from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://royal-teckel-home.vercel.app/"),
  title: {
    default: "Royal Teckel Home | Élevage de Teckels de Qualité",
    template: "%s | Royal Teckel Home",
  },
  description:
    "Royal Teckel Home est un élevage passionné de teckels. Nos chiots grandissent dans un environnement sain, avec amour, suivi vétérinaire et socialisation optimale, prêts à rejoindre des familles responsables.",
  keywords: [
    "teckel",
    "élevage de teckels",
    "chiot teckel",
    "teckel nain",
    "teckel standard",
    "élevage canin",
    "chiots de race",
    "Royal Teckel Home",
  ],
  authors: [{ name: "l0rd_9h057" }],
  creator: "Royal Teckel Home",
  publisher: "Royal Teckel Home",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://royal-teckel-home.vercel.app/",
    siteName: "Royal Teckel Home",
    title: "Royal Teckel Home | Élevage de Teckels",
    description:
      "Élevage professionnel de teckels élevés avec amour, attention et suivi rigoureux. Chiots sociabilisés et prêts pour des familles responsables.",
    images: [
      {
        url: "/hero-dog.jpg",
        width: 1920,
        height: 1080,
        alt: "Royal Teckel Home - Élevage de Teckels",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Royal Teckel Home | Élevage de Teckels",
    description:
      "Découvrez Royal Teckel Home, un élevage passionné de teckels élevés dans un environnement sain et aimant.",
    images: ["/hero-dog1.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/hero-dog1.jpg",
  },

  alternates: {
    canonical: "https://royal-teckel-home.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="theme-color" content="#0f172a" />
        <meta name="format-detection" content="telephone=no" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ReactQueryProvider>
            <Providers>
              <header role="banner">
                <Navbar />
              </header>

              <main role="main">{children}</main>

              {/* <Footer /> */}
            </Providers>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
