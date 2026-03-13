import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header"; 
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rental Car",
  description: "Find your perfect rental car",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header /> 
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            success: {
              style: {
                background: '#fff',
                color: '#121417',
                border: '1px solid #3470FF',
              },
              iconTheme: {
                primary: '#3470FF', 
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}