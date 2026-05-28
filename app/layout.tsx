import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillSphere | NIET Private Network",
  description: "Exclusive student networking hub for NIET builders.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-black text-white">{children}</body>
    </html>
  );
}
