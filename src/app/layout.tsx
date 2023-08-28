import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Header from "./layouts/Header";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elykp",
  description: "Elykp dev blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black text-white">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
