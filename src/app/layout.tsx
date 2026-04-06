import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { siteConfig } from "@/data/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "software engineer",
    ".NET developer",
    "C#",
    "microservices",
    "clean architecture",
    "portfolio",
    "backend developer",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
        <link rel="alternate" type="application/rss+xml" title="Blog RSS Feed" href="/rss.xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <script
          defer
          src={`${siteConfig.umamiUrl}/script.js`}
          data-website-id={siteConfig.umamiWebsiteId}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Veysel Emre Yılmaz",
              jobTitle: "Software Engineer",
              url: "https://vemreyilmaz.com",
              image: "https://vemreyilmaz.com/images/profile.png",
              email: "yilmazvemre@gmail.com",
              sameAs: [
                "https://github.com/emreylmz7",
                "https://linkedin.com/in/veysel-emre-yilmaz",
              ],
              knowsAbout: [
                ".NET", "C#", "Microservices", "Clean Architecture",
                "CQRS", "Docker", "Redis", "Elasticsearch",
              ],
            }),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <ThemeProvider>
          <TooltipProvider>
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
            <ScrollToTop />
          </TooltipProvider>
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `if("serviceWorker"in navigator){window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js")})}`,
          }}
        />
      </body>
    </html>
  );
}
