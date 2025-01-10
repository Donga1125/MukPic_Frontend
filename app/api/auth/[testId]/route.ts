import { NextResponse } from "next/server";

export async function POST(request: Request,{params}: 
    {params: {testId: string}}) {
    
    const userData = await request.json();
    console.log('server user data', userData);
    console.log('params', params);

    return NextResponse.json({message : '사용자가 성공적으로 생성'})
}