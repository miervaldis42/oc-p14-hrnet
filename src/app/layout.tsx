// Imports
import { ReactNode } from "react";

// Stylings
import "./globals.css";
import { EB_Garamond as MainFont } from "next/font/google";
const ebGaramondFont = MainFont({ subsets: ["latin"], weight: "400" });

/**
 * @description The main layout of the website and main place to apply global stylings.
 *
 * @param
 * @returns RootLayout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ebGaramondFont.className} flex`}>{children}</body>
    </html>
  );
}
