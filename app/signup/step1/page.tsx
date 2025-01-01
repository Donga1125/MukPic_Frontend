


export default function SignUpStep1() {

    return (
        <>
            <head>
                <title>id</title>  {/* 각 페이지에서 동적으로 타이틀 설정 */}
            </head>

            <div className="card bg-base-100">
                <div className='card-body'>
                    <h1>우선 아이디와 비밀번호를 입력해주세요</h1>
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