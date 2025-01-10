'use client';
import { ReactNode, useState } from "react";

type BotNavProps = {
    searchButton: ReactNode;
    communityButton: ReactNode;
    mypageButton: ReactNode;
};

export function BotNav({ searchButton, communityButton, mypageButton }: BotNavProps) {

    return (
        <>
            <div className=" bottom-10 bot-nav z-index-25 fixed flex ">
                {searchButton}
                {communityButton}
                {mypageButton}
            </div>
        </>
    );
}

type BotNavButtonProps = {
    Image: ReactNode;
    text?: string;
    isActive: boolean;
    onClick: () => void;
}

export function BotNavButton({ Image, text, isActive, onClick }: BotNavButtonProps) {
    return (
        <button className="flex flex-col items-center justify-center flex-1 mx-2 py-2"
            onClick={onClick}>
            <div className="mb-0">{Image}</div>
            {!isActive && <div className="mt-0"><span className='botnav-text'>{text}</span></div>}
        </button>
    );
}

export function AddBotNav() {
    const [activeBotNavButton, setActiveBotNavButton] = useState<string>('search');

    const handleButtonClick = (buttonName: string) => {
        setActiveBotNavButton(buttonName);
    };

    return (
        <BotNav
            searchButton=
            {<BotNavButton
                text='search'
                onClick={() => handleButtonClick('search')}
                isActive={activeBotNavButton === 'search'}
                Image={
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_112_2215)">
                            <path d="M25.8334 23.3333H24.5167L24.0501 22.8833C26.0501 20.5499 27.0834 17.3666 26.5167 13.9833C25.7334 9.34995 21.8667 5.64994 17.2001 5.08328C10.1501 4.21661 4.21673 10.1499 5.0834 17.1999C5.65007 21.8666 9.35007 25.7333 13.9834 26.5166C17.3667 27.0833 20.5501 26.0499 22.8834 24.0499L23.3334 24.5166V25.8333L30.4167 32.9166C31.1001 33.5999 32.2167 33.5999 32.9001 32.9166C33.5834 32.2333 33.5834 31.1166 32.9001 30.4333L25.8334 23.3333ZM15.8334 23.3333C11.6834 23.3333 8.3334 19.9833 8.3334 15.8333C8.3334 11.6833 11.6834 8.33328 15.8334 8.33328C19.9834 8.33328 23.3334 11.6833 23.3334 15.8333C23.3334 19.9833 19.9834 23.3333 15.8334 23.3333Z"
                                fill={activeBotNavButton === 'search' ? 'white' : 'gray'} />
                        </g>
                        <defs>
                            <clipPath id="clip0_112_2215">
                                <rect width="40" height="40" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                } />}

            communityButton=
            {<BotNavButton
                text='community'
                onClick={() => handleButtonClick('community')}
                isActive={activeBotNavButton === 'community'}
                Image={
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.0866 16.3334C19.1799 15.5634 19.2499 14.7934 19.2499 14C19.2499 13.2067 19.1799 12.4367 19.0866 11.6667H23.0299C23.2166 12.4134 23.3333 13.195 23.3333 14C23.3333 14.805 23.2166 15.5867 23.0299 16.3334M17.0216 22.82C17.7216 21.525 18.2583 20.125 18.6316 18.6667H22.0733C20.9533 20.5917 19.1683 22.085 17.0216 22.82ZM16.7299 16.3334H11.2699C11.1533 15.5634 11.0833 14.7934 11.0833 14C11.0833 13.2067 11.1533 12.425 11.2699 11.6667H16.7299C16.8349 12.425 16.9166 13.2067 16.9166 14C16.9166 14.7934 16.8349 15.5634 16.7299 16.3334ZM13.9999 23.2867C13.0316 21.8867 12.2499 20.335 11.7716 18.6667H16.2283C15.7499 20.335 14.9683 21.8867 13.9999 23.2867ZM9.33325 9.33337H5.92659C7.03492 7.39671 8.83159 5.90337 10.9666 5.18004C10.2666 6.47504 9.74159 7.87504 9.33325 9.33337ZM5.92659 18.6667H9.33325C9.74159 20.125 10.2666 21.525 10.9666 22.82C8.83159 22.085 7.03492 20.5917 5.92659 18.6667ZM4.96992 16.3334C4.78325 15.5867 4.66659 14.805 4.66659 14C4.66659 13.195 4.78325 12.4134 4.96992 11.6667H8.91325C8.81992 12.4367 8.74992 13.2067 8.74992 14C8.74992 14.7934 8.81992 15.5634 8.91325 16.3334M13.9999 4.70171C14.9683 6.10171 15.7499 7.66504 16.2283 9.33337H11.7716C12.2499 7.66504 13.0316 6.10171 13.9999 4.70171ZM22.0733 9.33337H18.6316C18.2583 7.87504 17.7216 6.47504 17.0216 5.18004C19.1683 5.91504 20.9533 7.39671 22.0733 9.33337ZM13.9999 2.33337C7.54825 2.33337 2.33325 7.58337 2.33325 14C2.33325 17.0942 3.56242 20.0617 5.75034 22.2496C6.83369 23.333 8.11981 24.1923 9.53528 24.7786C10.9507 25.3649 12.4678 25.6667 13.9999 25.6667C17.0941 25.6667 20.0616 24.4375 22.2495 22.2496C24.4374 20.0617 25.6666 17.0942 25.6666 14C25.6666 12.468 25.3648 10.9509 24.7785 9.5354C24.1922 8.11994 23.3328 6.83381 22.2495 5.75046C21.1661 4.66711 19.88 3.80775 18.4646 3.22145C17.0491 2.63514 15.532 2.33337 13.9999 2.33337Z" 
                        fill={activeBotNavButton === 'community' ? 'white' : 'gray'} />
                    </svg>
                }
            />}

            mypageButton=
            {<BotNavButton
                text='mypage'
                onClick={() => handleButtonClick('mypage')}
                isActive={activeBotNavButton === 'mypage'}
                Image={
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_112_2223)">
                            <path d="M14.0001 14C16.5784 14 18.6667 11.9116 18.6667 9.33329C18.6667 6.75496 16.5784 4.66663 14.0001 4.66663C11.4217 4.66663 9.33341 6.75496 9.33341 9.33329C9.33341 11.9116 11.4217 14 14.0001 14ZM14.0001 16.3333C10.8851 16.3333 4.66675 17.8966 4.66675 21V22.1666C4.66675 22.8083 5.19175 23.3333 5.83341 23.3333H22.1667C22.8084 23.3333 23.3334 22.8083 23.3334 22.1666V21C23.3334 17.8966 17.1151 16.3333 14.0001 16.3333Z" 
                            fill={activeBotNavButton === 'mypage' ? 'white' : 'gray'} />
                        </g>
                        <defs>
                            <clipPath id="clip0_112_2223">
                                <rect width="28" height="28" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                }
            />}
        >

        </BotNav>

    );
}
