'use client';
import { userLoginStore } from "@/app/types/loginStore";
import axios from 'axios';
import React, { useState } from "react";
import Cookies from 'js-cookie';
import Link from "next/link";
import '@/app/globals.css'




export default function LoginForm() {
    const { userId, password, setUserId, setPassword } = userLoginStore();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const passwordToggle = () => {
        setPasswordVisible(!passwordVisible);
    }

    const LoginHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("ID:", userId);
        console.log("PW:", password);


        if (!userId || !password) {
            setErrorMessage('아이디와 비밀번호를 입력해주세요');
            return;
        }

        //로그인 post request
        console.log("로그인 요청중");
        console.log("API주소", `${process.env.NEXT_PUBLIC_ROOT_API}/auth/login`); // 서버 응답 상태 텍스트
        axios.post(`${process.env.NEXT_PUBLIC_ROOT_API}/auth/login`,
            {
                userId: userId,
                password: password
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(function (response) {
                console.log("Request Data:", { userId, password }); // 요청 데이터
                console.log("Response Data:", response.data); // 서버 응답 데이터
                console.log("Response Token:", response.data.token); // 서버 응답 토큰
                console.log("Response Status:", response.status); // 서버 응답 상태
            })
            .catch(function (error) {
                if (error.response) {
                    console.log('리스폰스 데이타', error.response.data);
                    console.log('리스폰스 데이타', error.response.status);
                    console.log('리스폰스 데이타', error.response.headers);
                }
                else if (error.request) {
                    console.log('에러리퀘스트', error.request);
                }
                else {
                    console.log('에러메시지', error.message);
                }
                console.log(error.config);
            }) // 요청 데이터

    };

    return (
        <form onSubmit={LoginHandler} className='flex flex-col gap-[0.75rem]'>
            <label htmlFor="userId" className='flex auth-input-label' >
                <input type="text"
                    id='userId'
                    placeholder="YourId"
                    required
                    onChange={(e) => setUserId(e.target.value)}
                    value={userId}
                    className='auth-placeholder grow text-left' />
            </label>
            <label htmlFor="password" className="flex auth-input-label">
                <input type={passwordVisible ? 'text' : 'password'}
                    id='password'
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className='auth-placeholder grow text-left' />
                <button className='flex items-center justify-center'onClick={passwordToggle}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_112_3055)">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="#6A7784" />
                        </g>
                        <defs>
                            <clipPath id="clip0_112_3055">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </label>
            {errorMessage && <div className="validate-error-text">{errorMessage}</div>}
            <label className="login-form-text-sm flex justify-between items-center px-[1.25rem]">
                <div className="flex items-center">
                    <input type="checkbox" defaultChecked />
                    <span className="label-text">Remember me</span>
                </div>

                <Link href='/forgotPassword' className='text-right'>Forgot Password?</Link>
            </label>
            <button
                className="auth-button auth-button-id sign-up-button-text"
                type='submit'
            >
                Sign In
            </button>
        </form>
    );
}
