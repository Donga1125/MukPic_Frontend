// app/page.js
import Head from 'next/head';  // Head 컴포넌트를 불러옵니다.
import Link from 'next/link';  // Link 컴포넌트를 불러옵니다.

export default function Home() {
  return (
    <>
      <Head>
        <title>mukPic</title>  {/* 각 페이지에서 동적으로 타이틀 설정 */}
      </Head>
      <div className="root-container">
        <div className="flex flex-col items-center justify-center flex-1 bg-white rounded-lg shadow-md">
          <Link href="/login">
            login Page
          </Link>

        </div>
      </div>
    </>

  );
}
