import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Product counter",
  description: "Product counter for cascarabeta",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/assets/cash-register-removebg-preview.png" />
      </head>
      <body style={{ fontFamily: "var(--font-geist-sans)" }}>{children}</body>
    </html>
  );
}
