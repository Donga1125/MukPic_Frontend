import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // const token = request.cookies.has("authToken");

  //로그인이 필요한 페이지로 리다이렉트 개발중이라 임시로 주석처리

  // if (!token) {
  //   const loginUrl = new URL("/login", request.url); // 로그인 페이지 URL 생성
  //   loginUrl.searchParams.set("redirect", pathname); // 리다이렉트 후 돌아올 경로 추가
  //   console.log("요청 거부됨", loginUrl);
  //   return NextResponse.redirect(loginUrl);
  // }

  console.log("요청 허용됨", pathname);
  return NextResponse.next();
}

export const config = {
  matcher:[ '/((?!_next/static|_next/image|favicon.ico|login|signup).*)',],
};
