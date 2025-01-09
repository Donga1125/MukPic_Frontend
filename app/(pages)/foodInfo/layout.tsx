import type { Metadata } from "next";
import "@/app/globals.css";
import TopNav from "@/app/components/TopNav";
import { ReactNode } from "react";
import { SearchButtonForNav, TextButtonForNav } from "@/app/components/button";



export const metadata: Metadata = {
    title: "MukPic-Search",
};

//기본 레이아웃
/*
구조 - body[main{div class="root-container"(header,본문,footer)}]
일단 스타일 설정은 body 와 main은 비워두고 root-container에만 해놓았음
*/

type LayoutProps = {
    children: ReactNode;
};


export default function Layout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <body>
                <head>
                    <link href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/static/woff2/SUIT.css" rel="stylesheet"></link>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                </head>
                {/* 메인 */}
                <div className="root-wrapper">
                    <TopNav
                        leftButton={
                            <SearchButtonForNav></SearchButtonForNav>

                        }
                        rightButton={<TextButtonForNav
                            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.9302 2C11.4858 2 11.0413 2.16924 10.7021 2.5085L9.98251 3.22808L12.4387 5.68424L13.1582 4.96466C13.8361 4.28676 13.8361 3.18701 13.1582 2.5085C12.819 2.16924 12.3746 2 11.9302 2ZM9.06145 4.14914L2 11.2106V13.6667H4.45616L11.5176 6.6053L9.06145 4.14914Z" fill="white" />
                            </svg>
                            }
                        >Post</TextButtonForNav>}
                    />
                    <div className="main-container flex-1 bg-white rounded-lg shadow-md">
                        {/* 상단 내비게이션 필요한 버튼 넣어서 사용용 */}

                        {/* 메인 페이지 내용 */}
                        {children}


                        {/* 하단 네비게이션 */}
                    </div>
                </div>

            </body>
        </html >
    );
}
