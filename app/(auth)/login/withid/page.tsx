import LoginForm from '@/app/components/auth/loginComponents';
import '@/app/globals.css'


export default function LoginWithId() {
    return (
        <>
            <div className='flex justify-center items-center logo-box'>
                <span className='login-logo-small'>MUKPIC</span>
            </div>
            <div >
                <LoginForm></LoginForm>
            </div>
            
        </>
    );
}

