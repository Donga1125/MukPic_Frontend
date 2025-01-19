import type { Metadata } from "next";
import "@/app/globals.css";
import TopNav from "@/app/components/TopNav";
import { ReactNode } from "react";
import { TextAndIconButton, TextLogoButtonForNav } from "@/app/components/button";


export const metadata: Metadata = {
    title: "MukPic-community",
};

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="root-wrapper">
            {children}
        </div>



    );
}
