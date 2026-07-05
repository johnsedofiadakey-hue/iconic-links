import type { Metadata } from "next";
import { Toaster } from 'sonner';
import { validateEnv } from '@/lib/config';
import "./globals.css";

// Validate environment on app startup
validateEnv();

export const metadata: Metadata = {
  title: "ICONIC LINKS — Premium Print & Design Services",
  description: "Order custom printing, large format, picture framing, and graphic design services online. Ghana's trusted printing press.",
  keywords: ["printing", "design", "large format", "business cards", "Ghana", "Accra", "print shop"],
  openGraph: {
    title: "ICONIC LINKS",
    description: "Premium Print & Design Services — Digital, Large Format, Framing & More",
    siteName: "ICONIC LINKS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
