import "@/app/globals.css";
import { ReactNode } from "react";




type LayoutProps = {
    children: ReactNode;

};

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <head>
                <link href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/static/woff2/SUIT.css" rel="stylesheet"></link>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
