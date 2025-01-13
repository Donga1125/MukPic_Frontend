import type { Metadata } from "next";
import "@/app/globals.css";
import { ReactNode } from "react";
import { SvgButtonForNav } from "@/app/components/button";
import TopNav from "@/app/components/TopNav";

export const metadata: Metadata = {
  title: "MukPic-Login-Id"
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
          <TopNav
            leftButton={<SvgButtonForNav>
              <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.88 0.879951C10.39 0.389951 9.6 0.389951 9.11 0.879951L0.700001 9.28995C0.310001 9.67995 0.310001 10.31 0.700001 10.7L9.11 19.11C9.6 19.6 10.39 19.6 10.88 19.11C11.37 18.62 11.37 17.83 10.88 17.34L3.54 9.99995L10.89 2.64995C11.37 2.15995 11.37 1.36995 10.88 0.879951Z" fill="black" />
              </svg>
            </SvgButtonForNav>}
          />
          {/* 메인 */}
          <div className="auth-container flex-1">
            {/* 메인 페이지 내용 */}
            {children}
          </div>
        </div>

      </body>
    </html>
  );
}
