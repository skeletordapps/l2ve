"use client";
import { Poppins } from "next/font/google";
import Nav from "../components/nav";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`flex flex-col bg-gradient-to-b bg-no-repeat from-white dark:from-[#11151E] to-blue-love dark:to-blue-900 ${poppins.className}`}
    >
      {children}
    </div>
  );
}
