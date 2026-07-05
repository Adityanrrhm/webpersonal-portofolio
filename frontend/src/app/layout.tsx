import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, Caveat } from "next/font/google";
import "./globals.css";

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const heading = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya Nur Rohim - Portfolio",
  description: "Personal portfolio and work history",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${body.variable} ${heading.variable} ${caveat.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen flex flex-col font-body selection:bg-accent selection:text-accent-foreground">
        {children}
      </body>
    </html>
  );
}
