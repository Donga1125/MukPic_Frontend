import Head from 'next/head';  // Head 컴포넌트를 불러옵니다.
import LoginForm from '@/app/components/auth/loginComponents';


export default function LoginPage() {
    return (
        <>
            <Head>
                <title>로그인</title>
            </Head>
            <LoginForm></LoginForm>
        </>
    );
}

