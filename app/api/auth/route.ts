import { NextResponse } from "next/server";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))


export async function GET(request: Request) {
    const randomDelay = Math.floor(Math.random() * 5000);
    console.log('randomDelay', randomDelay);

    await delay(randomDelay);

    return NextResponse.json({data: `${randomDelay}만에 응답완료`})
}