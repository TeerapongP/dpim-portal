import type { Metadata } from "next";
import { Sarabun } from "next/font/google"; // Import Sarabun
import { PrimeReactProvider } from "primereact/api";
import DPIMNavbar from "@/components/DPIMNavbar";
import "./globals.css";
import "@/lib/fontawesome";

// PrimeReact Styles
import "primereact/resources/themes/lara-light-cyan/theme.css"; 
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

// Configure Sarabun font
const sarabun = Sarabun({
  weight: ["300", "400", "700"], // Light, Regular, Bold
  subsets: ["thai", "latin"],
  variable: "--font-sarabun", // Define CSS variable
  display: "swap",
});

export const metadata: Metadata = {
  title: "DPIM Portal",
  description: "กรมอุตสาหกรรมพื้นฐานและการเหมืองแร่",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={sarabun.variable}>
      <body className="font-sans antialiased">
        <PrimeReactProvider>
          <DPIMNavbar />
          <main>{children}</main>
        </PrimeReactProvider>
      </body>
    </html>
  );
}