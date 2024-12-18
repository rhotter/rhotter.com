import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";

import "./globals.css";
import { NavBar } from "./NavBar";

// const inter = GeistSans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raffi Hotter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <div className="container mx-auto px-6 sm:pt-16 pt-6 text-gray-900 max-w-2xl">
          <NavBar />
          <div className="prose max-w-none text-gray-600">{children}</div>
        </div>
      </body>
    </html>
  );
}
