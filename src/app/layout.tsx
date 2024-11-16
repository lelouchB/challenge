import type { Metadata } from "next";
import "./globals.css";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "Challenge",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} antialiased bg-gray-100`}>{children}</body>
    </html>
  );
}
