import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./providers/queryProvider";
import { Header } from "./components/Header";
import { AuthProvider } from "./providers/authProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ReactQueryProvider>
            <Header />
            {children}
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
