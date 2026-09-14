import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elite Worx Detailing | Premium Mobile Auto Detailing",
  description: "Premium mobile auto detailing serving the Greater Phoenix area and surrounding cities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" /></head><body className={`${inter.variable} ${oswald.variable}`}>{children}</body></html>;
}
