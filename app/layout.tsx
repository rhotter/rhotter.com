import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
        <div className="container mx-auto px-4 pt-16 text-gray-900">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}

const NavBar = () => (
  // simple nav bar with my name, then a link to posts
  <div>
    <div className="text-4xl font-bold">
      <Link href="/">Raffi Hotter</Link>
    </div>
    <nav>
      <Link href="/posts">Posts</Link>
    </nav>
  </div>
);
