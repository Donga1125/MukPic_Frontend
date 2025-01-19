'use client';
import LoginForm from '@/app/components/auth/loginComponents';
import '@/app/globals.css'



export default function LoginWithId() {
    return (
        <div className="auth-container flex-1">
            <div className='flex justify-center items-center logo-box'>
                <span className='login-logo-small'>MUKPIC</span>
            </div>
            <LoginForm></LoginForm>
        </div>

    );
}

