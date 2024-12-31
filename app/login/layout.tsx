import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

//기본 레이아웃
/*
구조 - body[main{div class="root-container"(header,본문,footer)}]
일단 스타일 설정은 body 와 main은 비워두고 root-container에만 해놓았음
*/

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* 헤더(작성 아직 안함)*/}


        {/* 메인 */}
        <main>
          <div className="root-container flex-1 bg-white rounded-lg shadow-md">
            {children}  {/* 각 페이지의 내용이 이곳에 들어옵니다 */}
            {/* 하단 네비게이션 */}
          </div>
        </main>

      </body>
    </html>
  );
}
