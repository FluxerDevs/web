import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Fluxer Gaming",
  description: "The First and Best Gaming community in Fluxer, LFG, groups, games and free stuff!",
  metadataBase: new URL("https://fluxer.games"),
  openGraph: {
    title: "Fluxer Gaming",
    description:
      "The First and Best Gaming community in Fluxer, LFG, groups, games and free stuff!",
    images: [
      {
        url: "/card.png",
      },
    ],
    siteName: "Fluxer Gaming",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fluxer Gaming",
    description:
      "The First and Best Gaming community in Fluxer, LFG, groups, games and free stuff!",
    images: ["/card.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
