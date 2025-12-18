import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memonix - Memory that learns",
  description: "Persistent, trainable memory for AI coding assistants. Give your AI the context it needs.",
  keywords: ["AI", "memory", "Claude Code", "Cursor", "coding assistant", "context"],
  authors: [{ name: "Memonix" }],
  openGraph: {
    title: "Memonix - Memory that learns",
    description: "Persistent, trainable memory for AI coding assistants.",
    url: "https://memonix.dev",
    siteName: "Memonix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Memonix - Memory that learns",
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
