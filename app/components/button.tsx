import { ReactNode } from 'react';
import Link from 'next/link';

interface WideButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void; // 커스텀 onClick 추가
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}



export function WideButton({ children, href, onClick, className, type = 'button', disabled = false

}: WideButtonProps) {
    const handleClick = () => {
        if (onClick) {
            onClick(); // 부모에서 전달된 onClick 호출
        }
    };

    const buttonClasses = className ? `btn btn-wide ${className}` : 'btn btn-wide';

    if (disabled || !href) {
        return (
            <button
                className={buttonClasses} s
                onClick={handleClick}
                type={type}
                disabled={disabled}  // 비활성화 처리
            >
                {children}
            </button>
        );
    }

    if (href) {
        return (
            <Link href={href}>
                <button
                    className={buttonClasses}
                    type={type}
                    disabled={disabled}
                >
                    {children}
                </button>
            </Link>
        );
    }

    return (
        <button
            className={buttonClasses}
            onClick={handleClick}
            disabled={disabled} // 버튼 클릭 시 handleClick 호출
            type={type}
        >
            {children}
        </button>
    );
}
