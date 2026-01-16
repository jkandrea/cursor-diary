import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Sidebar } from "@/components/sidebar/sidebar";
import { MobileHeader } from "@/components/layout/mobile-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daybrary - 나만의 다이어리",
  description: "개인용 다이어리 웹 애플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex h-screen overflow-hidden">
            {/* 사이드바 - 데스크톱에서만 표시 */}
            <Sidebar className="hidden w-80 border-r lg:block" />
            
            {/* 메인 콘텐츠 영역 */}
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* 모바일 헤더 */}
              <MobileHeader />
              
              {/* 페이지 콘텐츠 */}
              <main className="flex-1 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
