'use client';
import { GoogleSignup } from "@/app/components/auth/googleSignupComponents";
import axios from "axios";
import { useEffect } from "react";

export default function SignUp() {

    // 구글 회원가입 진행 시 첫 페이지에서 토큰 받아와서 저장
    useEffect(() => {
            axios({
                method: 'get',
                url: `${process.env.NEXT_PUBLIC_ROOT_API}/auth/token`,
                responseType: 'json'
            }).then(function (response) {
                if(response.status === 200){
                    localStorage.setItem('googleLoginToken', response.headers['Authorization']);
                }
            }).catch(function (error) {
                alert('Error! please try agian (디버그용 메시지 : 토큰 호출 실패)');
                console.log(error);
            });
    }, [])

    return (

        <>
            <div className='flex justify-center items-center logo-box'>
                <span className='login-logo'>MUKPIC</span>
            </div>
            <GoogleSignup></GoogleSignup>
        </>

    )



}