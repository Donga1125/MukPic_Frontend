'use client';
import { emailSchema, passwordSchema, userSchema } from "@/schemas/auth";
import { WideButton } from "../button";
import { UseVaildate } from "@/app/hooks/useVaildate";
import { EmailValidateError, PasswordValidateError, UserValidateError } from "@/app/types/signupValidate";
import { boolean, set } from "zod";
import { useEffect, useState } from "react";
import { useSignupStore } from "@/app/types/signupStore";


type Props = {
    message: string;
    error: boolean;
}
type IconProps = {
    error: boolean;
}

export function ValidateIcon({ error }: IconProps) {
    return (
        <span className={`badge badge-xs ${error ? 'badge-error' : 'badge-success'}`}></span>
    );
}

export function ValidateSpan({ message, error }: Props) {
    return (
        <span className="label-text-alt" style={{ display: error ? 'block' : 'none' }}>
            {message}
        </span>
    );
}


export function SignupStep() {

    const [personalInfoAgree, setpersonalInfoAgree] = useState<boolean>(false);
    const [termsAgree, settermsAgree] = useState<boolean>(false);
    const [isAgree, setIsAgree] = useState<boolean>(false);

    useEffect(() => {
        setIsAgree(personalInfoAgree && termsAgree);
    }, [personalInfoAgree, termsAgree]);

    const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>,
        setFunction : React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setFunction(e.target.checked);
    };
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
                            <span className="label-text">개인정보 및 민감정보 사용 동의</span>
                            <input type="checkbox" className="checkbox checkbox-xs"
                            onChange={(e) => checkboxChange(e, setpersonalInfoAgree)} />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <span className="label-text">이용 약관 동의</span>
                            <input type="checkbox" className="checkbox checkbox-xs"
                            onChange={(e) => checkboxChange(e, settermsAgree)}  />
                        </label>
                    </div>
                    <WideButton href="/signup/step1" disabled={!isAgree}>다음으로</WideButton>
                </div>
            </div>
        </>

    );
}
export function SignupStep1() {
    const email=useSignupStore(state=>state.email);
    const setemail=useSignupStore(state=>state.setemail);

    const { errors, validateField } = UseVaildate<EmailValidateError>(emailSchema);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);  
        setIsButtonDisabled(!!errors?.email||!value.trim());
        setemail(e.target.value);
    };


    return (
        <>
            <head>
                <title>id</title>  {/* 각 페이지에서 동적으로 타이틀 설정 */}
            </head>
            <h1>우선 이메일을 입력해주세요!</h1>
            <div className="card bg-base-100">

                <div className='card-body'>

                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="email@example.com"
                            onChange={handleChange}
                        />
                        <ValidateIcon error={!!errors?.email}></ValidateIcon>
                    </label>
                    {errors?.email && <ValidateSpan message={errors?.email[0]} error={!!errors?.email}></ValidateSpan>}

                    <WideButton href="/signup/step2" disabled={isButtonDisabled}>다음으로</WideButton>
                </div>
            </div>
        </>
    );
}
export function SignupStep2() {
    const { errors, validateField } = UseVaildate<UserValidateError>(userSchema);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);
        setIsButtonDisabled(!!errors?.userId && !!errors?.userName||!value.trim());

    };


    return (
        <>
            <head>
                <title>email</title>  {/* 각 페이지에서 동적으로 타이틀 설정 */}
            </head>
            <h1>아이디와 성함을 입력해주세요.</h1>
            <div className="card bg-base-100">
                <div className='card-body'>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            id="userId"
                            name="userId"
                            type="text"
                            placeholder="userId"
                            onChange={handleChange}
                        />
                        <ValidateIcon error={!!errors?.userId}></ValidateIcon>
                    </label>
                    {errors?.userId && <ValidateSpan message={errors?.userId[0]} error={!!errors?.userId}></ValidateSpan>}<label className="input input-bordered flex items-center gap-2">
                        <input
                            id="userName"
                            name="userName"
                            type="text"
                            placeholder="userName"
                            onChange={handleChange}
                        />
                        <ValidateIcon error={!!errors?.userName}></ValidateIcon>
                    </label>
                    {errors?.userName && <ValidateSpan message={errors?.userName[0]} error={!!errors?.userName}></ValidateSpan>}
                    <WideButton href="/signup/step3" disabled={isButtonDisabled}>다음으로</WideButton>
                </div>
            </div>
        </>
    );
}
export function SignupStep3() {
    const { errors, validateField } = UseVaildate<PasswordValidateError>(passwordSchema);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);
        setIsButtonDisabled(!!errors?.password||!value.trim());

    };


    return (
        <>
            <head>
                <title>signup</title>  {/* 각 페이지에서 동적으로 타이틀 설정 */}
            </head>
            <h1>사용하실 비밀번호를 입력해주세요!</h1>
            <div className="card bg-base-100">
                <div className='card-body'>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="yourPassword"
                            onChange={handleChange}
                        />
                        <ValidateIcon error={!!errors?.password}></ValidateIcon>
                    </label>
                    {errors?.password && <ValidateSpan message={errors?.password[0]} error={!!errors?.password}></ValidateSpan>}
                    <WideButton href="/signup/step4" disabled={isButtonDisabled}>다음으로</WideButton>
                </div>
            </div>
        </>
    );
}
export function SignupStep4() {
    const searchData = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"];

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    // 검색어 변경 시 리스트 필터링
    const filteredData = searchData.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 검색어 입력 처리
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // 항목 클릭 시 선택된 항목 추가
    const handleItemClick = (item: string) => {
        if (!selectedItems.includes(item)) {
            setSelectedItems((prev) => [...prev, item]);
        }
    };

    // 뱃지 클릭 시 항목 제거
    const handleBadgeClick = (item: string) => {
        setSelectedItems((prev) => prev.filter((selectedItem) => selectedItem !== item));
    };

    // 회원가입 완료 버튼 클릭 시
    const signupHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("ID:", userId);
        console.log("PW:", password);


        if (!userId || !password) {
            setErrorMessage('아이디와 비밀번호를 입력해주세요');
            return;
        }

        //로그인 post request
        try {
            console.log("로그인 요청중");
           
            const response = await axios.post(`${process.env.NEXT_PUBLIC_ROOT_API}/auth/login`,
                {
                    'userId': userId,
                    'password': password
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            console.log("Request Data:", { userId, password }); // 요청 데이터
            console.log("Response Data:", response.data); // 서버 응답 데이터
            console.log("Response Token:", response.data.token); // 서버 응답 토큰
            console.log("Response Status:", response.status); // 서버 응답 상태
            console.log("API주소", `${process.env.NEXT_PUBLIC_ROOT_API}/auth/login`); // 서버 응답 상태 텍스트

            const { token } = response.data;

            // 쿠키 설정 (document.cookie 대신 js-cookie 사용)
            Cookies.set('authToken', token, { expires: 30, path: '' }); // 만료 30일

            setErrorMessage('');
            alert('로그인 성공');
            router.push('/');
        }
        catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    setErrorMessage('아이디 또는 비밀번호가 일치하지 않습니다');
                }
                else {
                    setErrorMessage('서버 에러');
                }
            }
        }
    };
    


    return (
        <>
            <head>
                <title>signup</title>  {/* 각 페이지에서 동적으로 타이틀 설정 */}
            </head>
            <h1>그 외의 정보를 입력해주세요!</h1>
            <div className="card bg-base-100">
                <div className='card-body'>
                    {/* 검색창 */}
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="검색..."
                        className="input input-bordered"
                    />

                    {/* 검색 결과 */}
                    <div className="mt-2">
                        <ul>
                            {filteredData.map((item) => (
                                <li key={item} className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleItemClick(item)}
                                        className="btn btn-sm btn-outline"
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 선택된 항목을 뱃지로 표시 */}
                    <div className="mt-4">
                        {selectedItems.map((item) => (
                            <span
                                key={item}
                                className="badge badge-info mr-2 cursor-pointer"
                                onClick={() => handleBadgeClick(item)}
                            >
                                {item} <span className="ml-2">&times;</span>
                            </span>
                        ))}
                    </div>

                    <WideButton onClick>회원가입 완료하기!</WideButton>
                </div>
            </div>
        </>
    );
}