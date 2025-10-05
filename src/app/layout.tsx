import { Poppins } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Clarity",
  description: "Manage your daily tasks!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
