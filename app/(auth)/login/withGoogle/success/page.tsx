"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { Suspense } from "react";

function GoogleLoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const email = searchParams.get("email");
    if (!email) {
      console.error("Email parameter is missing.");
      router.push("/login"); // 이메일이 없으면 로그인 페이지로 이동
      return;
    }

    const fetchTokens = async () => {
      try {
        // 이메일 기반 토큰 요청
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_ROOT_API}/auth/email-login`,
          { email },
          { withCredentials: true } // 쿠키 포함
        );

        if (response.status === 200) {
          const accessToken = response.headers["authorization"];

          if (accessToken) {
            // 로컬 스토리지에 토큰 저장
            localStorage.setItem("Authorization", accessToken);
            console.log("Access token stored successfully:", accessToken);

            // 메인 페이지로 리디렉션
            router.push("/");
          } else {
            console.error("Authorization token is missing in the response headers.");
            alert("로그인 토큰을 가져오지 못했습니다. 다시 시도해주세요.");
            router.push("/login");
          }
        }
      } catch (error) {
        console.error("Error fetching tokens:", error);
        alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
        router.push("/login");
      }
    };

    fetchTokens();
  }, [searchParams, router]);

  return (
    <div>
      <h1>로그인 중...</h1>
    </div>
  );
}

export default function GoogleLoginSuccess() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <GoogleLoginContent />
    </Suspense>
  );
}
