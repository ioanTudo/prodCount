import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const basePath = process.env.NODE_ENV === "production" ? "/prodCount" : "";

export const metadata = {
  title: "Product counter",
  description: "Product counter for cascarabeta",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href={`${basePath}/assets/cash-register-removebg-preview.png`}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Sans&family=Geist+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "Geist Sans, sans-serif" }}>{children}</body>
    </html>
  );
}
