"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoogleLoginSuccess() {

    const router = useRouter();

    useEffect(() => {
        axios.get
            (`${process.env.NEXT_PUBLIC_ROOT_API}/auth/token`)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('Authorization', response.headers['Authorization']);
                    router.push('/');
                }
            })
            .catch((error) => {
                console.log(error);
                alert('에러 발생!');
                router.push('/login');
            });
    }, [router]);

    return (
        <div>
            <h1>로그인 중...</h1>
        </div>
    )

}