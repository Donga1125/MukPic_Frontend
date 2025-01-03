export default function SignUpStep2() {

    return (
        <>
            <head>
                <title>email</title>  {/* 각 페이지에서 동적으로 타이틀 설정 */}
            </head>

            <div className="card bg-base-100">
                <div className='card-body'>
                    <h1>이메일과 성함을 입력해주세요.</h1>
                    <div>
                        <input type="text" placeholder="ID" className="input input-bordered w-full max-w-xs" />
                        <input type="password" placeholder="password" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <button className="btn btn-wide">다음으로</button>
                </div>
            </div>
        </>
    );
}