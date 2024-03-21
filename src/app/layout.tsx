// Imports
import { ReactNode } from "react";

// Components
import ReduxProvider from "@store/ReduxProvider";

// Stylings
import "./globals.css";
import { EB_Garamond as MainFont } from "next/font/google";
const ebGaramondFont = MainFont({ subsets: ["latin"], weight: "400" });

/**
 * Main Layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={`${ebGaramondFont.className} flex`}>{children}</body>
      </ReduxProvider>
    </html>
  );
}
