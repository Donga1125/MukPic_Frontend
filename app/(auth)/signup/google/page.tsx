// 페이지 전체적으로 수정 파라미터로 로그인시 이메일만 전달받고 그 이메일로 토큰 발급받게 백엔드 수정 후 프론트에서도 사용 할 수 있게 수정함
// 그리고 사용자가 이 페이지를 확인 후 step3로 따로 추가요청을 해서 넘어가는건 비효율적인것 같아서
// 토큰이 저장 돼 있으면 step3로 바로 리다이렉트
'use client';

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function SignUp() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const email = searchParams.get("email");
        if (!email) {
            console.error("Email parameter is missing.");
            return;
        }

        const fetchTokens = async () => {
            try {
                // 이메일을 기반으로 토큰 요청
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_ROOT_API}/auth/email-login`,
                    { email },
                    { withCredentials: true } // 쿠키 포함
                );

                if (response.status === 200) {
                    const accessToken = response.headers["authorization"];

                    if (accessToken) {
                        // 로컬 스토리지에 토큰 저장
                        localStorage.setItem("googleLoginToken", accessToken);

                        console.log("Tokens stored successfully:", {
                            accessToken,
                        });

                        // 리디렉션
                        router.push("/signup/google/step3");
                    } else {
                        console.error("Tokens are missing in the response headers.");
                    }
                }
            } catch (error) {
                console.error("Error fetching tokens:", error);
            }
        };

        fetchTokens();
    }, [searchParams, router]);

    return (
        <div className="flex justify-center items-center logo-box">
            <span className="login-logo">MUKPIC</span>
        </div>
    );
}
