'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { clusterApiUrl } from "@solana/web3.js";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { useEffect, useMemo } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import Navbar from "@/components/Navbar";
import "@solana/wallet-adapter-react-ui/styles.css"
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
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [])
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConnectionProvider endpoint={clusterApiUrl('devnet')}>
          <WalletProvider wallets={wallets} autoConnect={true} >
            <WalletModalProvider>
            <Navbar />
            {children}
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
