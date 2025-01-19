// 페이지 전체적으로 수정 파라미터로 로그인시 이메일만 전달받고 그 이메일로 토큰 발급받게 백엔드 수정 후 프론트에서도 사용 할 수 있게 수정함
// 그리고 사용자가 이 페이지를 확인 후 step3로 따로 추가요청을 해서 넘어가는건 비효율적인것 같아서
// 토큰이 저장 돼 있으면 step3로 바로 리다이렉트
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
