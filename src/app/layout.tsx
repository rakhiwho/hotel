"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useContext } from "react";
import Navbar from "./Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarUnauthorized from "./Navbar/NavBarUnauthorized";
import UseContext, { IContext, context } from "./context/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { auth } = useContext<IContext>(context);

  return (
    <html lang="en">
      <UseContext>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Pacifico&family=Playwrite+AU+VIC+Guides&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {!auth ? <Navbar /> : <NavBarUnauthorized />}
          {children}
        </body>
      </UseContext>
    </html>
  );
}
