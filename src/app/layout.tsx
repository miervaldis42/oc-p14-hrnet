// Imports
import { ReactNode } from "react";

// Components
import ReduxProvider from "@store/ReduxProvider";
import Sidebar from "@components/Sidebar";

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
        <body
          className={`${ebGaramondFont.className} w-screen h-screen flex overflow-hidden`}
        >
          <>
            <Sidebar />

            <section className="w-full h-full px-16 py-6 overflow-y-auto">
              {children}
            </section>
          </>
        </body>
      </ReduxProvider>
    </html>
  );
}
