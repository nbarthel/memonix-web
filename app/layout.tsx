import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memoist - Memory that learns",
  description: "Persistent, trainable memory for AI coding assistants. Give your AI the context it needs.",
  keywords: ["AI", "memory", "Claude Code", "Cursor", "coding assistant", "context"],
  authors: [{ name: "Memoist" }],
  openGraph: {
    title: "Memoist - Memory that learns",
    description: "Persistent, trainable memory for AI coding assistants.",
    url: "https://memoist.dev",
    siteName: "Memoist",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Memoist - Memory that learns",
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
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
