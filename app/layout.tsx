import type { Metadata, Viewport } from "next";
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
    default: "Polaris Overseas Education | Your North Star to Global Education",
    template: "%s | Polaris Overseas Education",
  },
  description:
    "Study abroad counselling, university admissions, scholarships, student visa assistance, IELTS and language training from Polaris Overseas Education in Lahore.",
  applicationName: "Polaris Overseas Education",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Polaris Education",
  },
  formatDetection: { telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://polarisoverseasedu.com",
    siteName: "Polaris Overseas Education",
    title: "Polaris Overseas Education | Find Your Course",
    description:
      "Personalised guidance for international education, university admissions, scholarships, student visas and language training.",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Polaris Overseas Education — Find Your Course. Follow Your North Star." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Polaris Overseas Education | Find Your Course",
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
        <meta name="application-name" content="Polaris Education" />
      </head>
      <body>
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
