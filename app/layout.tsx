import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "./NavBar";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        {/* Adjusted container classes for width and centering */}
        <div className="container mx-auto px-4 pt-16 text-gray-900 max-w-2xl">
          <NavBar />
          {/* Wrapped children in a div with padding and max width */}
          <div className="prose max-w-none text-gray-600">{children}</div>
        </div>
      </body>
    </html>
  );
}
