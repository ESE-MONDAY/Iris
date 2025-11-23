
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Provider from "@/components/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // --- ENHANCED METADATA FOR IRIS PROTOCOL ---
  applicationName: "IRIS Protocol (The All-Seeing Eye)",
  title: "IRIS: The All-Seeing Eye Protocol | ERC-8004 Blueprint",
  description: "The ERC-8004 Blueprint for Trustless AI Agents. Provides verifiable identity and payment-backed reputation using Zircuit L2, 0G Storage, and Chainlink Automation.",
  keywords: [
    "ERC-8004",
    "AI Agents",
    "Web3",
    "Decentralized AI",
    "Zircuit",
    "0G",
    "Chainlink",
    "Reputation Protocol",
    "Trustless Commerce",
    "Autonomous Agents",
  ],
  authors: [{ name: "IRIS Development Team" }],
  creator: "IRIS Protocol",
  
  openGraph: {
    title: "IRIS: The Unfakeable Trust Layer for AI Agents",
    description: "IRIS solves the AI Trust Crisis by linking payment proof (x402) to immutable performance records on Zircuit L2.",
    url: "https://irisprotocol.xyz", // Placeholder URL
    siteName: "IRIS Protocol",
    images: [
      {
        url: "/images/iris-social-card.png", 
        width: 1200,
        height: 630,
        alt: "IRIS Protocol: The All-Seeing Eye Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IRIS: Proactive Security for the Agent Economy",
    description: "IRIS provides verifiable identity and payment-backed reputation using Zircuit, 0G, and Chainlink.",
    creator: "@IRIS_Protocol", // Placeholder Twitter handle
  },
  // --- END ENHANCED METADATA ---
};

export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
     <Provider>
       {children}
      </Provider>

    
      </body>
    </html>
  );
}