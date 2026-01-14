import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const grifter = localFont({
  src: "./fonts/grifterbold.woff",
  variable: "--font-grifter-bold",
  weight: "700", // Specify a single weight instead of a range
});

const lexend = localFont({
  src: "./fonts/Lexend[wght].woff",
  variable: "--font-lexend-variable",
  weight: "variable", // Use 'variable' for variable fonts
});

const bumbbled = localFont({
  src: "./fonts/bumbbled.woff",
  variable: "--font-bumbbled",
  weight: "variable",
});

export const metadata: Metadata = {
  title: "CollabX - Connect & Collaborate",
  description: "Connect with other developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${grifter.variable} ${lexend.variable} ${bumbbled.variable} antialiased select-none`}>
        {children}
      </body>
    </html>
  );
}
