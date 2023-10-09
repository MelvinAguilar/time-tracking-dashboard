import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { DataContextProvider } from "./store/DataContext";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Time tracking dashboard",
  generator: "Next.js",
  applicationName: "Time tracking dashboard",
  description: "Time tracking dashboard solution for FrontendMentor.io",
  keywords: "nextjs, typescript, tailwindcss, Frontend-Mentor, Melvin",
  creator: "Melvin Aguilar",
  colorScheme: "dark",
  themeColor: "#0D1323",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${rubik.className} h-dynamic-screen flex flex-col justify-center bg-very-dark-blue p-4 text-white lg:items-center`}
      >
        <DataContextProvider>{children}</DataContextProvider>
      </body>
    </html>
  );
}
