import Head from 'next/head';  // Head 컴포넌트를 불러옵니다.

export default function Home() {
  return (
    <>
      <Head>
        <title>login</title>  {/* 각 페이지에서 동적으로 타이틀 설정 */}
      </Head>
      <div>
        <h1>MukPic!</h1>
      </div>
    </>
  );
}
