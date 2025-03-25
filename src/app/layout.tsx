import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const firacode = Fira_Code ({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: "Advis",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
