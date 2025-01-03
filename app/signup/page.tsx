import head from 'next/head';  // Head 컴포넌트를 불러옵니다.
import { create } from 'zustand';




export default function SignUp() {




    return (
        <>
            <head>
                <title>signup</title>  {/* 각 페이지에서 동적으로 타이틀 설정 */}
            </head>

            <div className="card bg-base-100">
                <div className='card-body'>
                    <h1>회원 가입을 진행할게요</h1>
                    <div className="form-control primary">
                        <label className="cursor-pointer label">
                            <span className="label-text">개인정보 민감정보 동의</span>
                            <input type="checkbox" className="checkbox checkbox-xs" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <span className="label-text">이용 약관 동의</span>
                            <input type="checkbox" className="checkbox checkbox-xs" />
                        </label>
                    </div>
                    <button className="btn btn-wide">다음으로</button>
                </div>
            </div>
        </>

    );
}