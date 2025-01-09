import LoginForm from '@/app/components/auth/loginComponents';
import '@/app/globals.css'


export default function LoginWithId() {
    return (
        <>
            <div className='flex justify-center items-center'>
                <span className='login-logo'>MUKPIC</span>
            </div>
            <div >
                <LoginForm></LoginForm>
            </div>
            
        </>
    );
}

