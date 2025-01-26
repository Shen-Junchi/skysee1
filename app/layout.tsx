import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/component/Provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Skysee",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
         <body className={inter.className}>
          <ClerkProvider>
            <main>
                <Providers>
                    {children}
                </Providers>
                <Toaster />
            </main>
          </ClerkProvider>
         </body>
        </html>
    );
}
