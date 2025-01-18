import "@/app/globals.css";
import { ReactNode } from "react";

export const metadata={
    title: 'google login callback',
    description: 'google login callback',
}



type LayoutProps = {
    children: ReactNode;

};

export default function GoogleCallbackLayout({ children }: LayoutProps) {
    return (
        <div className="root-wrapper root-text">
            {children}
        </div>
    );
}
