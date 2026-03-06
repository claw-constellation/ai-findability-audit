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
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Findability Audit",
    "description": "Analyze your website's AI-readability and get actionable recommendations to appear in Perplexity, ChatGPT, and Google AI Overviews.",
    "url": "https://ai-findability-audit.vercel.app",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Claw Constellation"
    }
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-[#0a0a0f] text-slate-200`}
      >
        {children}
      </body>
    </html>
  );
}
