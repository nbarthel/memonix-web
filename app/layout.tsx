import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StrataMind - Memory that learns",
  description: "Persistent, trainable memory for AI coding assistants. Give your AI the context it needs.",
  keywords: ["AI", "memory", "Claude Code", "Cursor", "coding assistant", "context"],
  authors: [{ name: "StrataMind" }],
  openGraph: {
    title: "StrataMind - Memory that learns",
    description: "Persistent, trainable memory for AI coding assistants.",
    url: "https://stratamind.dev",
    siteName: "StrataMind",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StrataMind - Memory that learns",
    description: "Persistent, trainable memory for AI coding assistants.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
