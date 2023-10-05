import { Rubik } from "next/font/google";
import type { Metadata } from "next";
import "qweather-icons/font/qweather-icons.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Generated by create next app",
};

const rubik = Rubik({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={rubik.className} lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
