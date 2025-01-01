export default function SignUpStep3() {
    
    return (
        <>
            <head>
                <title>signup</title>  {/* 각 페이지에서 동적으로 타이틀 설정 */}
            </head>

            <div className="card bg-base-100">
                <div className='card-body'>
                    <h1>그 외의 필요한 정보들을 입력해주세요!</h1>
                    <div>
                       <p>
                        국가/알러지/종교/병력/식성정보 입력받을곳
                       </p>
                    </div>
                    <button className="btn btn-wide">회원 가입 완료하기!</button>
                </div>
            </div>
        </>
    );
}