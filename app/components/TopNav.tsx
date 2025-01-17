import { ReactNode } from "react";

type TopNavProps = {
    leftButton?: ReactNode;
    centerButton?: ReactNode;
    rightButton?: ReactNode;
};




export default function TopNav({ leftButton, centerButton, rightButton }: TopNavProps) {

    return (
        //요소 구분하기 위해 일부러 테두리 넣어놓음 (border border-lime-400 border-2)
        //z-index 중간인 z-25
        <div className="sticky top-0 root-topNav navbar justify-between px-[3%] z-50">
            {/* 좌측 버튼 */}
            {leftButton && (
                <div className="flex-none">
                    {leftButton}
                </div>
            )}

            {/* 중앙 버튼 */}
            {centerButton && (
                <div className="flex-1 flex justify-center items-center">
                    {centerButton}
                </div>
            )}

            {/* 우측 버튼 */}
            {rightButton && (
                <div className="flex-none">
                    {rightButton}
                </div>
            )}
        </div>

    );
}

