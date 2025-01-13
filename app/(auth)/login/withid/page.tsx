'use client';
import LoginForm from '@/app/components/auth/loginComponents';
import { SvgButtonForNav } from '@/app/components/button';
import TopNav from '@/app/components/TopNav';
import '@/app/globals.css'



export default function LoginWithId() {
    return (
        <>
            <TopNav
                leftButton={<SvgButtonForNav>
                    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.88 0.879951C10.39 0.389951 9.6 0.389951 9.11 0.879951L0.700001 9.28995C0.310001 9.67995 0.310001 10.31 0.700001 10.7L9.11 19.11C9.6 19.6 10.39 19.6 10.88 19.11C11.37 18.62 11.37 17.83 10.88 17.34L3.54 9.99995L10.89 2.64995C11.37 2.15995 11.37 1.36995 10.88 0.879951Z" fill="black" />
                    </svg>
                </SvgButtonForNav>}
            />
            <div className="auth-container flex-1">
                <div className='flex justify-center items-center logo-box'>
                    <span className='login-logo-small'>MUKPIC</span>
                </div>
                <LoginForm></LoginForm>
            </div>

        </>
    );
}

