import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Waste Segregation Assistant | SDG 12",
  description: "An intelligent web assistant helping individuals properly sort and dispose of waste, aligned with UN SDG 12.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
