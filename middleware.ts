import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);
  //   const token = request.cookies.get("authCookie");

  //   // 토큰이 없을 경우 로그인과 회원가입 페이지 외의 페이지에는 접근할 수 없음
  //   if (
  //     !token &&
  //     !pathname.startsWith("/login") &&
  //     !pathname.startsWith("/signup")
  //   ) {
  //     const loginUrl = new URL("/login", request.url); // 로그인 페이지 URL 생성
  //     console.log("토큰 없으면 로그인 페이지로 리다이렉트", loginUrl);
  //     return NextResponse.redirect(loginUrl);
  //   }

  //   // 토큰이 있을 경우 login과 signup 페이지로 접근할 수 없게 함
  //   if (
  //     token &&
  //     (pathname.startsWith("/login") || pathname.startsWith("/signup"))
  //   ) {
  //     return NextResponse.redirect(new URL("/", request.url)); // 메인 페이지로 리디렉션
  //   }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
