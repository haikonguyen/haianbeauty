import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hai An Beauty & Spa",
  description: "Premium beauty, spa, and nail studio services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
