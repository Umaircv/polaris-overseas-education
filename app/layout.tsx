import type { Metadata, Viewport } from "next";
import "@fontsource-variable/lora";
import "@fontsource-variable/manrope";
import "./globals.css";
import PwaRegister from "./pwa-register";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#031d39",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://polarisoverseasedu.com"),
  title: {
    default: "Polaris Global Education Center | Your North Star to Global Education",
    template: "%s | Polaris Global Education Center",
  },
  description:
    "Study abroad counselling, university admissions, scholarships, student visa assistance, IELTS and language training from Polaris Global Education Center in Lahore.",
  applicationName: "Polaris Global Education Center",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Polaris Global",
  },
  formatDetection: { telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://polarisoverseasedu.com",
    siteName: "Polaris Global Education Center",
    title: "Polaris Global Education Center | Find Your Course",
    description:
      "Personalised guidance for international education, university admissions, scholarships, student visas and language training.",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Polaris Global Education Center — Find Your Course. Follow Your North Star." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Polaris Global Education Center | Find Your Course",
    description:
      "Personalised guidance for international education, university admissions, scholarships, student visas and language training.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" type="image/png" sizes="192x192" href="/pwa-icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/pwa-icon-512.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/pwa-icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="application-name" content="Polaris Global Education Center" />
      </head>
      <body>
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
