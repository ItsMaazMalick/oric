import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Template from "./template";

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
        <Template>{children}</Template>
        {/* <Footer /> */}
        <Toaster />
      </body>
    </html>
  );
}
