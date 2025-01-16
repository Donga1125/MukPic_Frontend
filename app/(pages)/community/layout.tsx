import type { Metadata } from "next";
import "@/app/globals.css";
import { ReactNode } from "react";



export const metadata: Metadata = {
    title: "MukPic-community",
};

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <head>
                <link href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/static/woff2/SUIT.css" rel="stylesheet"></link>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </head>

            <body>
                <div className="root-wrapper">

                    {/* 상단 바 */}
                    {children}
                    {/* 하단 네비게이션 */}
                </div>

            </body>
        </html>
    );
}
