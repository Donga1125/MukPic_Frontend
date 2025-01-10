import type { Metadata } from "next";
import "@/app/globals.css";
import { ReactNode } from "react";
import { SvgButtonForNav } from "@/app/components/button";
import TopNav from "@/app/components/TopNav";


export const metadata: Metadata = {
  title: "MukPic"
};
type LayoutProps = {
  children: ReactNode;
};


//기본 레이아웃
/*
구조 - body[main{div class="root-container"(header,본문,footer)}]
일단 스타일 설정은 body 와 main은 비워두고 root-container에만 해놓았음
*/



export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">

      <head>
        <link href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/static/woff2/SUIT.css" rel="stylesheet"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <body>


        {/* 메인 */}
        <div className="root-wrapper root-text">
          <TopNav
            leftButton={<SvgButtonForNav>
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_112_3051)">
                  <path d="M19.6934 3.36002C19.1217 2.78836 18.2 2.78836 17.6284 3.36002L7.81671 13.1717C7.36171 13.6267 7.36171 14.3617 7.81671 14.8167L17.6284 24.6284C18.2 25.2 19.1217 25.2 19.6934 24.6284C20.265 24.0567 20.265 23.135 19.6934 22.5634L11.13 14L19.705 5.42502C20.265 4.85336 20.265 3.93169 19.6934 3.36002Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="clip0_112_3051">
                    <rect width="28" height="28" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </SvgButtonForNav>}
            rightButton={<SvgButtonForNav>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_112_3048)">
                  <path d="M18.3 5.70997C17.91 5.31997 17.28 5.31997 16.89 5.70997L12 10.59L7.10997 5.69997C6.71997 5.30997 6.08997 5.30997 5.69997 5.69997C5.30997 6.08997 5.30997 6.71997 5.69997 7.10997L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10997C18.68 6.72997 18.68 6.08997 18.3 5.70997Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="clip0_112_3048">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </SvgButtonForNav>}
          />
          <div className="auth-container flex-1 bg-white rounded-lg shadow-md">

            {/* 상단 내비게이션 필요한 버튼 넣어서 사용용 */}

            {/* 메인 페이지 내용 */}
            {children}


            {/* 하단 네비게이션 */}
          </div>
        </div>

      </body>
    </html>
  );
}
