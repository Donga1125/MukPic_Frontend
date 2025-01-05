'use client';
import { emailSchema, passwordSchema, userSchema } from "@/schemas/auth";
import { WideButton } from "../button";
import { UseVaildate } from "@/app/hooks/useVaildate";
import { EmailValidateError, PasswordValidateError, UserValidateError } from "@/app/types/signupValidate";
import { boolean } from "zod";
import { useState } from "react";

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
                            <input type="checkbox" className="checkbox checkbox-xs" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <span className="label-text">이용 약관 동의</span>
                            <input type="checkbox" className="checkbox checkbox-xs" />
                        </label>
                    </div>
                    <WideButton href="/signup/step1">다음으로</WideButton>
                </div>
            </div>
        </>

    );
}
export function SignupStep1() {
    const { errors, validateField } = UseVaildate<EmailValidateError>(emailSchema);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);

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

                    <WideButton href="/signup/step2">다음으로</WideButton>
                </div>
            </div>
        </>
    );
}
export function SignupStep2() {
    const { errors, validateField } = UseVaildate<UserValidateError>(userSchema);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);

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
                    <WideButton href="/signup/step3">다음으로</WideButton>
                </div>
            </div>
        </>
    );
}
export function SignupStep3() {
    const { errors, validateField } = UseVaildate<PasswordValidateError>(passwordSchema);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);

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
                    <WideButton href="/signup/step4">다음으로</WideButton>
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

                    <WideButton href="/login">회원가입 완료하기!</WideButton>
                </div>
            </div>
        </>
    );
}