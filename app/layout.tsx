import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import MainNavbar from "@/components/navigation/MainNavbar";
import Footer from "@/components/footer/Footer";
import MainHeader from "@/components/header/MainHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Office of Research, Innovation and Commercialization",
  description: "Office of Research, Innovation and Commercialization",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-grayBackground text-black`}>
        {/* <MainHeader /> */}
        <main>{children}</main>
        {/* <Footer /> */}
        <Toaster />
      </body>
    </html>
  );
}
