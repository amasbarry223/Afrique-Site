import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Intelligence Africaine du Sahel | Formation & Coaching",
  description: "Intelligence Africaine du Sahel (IAS) - Leadership training and executive coaching firm serving Africa/Sahel institutions. Former des leaders au service du développement des institutions.",
  keywords: ["IAS", "Intelligence Africaine du Sahel", "Leadership", "Coaching", "Formation", "Afrique", "Sahel", "Développement institutionnel"],
  authors: [{ name: "Intelligence Africaine du Sahel" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Intelligence Africaine du Sahel",
    description: "Former des leaders au service du développement des institutions africaines",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
