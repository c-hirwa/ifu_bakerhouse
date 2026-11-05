import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ifu Bakehouse — fresh bread & custom cakes in Kimihurura",
  description:
    "Concept project: a neighbourhood bakery in Kigali. Browse the menu, design your own cake and order on WhatsApp.",
};

export const viewport: Viewport = { themeColor: "#ffd84d" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
