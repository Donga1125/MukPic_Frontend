import { ReactNode } from "react";

export const metadata = {
    title: 'Login-withId',
    description: 'LoginPage to MukPic',
}



type LayoutProps = {
    children: ReactNode;

};

export default function LoginWithIdLayout({ children }: LayoutProps) {

    return (
        <>
            {children}
        </>
    );
}


