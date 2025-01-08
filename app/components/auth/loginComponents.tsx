'use client';
import { userLoginStore } from "@/app/types/loginStore";
import { WideButton } from "../button";
import axios from 'axios';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { string } from "zod";




export default function LoginForm() {
    const { userId, password, setUserId, setPassword } = userLoginStore();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();

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
            if(error.response){
                console.log('리스폰스 데이타',error.response.data);
                console.log('리스폰스 데이타',error.response.status);
                console.log('리스폰스 데이타',error.response.headers);
            }
            else if(error.request){
                console.log('에러리퀘스트',error.request);
            }
            else{
                console.log('에러메시지', error.message);
            }
            console.log(error.config);
        }) // 요청 데이터

};

return (

    <div className="card bg-base-100">
        <div className='card-body'>
            <form onSubmit={LoginHandler}>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text"
                        className="grow"
                        placeholder="UserId"
                        required
                        onChange={(e) => setUserId(e.target.value)}
                        value={userId} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type="password"
                        className="grow"
                        placeholder="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} />
                </label>
                {errorMessage && <div className="text-error">{errorMessage}</div>}
                <label className="cursor-pointer label">
                    <span className="label-text">Remember me</span>
                    <input type="checkbox" defaultChecked className="checkbox checkbox-xs" />
                </label>
                <WideButton type="submit">Login</WideButton>
            </form>
            <label className="justify-between label">
                <a className="link" href="/signup">signup</a> <a className="link">forgot password?</a>
            </label>
        </div>
    </div>

);
}
