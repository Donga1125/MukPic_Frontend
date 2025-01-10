import type { Metadata } from "next";
import "@/app/globals.css";
import { ReactNode } from "react";
import { SvgButtonForNav } from "@/app/components/button";
import TopNav from "@/app/components/TopNav";

export const metadata: Metadata = {
    title: "MukPic-Login"
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
                {/* 메인 */}
                <div className="root-wrapper root-text">
                    
                    {/* 메인 */}
                    <div className="main-container flex-1 bg-white rounded-lg shadow-md gap-2">
                        {/* 메인 페이지 내용 */}
                        {children}
                    </div>
                </div>

            </body>
        </html>
    );
}
