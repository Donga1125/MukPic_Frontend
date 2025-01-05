import { ReactNode } from 'react';
import Link from 'next/link';

interface WideButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void; // 커스텀 onClick 추가
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

export function WideButton({ children, href, onClick, className, type = 'button' }: WideButtonProps) {
    const handleClick = () => {
        if (onClick) {
            onClick(); // 부모에서 전달된 onClick 호출
        }
    };

    const buttonClasses = className ? `btn btn-wide ${className}` : 'btn btn-wide';

    if (href) {
        return (
            <Link href={href}>
                <button
                    className={buttonClasses}
                    type={type}
                >
                    {children}
                </button>
            </Link>
        );
    }

    return (
        <button
            className={buttonClasses}
            onClick={handleClick} // 버튼 클릭 시 handleClick 호출
            type={type}
        >
            {children}
        </button>
    );
}
