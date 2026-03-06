import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Findability Audit - Make Your Business Discoverable to AI",
  description: "69% of searches end without a click. Analyze your website's AI-readability and get actionable recommendations to appear in Perplexity, ChatGPT, and Google AI Overviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#0a0a0f] text-slate-200`}
      >
        {children}
      </body>
    </html>
  );
}
