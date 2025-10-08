import { Poppins } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import StoreProvider from "../store/StoreProvider";

const poppins = Poppins({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"] });

export const metadata = {
  title: "Clarity",
  description: "Manage your daily tasks!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
