'use client';
import { emailSchema, userNameSchema, userSchema } from "@/schemas/auth";
import { WideButton } from "../button";
import { UseVaildate } from "@/app/hooks/useVaildate";
import { EmailValidateError, UserNameValidateError, UserValidateError } from "@/app/types/signupValidate";
import { boolean, set } from "zod";
import React, { use, useEffect, useRef, useState } from "react";
import { useSignupStore } from "@/app/types/signupStore";
import { useRouter } from "next/navigation";
import axios from "axios";
import { error } from "console";


type Props = {
    message: string;
    error: boolean;
    className?: string;
}
type IconProps = {
    error: boolean;
}

export function ValidateIcon({ error }: IconProps) {
    return (
        <span className={`badge badge-xs ${error ? 'badge-error' : 'badge-success'}`}></span>
    );
}

export function ValidateSpan({ message, error, className }: Props) {
    return (
        <span className={`label-text-alt text-left pl-[1.25rem] ${className}`} style={{ display: error ? 'block' : 'none' }}>
            {message}
        </span>
    );
}


export function SignupStep() {

    const [personalInfoAgree, setpersonalInfoAgree] = useState<boolean>(false);
    const [termsAgree, settermsAgree] = useState<boolean>(false);
    const [isAgree, setIsAgree] = useState<boolean>(false);
    const setAgree = useSignupStore(state => state.setagree);
    const router = useRouter();
    useEffect(() => {
        setIsAgree(personalInfoAgree && termsAgree);
    }, [personalInfoAgree, termsAgree]);

    const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>,
        setFunction: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setFunction(e.target.checked);
    };

    const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAgree(true);
        router.push('/signup/step1');
    }

    return (
        <form onSubmit={handleSumbit} className='flex flex-col gap-[0.75rem] flex-grow' >
            <div className='card'>
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
                            onChange={(e) => checkboxChange(e, settermsAgree)} />
                    </label>
                </div>
            </div>
            <button
                className='auth-button auth-button-id sign-up-button-text'
                disabled={!isAgree}
            >Next
            </button>
        </form>
    );
}


export function SignupStep1() {
    const email = useSignupStore(state => state.email);
    const setemail = useSignupStore(state => state.setemail);
    const [authNum, setAuthNum] = useState<string>('');
    const [isSendButtonDisabled, setIsSendButtonDisabled] = useState<boolean>(true);
    const emailSendMessage = 'Verification code has been sent to your email';
    const [sendMessageVisiblity, setSendMessageVisiblity] = useState<boolean>(false);
    const router = useRouter();
    const { errors, validateField } = UseVaildate<EmailValidateError>(emailSchema);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState<boolean>(true);
    const [isVerifyButtonDisabled, setIsVerifyButtonDisabled] = useState<boolean>(true);
    const [inputBorderColor, setInputBorderColor] = useState<string>('border-none');
    const [emailVerifyMessage, setEmailVerifyMessage] = useState<string>('');
    const [messageColor, setMessageColor] = useState<string>('');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);
        setemail(value);
        //이메일 중복체크 포함
    };

    // 이메일 전송 포스트 요청
    const sendEmail = async () => {

        console.log(email);
        axios.post(`${process.env.NEXT_PUBLIC_ROOT_API}/register/email`,
            {
                email: email
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then(function (response) {
            if (response.status === 200) {
                setSendMessageVisiblity(true);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    // 응답 성공, 실패 시 const [inputBorderColor, setInputBorderColor] = useState<string>('border-none'); 로
    // inputBorderColor를 변경해주는데 페이지에서 적용이 안됨 확인필요 25.01.13

    const emailVerify = async () => {
        console.log('이메일 인증 로직 시작');
        axios.post(`${process.env.NEXT_PUBLIC_ROOT_API}/register/emailAuth`,
            {
                email: email,
                authNum: authNum
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then(function (response) {
            if (response.status === 200) {
                setMessageColor('text-green-500');
                setEmailVerifyMessage('Email verification success!');
                setInputBorderColor('border-green-500');
                setIsNextButtonDisabled(false);
            }
        }).catch(function (error) {
            if (error.response.status === 400) {
                console.log(error.data);
                setMessageColor('text-red-500');
                setInputBorderColor('border-red-500 border-opacity-100');
                setEmailVerifyMessage('The verification code is incorrect. Please check again');
            }
        });
    };






    useEffect(() => {
        setIsSendButtonDisabled(!!errors?.email || !email.trim()); //유효성 검사 통과해야 send 버튼 활성화
    }, [errors, email]);

    useEffect(() => {
        setIsVerifyButtonDisabled(!authNum.trim());
    }, [authNum]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/signup/step2');
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-[0.75rem] flex-grow'>
            <label htmlFor="email" className="flex auth-input-label items-center">
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    placeholder="email@example.com"
                    onChange={handleChange}
                    className='auth-placeholder grow text-left' />
                <button
                    className='flex items-center justify-center verify-button-send verify-button nav-text-button'
                    onClick={sendEmail}
                    disabled={isSendButtonDisabled}
                    type='button'
                >
                    Send
                </button>
            </label>
            <div>
                {errors?.email && <ValidateSpan message={errors?.email[0]} error={!!errors?.email}></ValidateSpan>}
                {emailSendMessage && <ValidateSpan message={emailSendMessage} error={sendMessageVisiblity}></ValidateSpan>}
            </div>

            {sendMessageVisiblity && (<label htmlFor="authNum"
                className={`flex auth-input-label items-center ${inputBorderColor}`}>
                <input
                    id="authNum"
                    name="authNum"
                    type="text"
                    placeholder="Enter verification code"
                    className='auth-placeholder grow text-left'
                    value={authNum}
                    onChange={(e) => setAuthNum(e.target.value)}
                />
                <button className='flex items-center justify-center verify-button-send verify-button nav-text-button'
                    disabled={isVerifyButtonDisabled}
                    onClick={emailVerify}
                    type='button'>
                    Verify
                </button>
            </label>
            )}
            <div>
                {emailVerifyMessage && <ValidateSpan message={emailVerifyMessage} error={!!emailVerifyMessage}
                    className={messageColor}></ValidateSpan>}
            </div>
            {/* 인증 메시지 처리 넣어줘야함 */}
            <button className='auth-button auth-button-id sign-up-button-text'
                type='submit'
                disabled={isNextButtonDisabled}
            >Next
            </button>
        </form >
    );
}

export function SignupStep2() {
    const { errors, validateField } = UseVaildate<UserValidateError>(userSchema);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [checkButtonDisabled, setCheckButtonDisabled] = useState<boolean>(true);
    const [canUseId, setCanUseId] = useState<boolean>(false);
    const [idDuplicateMessage, setidDuplicateMessage] = useState<string>('');
    const [messageColor, setMessageColor] = useState<string>('');



    const userId = useSignupStore(state => state.userId);
    const setuserId = useSignupStore(state => state.setuserId);
    const password = useSignupStore(state => state.password);
    const setpassword = useSignupStore(state => state.setpassword);

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);
        if (name === 'userId') {
            setuserId(value);  // userId만 업데이트
            setidDuplicateMessage(''); // userId가 변경되면 중복 메시지 초기화
            setCanUseId(false); // userId가 변경되면 중복 확인 여부 초기화화
        } else if (name === 'password') {
            setpassword(value);  // password만 업데이트
        }
    };

    const CheckIdDuplicateHandler = async () => {
        axios({
            method: 'get',
            url: `${process.env.NEXT_PUBLIC_ROOT_API}/users/checkUserId`,
            params: {
                userId: userId
            },
            responseType: 'json'
        }).then(function (response) {
            //이미 있는 경우 true 반환
            if (response.data === true) {
                setCanUseId(false);
                setidDuplicateMessage('This ID is already exist');
                setMessageColor('text-red-500');
            }
            else {
                setCanUseId(true);
                setidDuplicateMessage('This ID is available');
                setMessageColor('text-green-500');
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        const isFormValid = userId.trim() && password.trim();  // userId와 password가 공백이 아니어야 활성화
        const hasErrors = !!errors?.userId || !!errors?.password;  // errors가 있으면 비활성화
        const passIdDuplicate = !canUseId;

        setIsButtonDisabled(hasErrors || !isFormValid || passIdDuplicate);  // 오류가 있거나 유효성 검사 실패시 비활성화
    }, [errors, userId, password, canUseId]);

    useEffect(() => {
        setCheckButtonDisabled(!userId.trim() || !!errors?.userId);
    }, [userId, errors]);


    const PasswordToggle = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/signup/step3');
    }



    return (

        <form onSubmit={handleSubmit} className='flex flex-col gap-[0.75rem] flex-grow'>
            <label htmlFor="userId" className="flex auth-input-label items-center">
                <input
                    id="userId"
                    name="userId"
                    type="text"
                    placeholder="Enter Your Id"
                    onChange={handleChange}
                    value={userId}
                    className='auth-placeholder grow text-left' />
                <button className='flex items-center justify-center verify-button-send verify-button nav-text-button'
                    type='button'
                    onClick={CheckIdDuplicateHandler}
                    disabled={checkButtonDisabled}
                >
                    Check
                </button>
            </label>
            <div>
                {errors?.userId && <ValidateSpan message={errors?.userId[0]} error={!!errors?.userId}></ValidateSpan>}
                {idDuplicateMessage && <ValidateSpan message={idDuplicateMessage} error={!!idDuplicateMessage}
                    className={messageColor}></ValidateSpan>}
            </div>

            <label htmlFor="password" className="flex auth-input-label items-center">
                <input
                    id="password"
                    name="password"
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={handleChange}
                    className='auth-placeholder grow text-left' />
                <button type='button' className='flex items-center justify-center' onClick={PasswordToggle}>
                    {passwordVisible ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_112_3055)">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="#6A7784" />
                        </g>
                        <defs>
                            <clipPath id="clip0_112_3055">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                        :
                        <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.83 6L14 9.16C14 9.11 14 9.05 14 9C14 8.20435 13.6839 7.44129 13.1213 6.87868C12.5587 6.31607 11.7956 6 11 6C10.94 6 10.89 6 10.83 6ZM6.53 6.8L8.08 8.35C8.03 8.56 8 8.77 8 9C8 9.79565 8.31607 10.5587 8.87868 11.1213C9.44129 11.6839 10.2044 12 11 12C11.22 12 11.44 11.97 11.65 11.92L13.2 13.47C12.53 13.8 11.79 14 11 14C9.67392 14 8.40215 13.4732 7.46447 12.5355C6.52678 11.5979 6 10.3261 6 9C6 8.21 6.2 7.47 6.53 6.8ZM1 1.27L3.28 3.55L3.73 4C2.08 5.3 0.78 7 0 9C1.73 13.39 6 16.5 11 16.5C12.55 16.5 14.03 16.2 15.38 15.66L15.81 16.08L18.73 19L20 17.73L2.27 0M11 4C12.3261 4 13.5979 4.52678 14.5355 5.46447C15.4732 6.40215 16 7.67392 16 9C16 9.64 15.87 10.26 15.64 10.82L18.57 13.75C20.07 12.5 21.27 10.86 22 9C20.27 4.61 16 1.5 11 1.5C9.6 1.5 8.26 1.75 7 2.2L9.17 4.35C9.74 4.13 10.35 4 11 4Z" fill="#6A7784" />
                        </svg>
                    }
                </button>
            </label>
            <div>
                {errors?.password && <ValidateSpan message={errors?.password[0]} error={!!errors?.password}></ValidateSpan>}
            </div>
            <button className='auth-button auth-button-id sign-up-button-text'
                type='submit'
                disabled={isButtonDisabled}
            >Next
            </button>
        </form >

    );
}


export function SignupStep3() {
    const { errors, validateField } = UseVaildate<UserNameValidateError>(userNameSchema);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const userName = useSignupStore(state => state.userName);
    const setuserName = useSignupStore(state => state.setuserName);
    const router = useRouter();

    const [canUseUserName, setCanUseuserName] = useState<boolean>(false);
    const [userNameDuplicateMessage, setUserNameDuplcateMessage] = useState<string>('');
    const [messageColor, setMessageColor] = useState<string>('');
    const [checkButtonDisabled, setCheckButtonDisabled] = useState<boolean>(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);
        if (name === 'userName') {
            setuserName(value);
            setUserNameDuplcateMessage('');
            setCanUseuserName(false);
        }
    };

    const CheckUserNameDuplicateHandler = async () => {
        axios({
            method: 'get',
            url: `${process.env.NEXT_PUBLIC_ROOT_API}/users/checkUserName`,
            params: {
                userName: userName
            },
            responseType: 'json'
        }).then(function (response) {
            //이미 있는 경우 true 반환
            if (response.data === true) {
                setCanUseuserName(false);
                setUserNameDuplcateMessage('This userName is already exist');
                setMessageColor('text-red-500');
            }
            else {
                setCanUseuserName(true);
                setUserNameDuplcateMessage('This userName is available');
                setMessageColor('text-green-500');
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        setIsButtonDisabled(!!errors?.userName || !userName.trim() || !canUseUserName);
        console.log(userName);
    }, [errors, userName, canUseUserName]);

    useEffect(() => {
        setCheckButtonDisabled(!userName.trim() || !!errors?.userName);
    }, [userName, errors]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/signup/step4');
    }


    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-[0.75rem] flex-grow'>
            <label htmlFor='profileImage' className='flex items-center gap-8'>
                <button type='button'>
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="60" cy="60" r="60" fill="#F1F3F6" />

                        <g transform="translate(90, 90)">
                            <circle cx="12" cy="12" r="11.5" fill="white" stroke="#C7C7CC" />
                            <g transform="translate(4, 4)">
                                <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" fill="#8E8E93" />
                                <path d="M12.8 3.22222H10.898L10.154 2.39722C9.932 2.14667 9.608 2 9.272 2H6.728C6.392 2 6.068 2.14667 5.84 2.39722L5.102 3.22222H3.2C2.54 3.22222 2 3.77222 2 4.44444V11.7778C2 12.45 2.54 13 3.2 13H12.8C13.46 13 14 12.45 14 11.7778V4.44444C14 3.77222 13.46 3.22222 12.8 3.22222ZM8 11.1667C6.344 11.1667 5 9.79778 5 8.11111C5 6.42444 6.344 5.05556 8 5.05556C9.656 5.05556 11 6.42444 11 8.11111C11 9.79778 9.656 11.1667 8 11.1667Z" fill="#8E8E93" />
                            </g>
                        </g>
                    </svg>
                </button>
                <span className='signup-text signup-text-gray'>Set Your Profile Image</span>
            </label>
            <label htmlFor="userName" className="flex auth-input-label items-center">
                <input
                    id="userName"
                    name="userName"
                    type="userName"
                    placeholder="Enter Your Name"
                    onChange={handleChange}
                    value={userName}
                    className='auth-placeholder grow text-left' />
                <button
                    type='button'
                    className='flex items-center justify-center verify-button-send verify-button nav-text-button'
                    onClick={CheckUserNameDuplicateHandler}
                    disabled={checkButtonDisabled}
                >
                    Check
                </button>
            </label>
            <div>
                {errors?.userName && <ValidateSpan message={errors?.userName[0]} error={!!errors?.userName}></ValidateSpan>}
                {userNameDuplicateMessage && <ValidateSpan message={userNameDuplicateMessage} error={!!userNameDuplicateMessage}
                    className={messageColor}></ValidateSpan>}
            </div>
            <button className='auth-button auth-button-id sign-up-button-text'
                type='submit'
                disabled={isButtonDisabled}
            >Next
            </button>
        </form>
    );
}

const DropDownIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <g clip-path="url(#clip0_112_2361)">
                <path d="M11.6133 15.6133L15.0667 19.0666C15.5867 19.5866 16.4267 19.5866 16.9467 19.0666L20.4 15.6133C21.24 14.7733 20.64 13.3333 19.4533 13.3333H12.5467C11.36 13.3333 10.7733 14.7733 11.6133 15.6133Z" fill="black" />
            </g>
            <defs>
                <clipPath id="clip0_112_2361">
                    <rect width="32" height="32" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

const DropDownIconReverse = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M20.3867 16.3867L16.9333 12.9334C16.4133 12.4134 15.5733 12.4134 15.0533 12.9334L11.6 16.3867C10.76 17.2267 11.36 18.6667 12.5467 18.6667L19.4533 18.6667C20.64 18.6667 21.2267 17.2267 20.3867 16.3867Z" fill="black" />
        </svg>
    )
}

type DropdownProps = {
    options: string[];
    buttonName: string;
    isMultiSelect?: boolean;
    onSelect: (selected: string | string[]) => void;
}
export function Dropdown({ options, buttonName, isMultiSelect, onSelect }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 상태
    const [selectedItems, setSelectedItems] = useState<string[]>([]); // 선택된 항목 리스트
    const [selectedItem, setSelectedItem] = useState<string | null>(null); // 단일 선택용
    const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 외부 클릭 감지

    // 드롭다운 토글
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    // 항목 선택
    const selectItem = (item: string) => {
        if (isMultiSelect) {
            if (!selectedItems.includes(item)) {
                const newSelectedItems = [...selectedItems, item];
                setSelectedItems(newSelectedItems);
                onSelect(newSelectedItems); // 부모로 선택된 항목 전달
            }
        } else {
            setSelectedItem(item);
            setIsOpen(false);
            onSelect(item); // 부모로 선택된 항목 전달
        }
    };

    // 뱃지 삭제
    const removeBadge = (item: string) => {
        if (isMultiSelect) {
            const newSelectedItems = selectedItems.filter((selected) => selected !== item);
            setSelectedItems(newSelectedItems);
            onSelect(newSelectedItems); // 부모로 선택된 항목 전달
        } else {
            setSelectedItem(null);
            onSelect(""); // 부모로 선택 해제 상태 전달
        }
    };

    // 드롭다운 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="dropdown-container">
            {/* 드롭다운 버튼 */}
            <button
                type="button"
                onClick={toggleDropdown}
                className="profile-dropdown-button"
            >
                <span>{buttonName}</span>
                {!isOpen ? <DropDownIcon /> : <DropDownIconReverse />}
            </button>

            {/* 드롭다운 리스트 */}
            {isOpen && (
                <div className="dropdown-list">
                    <ul>
                        {options.map((option) => (
                            <li
                                key={option}
                                className="dropdown-item"
                                onClick={() => selectItem(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 선택된 항목 표시 (뱃지) */}
            <div className='dropdown-badge-container'>
                {isMultiSelect ? selectedItems.map((item) => (
                    <button
                        key={item}
                        className="dropdown-badge dropdown-badge-green"
                        onClick={() => removeBadge(item)}
                    >
                        {item} ×
                    </button>
                ))
                    : selectedItem && (
                        <button
                            key={selectedItem}
                            className="dropdown-badge dropdown-badge-green"
                            onClick={() => removeBadge(selectedItem)}
                        >
                            {selectedItem} ×
                        </button>
                    )}
            </div>
        </div>
    );
}

export function SignupStep4() {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null); // 지역 선택 상태
    const [selectedReligions, setSelectedReligions] = useState<string | null>(null); // 종교 선택 상태
    const [selectedFoodHabits, setSelectedFoodHabits] = useState<string[]>([]); // 식습관 선택 상태
    const router = useRouter();

    const setNationality = useSignupStore(state => state.setnationality);
    const setReligion = useSignupStore(state => state.setreligion);
    const setDietaryPreferences = useSignupStore(state => state.setDietaryPreferences);

    const isFormValid = selectedCountry && selectedReligions && selectedFoodHabits.length > 0;



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSelectedCountry(selectedCountry);
        setSelectedReligions(selectedReligions);
        setSelectedFoodHabits(selectedFoodHabits);

        // useSignupStore 상태 업데이트
        setNationality(selectedCountry ?? "");  // 국가 정보 설정
        setReligion(selectedReligions ?? "");   // 종교 정보 설정
        setDietaryPreferences(selectedFoodHabits);  // 식습관 설정
        console.log(selectedCountry);
        console.log(selectedFoodHabits)
        router.push('/signup/step5');
    }


    return (
        <form onSubmit={handleSubmit} className='signup-text signup-text-black flex-grow flex flex-col gap-[8rem]'>
            <div>
                <Dropdown
                    options={[
                        "Korea", "USA", "China", "Japan", "Germany", "France"
                    ]}
                    buttonName="Select Your Country"
                    isMultiSelect={false}
                    onSelect={(selected) => setSelectedCountry(selected as string | null)}
                />
            </div>
            <div>
                <Dropdown
                    options={[
                        "Christianity", "Buddhism", "Catholicism", "Islam", "Hinduism", "Atheism"
                    ]}
                    buttonName="Select Your Religion"
                    isMultiSelect={false}
                    onSelect={(selected) => setSelectedReligions(selected as string | null)}
                />
            </div>
            <div>
                <Dropdown
                    options={[
                        "No food to cover", "Vegetarian", "Vegan", "Pescatarian", "Low-Spice tolerance", "No Alcohol",
                        "No Pork", "No Beef"
                    ]}
                    buttonName="Select Your Food Habits"
                    isMultiSelect={true}
                    onSelect={(selected) => setSelectedFoodHabits(selected as string[])}
                />
            </div>
            <button className='auth-button auth-button-id sign-up-button-text'
                type='submit'
                disabled={!isFormValid}
            >Next
            </button>
        </form >
    );
}

export function SignupStep5() {
    // Eggs,Milk,Buck wheat, Peanut,Soybean,Wheat,Fish,Crab,Shrimp,Pork,Peach,Tomato,
    // Sulfurousacids,Walnut,Chicken,Beef,Squid,Oyster,Abalone,Mussel,Shellfish,Pine nut

    const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]); // 알레르기 선택 상태
    const seaFoodAllergieList = ['Fish', 'Crab', 'Shrimp', 'Squid', 'Abalone', 'Mussel', 'Oyster', 'Shellfish'];
    const fruitAllergieList = ['Peach', 'Tomato'];
    const nutsAllergieList = ['Buck wheat', 'Wheat', 'Walnut', 'Pine nut', 'Peanut', 'Soybean'];
    const meatAllergieList = ['Pork', 'Eggs', 'Milk', 'Chicken', 'Beef',];
    const etcAllergieList = ['Sulfurous'];
    const router = useRouter();
    const setAllergyTypes = useSignupStore(state => state.setAllergyTypes);
    const { userId,
        email,
        password,
        userName,
        nationality,
        religion,
        agree,
        chronicDiseaseTypes,
        dietaryPreferences } = useSignupStore.getState();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAllergyTypes(selectedAllergies);
        //직전에 업데이트 해줬으므로 여기서 불러옴
        const { allergyTypes } = useSignupStore.getState();
        //post 요청 로직 넣어야함
        const signupData = {
            userId,
            email,
            password,
            userName,
            nationality,
            religion,
            agree,
            allergyTypes,
            chronicDiseaseTypes,
            dietaryPreferences
        };

        axios({
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_ROOT_API}/users/register`,
            data: signupData,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            if (response.data.success) {
                alert('All set! Welcome aboard!');
                router.push('/login');
            }
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }


    const toggleAllergy = (allergy: string) => {
        if (selectedAllergies.includes(allergy)) {
            // 이미 선택된 경우 제거
            setSelectedAllergies((prev) => prev.filter((selected) => selected !== allergy));
        } else {
            // 선택되지 않은 경우 추가
            setSelectedAllergies((prev) => [...prev, allergy]);
        }
        console.log(selectedAllergies);
    };





    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-10 flex-grow'>
            <h1 className="text-xl font-bold mb-4">
                Please select your allergy</h1>

            {/* 버튼들을 나열 */}
            <div className="button-toggle-container flex flex-col gap-[1rem]" >
                <div>
                    <h1 className='allergies-title text-left gap-[0.75rem]'>Fruits</h1>
                </div>
                <div className='dropdown-badge-container '>
                    {fruitAllergieList.map((allergie) => (
                        <button
                            type='button'
                            key={allergie}
                            onClick={() => toggleAllergy(allergie)}
                            className={`allergies-button
                            ${selectedAllergies.includes(allergie)
                                    ? "dropdown-badge-red "
                                    : "dropdown-badge-none"
                                }`}
                        >
                            {allergie}
                        </button>
                    ))}
                </div>
            </div>
            <div className="button-toggle-container flex flex-wrap gap-[1rem]">
                <h1 className='allergies-title text-left gap-[0.75rem]'>Sea Food</h1>
                <div className='dropdown-badge-container'>
                    {seaFoodAllergieList.map((allergie) => (
                        <button
                            type='button'
                            key={allergie}
                            onClick={() => toggleAllergy(allergie)}
                            className={`allergies-button
                            ${selectedAllergies.includes(allergie)
                                    ? "dropdown-badge-red "
                                    : "dropdown-badge-none"
                                }`}
                        >
                            {allergie}
                        </button>
                    ))}
                </div>
            </div>
            <div className="button-toggle-container flex flex-wrap gap-[1rem]">
                <h1 className='allergies-title text-left gap-[0.75rem]'>Nuts & Seeds</h1>
                <div className='dropdown-badge-container'>
                    {nutsAllergieList.map((allergie) => (
                        <button
                            type='button'
                            key={allergie}
                            onClick={() => toggleAllergy(allergie)}
                            className={`allergies-button
                            ${selectedAllergies.includes(allergie)
                                    ? "dropdown-badge-red "
                                    : "dropdown-badge-none"
                                }`}
                        >
                            {allergie}
                        </button>
                    ))}
                </div>
            </div>
            <div className="button-toggle-container flex flex-wrap gap-[1rem]">
                <h1 className='allergies-title text-left gap-[0.75rem]'>Meat & Dairy</h1>
                <div className='dropdown-badge-container'>
                    {meatAllergieList.map((allergie) => (
                        <button
                            type='button'
                            key={allergie}
                            onClick={() => toggleAllergy(allergie)}
                            className={`allergies-button
                            ${selectedAllergies.includes(allergie)
                                    ? "dropdown-badge-red "
                                    : "dropdown-badge-none"
                                }`}
                        >
                            {allergie}
                        </button>
                    ))}
                </div>
            </div>
            <div className="button-toggle-container flex flex-wrap gap-[1rem]">
                <div>
                    <h1 className='allergies-title text-left gap-[0.75rem]'>ETC</h1>
                </div>
                <div className="dropdown-badge-container">
                    {etcAllergieList.map((allergie) => (
                        <button
                            type='button'
                            key={allergie}
                            onClick={() => toggleAllergy(allergie)}
                            className={`allergies-button
                            ${selectedAllergies.includes(allergie)
                                    ? "dropdown-badge-red "
                                    : "dropdown-badge-none"
                                }`}
                        >
                            {allergie}
                        </button>
                    ))}
                </div>
            </div>
            <button className='auth-button auth-button-id sign-up-button-text'
                type='submit'
            >Next
            </button>
        </form>
    );
}