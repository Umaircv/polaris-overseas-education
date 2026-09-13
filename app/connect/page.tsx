import type { Metadata } from "next";
import SmartQrHub from "./smart-qr-hub";

export const metadata: Metadata = {
  title: "Smart Student Connect",
  description: "Choose your next step with Polaris Global Education Center: courses, scholarships, IELTS, counselling and office directions.",
  alternates: { canonical: "/connect" },
};

export default function ConnectPage() {
  return <SmartQrHub />;
}
