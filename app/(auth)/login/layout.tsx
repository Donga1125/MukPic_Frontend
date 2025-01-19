import { ReactNode } from "react";

export const metadata={
    title: 'MukPic-Login',
    description: 'LoginPage to MukPic',
}



type LayoutProps = {
    children: ReactNode;

};

export default function LoginLayout({ children }: LayoutProps) {
    return (
        <div className="root-wrapper">
            {children}
        </div>
    );
}
