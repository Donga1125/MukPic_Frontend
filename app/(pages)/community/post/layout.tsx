import type { Metadata } from "next";
import "@/app/globals.css";
import TopNav from "@/app/components/TopNav";
import { ReactNode } from "react";
import { SvgButtonForNav, TextButtonForNav } from "@/app/components/button";



export const metadata: Metadata = {
    title: "MukPic-Post",
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
                            <SvgButtonForNav>
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
                            </SvgButtonForNav>
                        }
                        rightButton={<TextButtonForNav>Upload</TextButtonForNav>}
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
