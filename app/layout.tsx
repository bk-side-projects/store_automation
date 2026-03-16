
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Providers from "@/components/Providers";
import AppLayout from "@/components/AppLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "통영아재수산",
  description: "통영아재수산 관리자 페이지",
};

// The RootLayout is a Server Component. It sets up the basic HTML structure.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-white text-secondary`}>
        {/* 
          Providers is a Client Component that wraps all client-side logic.
          AppLayout contains the UI shell.
          This structure cleanly separates server and client concerns.
        */}
        <Providers>
          <AppLayout>
            {children}
          </AppLayout>
        </Providers>
      </body>
    </html>
  );
}
