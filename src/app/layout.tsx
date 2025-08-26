import "./globals.css";
import type { Metadata } from "next";
import { Ubuntu_Mono } from "next/font/google";

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
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
    <html lang="en" className="bg-stone-950 text-white">
      <body className={ubuntuMono.className}>{children}</body>
    </html>
  );
}
