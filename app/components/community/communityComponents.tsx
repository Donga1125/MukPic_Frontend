import { ReactNode } from "react";
import styles from '@/app/(css)/community.module.css';
import "@/app/globals.css";

type FoodCategoryBadgeProps = {
    children: ReactNode;
}

type TextAndIconButtonProps = {
    icon?: ReactNode;
    children?: ReactNode;
}
export function TextAndIconButton({ icon, children }: TextAndIconButtonProps) {
    return (
        <button className='text-and-icon-button flex gap-2 items-center justify-center'>
            {icon}
            <span className='nav-text-button'>{children}</span>
        </button>
    )

}

type ViewAiResearchButtonProps = {
    icon?: ReactNode;
    children?: ReactNode;
}

export function ViewAiResearchButton({ icon, children }: ViewAiResearchButtonProps) {
    return (
        <button className='view-ai-research-button flex gap-2 items-center '>
            <span className='view-ai-research-button-text'>{children}</span>
            {icon}
        </button>
    )

}

export function FoodCategoryBadge({ children }: FoodCategoryBadgeProps) {
    return (
        <span className={`${styles['food-category-badge']} food-category-badge-text`}>
            {children}
        </span>
    );
}

// 마이데이터, 게시판에 게시글 리스트 보여주기용 컴포넌트



export function PostComponents() {

    return (
        <div className="post-component-wrapper">
            <div className='post-contents-wrapper self-center gap-2'>
                {/* 프로필 부분 */}
                <div className='post-profile-wrapper mt-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <circle cx="18" cy="18" r="17.5" fill="#F1F3F6" stroke="#E0E4EB" />
                    </svg>
                    <span className='post-profile-text flex-none'>UserName</span>
                </div>
                {/* 이미지 부분 */}
                <div className='post-img-wrapper'>
                    <img src="/testImg/test-food.jpg" alt="img_error" className="img"></img>
                    <ViewAiResearchButton icon={
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.9167 9.6667H10.2583L10.025 9.4417C11.025 8.27503 11.5417 6.68337 11.2583 4.9917C10.8667 2.67503 8.93334 0.825033 6.6 0.5417C3.075 0.108366 0.108336 3.07503 0.541669 6.60003C0.825003 8.93337 2.675 10.8667 4.99167 11.2584C6.68334 11.5417 8.275 11.025 9.44167 10.025L9.66667 10.2584V10.9167L13.2083 14.4584C13.55 14.8 14.1083 14.8 14.45 14.4584C14.7917 14.1167 14.7917 13.5584 14.45 13.2167L10.9167 9.6667ZM5.91667 9.6667C3.84167 9.6667 2.16667 7.9917 2.16667 5.9167C2.16667 3.8417 3.84167 2.1667 5.91667 2.1667C7.99167 2.1667 9.66667 3.8417 9.66667 5.9167C9.66667 7.9917 7.99167 9.6667 5.91667 9.6667Z" fill="white" />
                        </svg>
                    }>
                        View Ai Reserch
                    </ViewAiResearchButton>
                </div>
                <PostContents />
                {/* 내용 부분 */}
            </div>
        </div>
    );
}

export function PostContents() {

    return (
        <div>
            {/* 음식 카테고리 뱃지 입력받아서 넣기 */}
            <div className='gap-[0.5rem]'>
                <div className='flex-row flex gap-2 justify-between'>
                    <FoodCategoryBadge>snacks</FoodCategoryBadge>

                    {/* 좋아요 수 */}
                    <span className={`${styles.baseFont} inline-flex align-middle gap-1`}><svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.33329 5.99996V14H0.666626V5.99996H3.33329ZM5.99996 14C5.64634 14 5.3072 13.8595 5.05715 13.6094C4.8071 13.3594 4.66663 13.0202 4.66663 12.6666V5.99996C4.66663 5.63329 4.81329 5.29996 5.05996 5.05996L9.44663 0.666626L10.1533 1.37329C10.3333 1.55329 10.4466 1.79996 10.4466 2.07329L10.4266 2.28663L9.79329 5.33329H14C14.74 5.33329 15.3333 5.93329 15.3333 6.66663V7.99996C15.3333 8.17329 15.3 8.33329 15.24 8.48663L13.2266 13.1866C13.0266 13.6666 12.5533 14 12 14H5.99996ZM5.99996 12.6666H12.02L14 7.99996V6.66663H8.13996L8.89329 3.11996L5.99996 6.01996V12.6666Z" fill="black" />
                    </svg> 12k</span>
                </div>
                <div>
                    <span className='post-content-text'>컨텐츠 제목 및 내용🥵🥵🥵 </span>
                </div>
                <div className='post-date-wrapper'>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.75 16.5C6.55109 16.5 6.36032 16.421 6.21967 16.2803C6.07902 16.1397 6 15.9489 6 15.75V13.5H3C2.60218 13.5 2.22064 13.342 1.93934 13.0607C1.65804 12.7794 1.5 12.3978 1.5 12V3C1.5 2.1675 2.175 1.5 3 1.5H15C15.3978 1.5 15.7794 1.65804 16.0607 1.93934C16.342 2.22064 16.5 2.60218 16.5 3V12C16.5 12.3978 16.342 12.7794 16.0607 13.0607C15.7794 13.342 15.3978 13.5 15 13.5H10.425L7.65 16.2825C7.5 16.425 7.3125 16.5 7.125 16.5H6.75ZM7.5 12V14.31L9.81 12H15V3H3V12H7.5Z" fill="#5A6E8C" />
                    </svg>
                    {/* 댓글 수 */}
                    <span className='comment-date-text'>12</span>

                    <svg xmlns="http://www.w3.org/2000/svg" width="1" height="14" viewBox="0 0 1 14" fill="none">
                        <path d="M1 0.5V13.5H0V0.5H1Z" fill="#5A6E8C" />
                    </svg>

                    {/* 몇분 전 등록했는지 등록시간 - 현재시간 */}
                    <span className="comment-date-text">9 days ago</span>
                </div>
            </div>

            <div>
                {/* 좋아요 부분 */}
            </div>

        </div>
    )
}