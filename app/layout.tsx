import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fluxer Gaming",
  description: "The First and Best Gaming community in Fluxer, LFG, groups, games and free stuff!",
  metadataBase: new URL("https://fluxer.games"),
  themeColor: "#4341d8",
  openGraph: {
    title: "Fluxer Gaming",
    description:
      "The First and Best Gaming community in Fluxer, LFG, groups, games and free stuff!",
    images: [
      {
        url: "/card.webp",
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
    images: ["/card.webp"],
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
      className={`${geistSans.variable} ${geistMono.variable} ${bricolageGrotesque.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
