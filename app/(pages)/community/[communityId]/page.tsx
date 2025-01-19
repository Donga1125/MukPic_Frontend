'use client';

import { SvgButtonForNav } from '@/app/components/button';
import { FoodCategoryBadge, ViewAiResearchButton } from '@/app/components/community/communityComponents';
import TopNav from '@/app/components/TopNav';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// 게시글 상세 페이지
export default function BoardDetail() {
    const router = useRouter();
    const pathname = usePathname() as string;
    const [communityId, setCommunityId] = useState<string | null>(null);

    useEffect(() => {
        if (pathname) {
            // pathname에서 communityId 추출 (modify를 포함한 경로도 처리)
            const match = pathname.match(/\/community\/([^/]+)/);
            if (match) {
                setCommunityId(match[1]); // communityId 추출
            }
        }
    }, [pathname]);

    // 타입 정의
    type CommunityPost = {
        communityKey: string;
        title: string;
        content: string;
        imageUrls: string[];
        likeCount: number;
    };

    // 상태 정의
    const [post, setPost] = useState<CommunityPost | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // 수정 버튼 클릭 시
    function ModifyHandler() {
        // 수정 페이지로 이동
        router.push(`/community/${communityId}/modify`);
    }

    function DeleteHandler() {
        const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
        if (isConfirmed) {
            axios({
                method: 'delete',
                url: `${process.env.NEXT_PUBLIC_ROOT_API}/community/${communityId}`,
                headers: {
                    Authorization: `${localStorage.getItem('Authorization')}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    alert('삭제되었습니다.');
                    router.push('/community');
                }
            }).catch((error) => {
                console.error('게시글 삭제 api 에러: ', error);
            })
        }
    }


    // 컴포넌트 마운트 후 데이터 불러오기
    useEffect(() => {
        if (communityId)
            axios.get(`${process.env.NEXT_PUBLIC_ROOT_API}/community/${communityId}`)
                .then((response) => {
                    setPost(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('게시글 상세정보 조회 api 에러러: ', error);
                });
    }, [communityId]); // communityId가 변경될 때마다 호출

    // 로딩 상태와 에러 처리
    if (loading) return <div>Loading...</div>;

    return (
        <>
            <TopNav
                leftButton={<SvgButtonForNav >
                    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_112_3051)">
                            <path d="M19.6934 3.36002C19.1217 2.78836 18.2 2.78836 17.6284 3.36002L7.81671 13.1717C7.36171 13.6267 7.36171 14.3617 7.81671 14.8167L17.6284 24.6284C18.2 25.2 19.1217 25.2 19.6934 24.6284C20.265 24.0567 20.265 23.135 19.6934 22.5634L11.13 14L19.705 5.42502C20.265 4.85336 20.265 3.93169 19.6934 3.36002Z" fill="black" />
                        </g>
                        <defs>
                            <clipPath id="clip0_112_3051">
                                <rect width="28" height="28" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </SvgButtonForNav>}
            />
            {/* 메인 */}
            <div className="main-container flex-1 bg-white rounded-lg shadow-md">
                <div className='post-component-wrapper'>
                    <div className='post-contents-wrapper self-center gap-2'
                    >
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
                            <ViewAiResearchButton></ViewAiResearchButton>
                        </div>
                        <div className='post-contents-wrapper-row'>
                            {/* 음식 카테고리 뱃지 입력받아서 넣기 */}
                            <div className='post-contents-left'>
                                <div className='flex-row flex gap-2 justify-between'>
                                    <FoodCategoryBadge>snacks</FoodCategoryBadge>
                                </div>
                                {/* 컨텐츠 제목 */}
                                <div>
                                    <span className='post-content-text'>{post?.title}</span>
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
                            <div className='post-contents-right'>
                                {/* 좋아요 수 */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                    <circle cx="18" cy="18" r="18" fill="#E0E4EB" />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M3.33334 5.99996V14H0.666672V5.99996H3.33334ZM6.00001 14C5.64638 14 5.30724 13.8595 5.0572 13.6094C4.80715 13.3594 4.66667 13.0202 4.66667 12.6666V5.99996C4.66667 5.63329 4.81334 5.29996 5.06001 5.05996L9.44667 0.666626L10.1533 1.37329C10.3333 1.55329 10.4467 1.79996 10.4467 2.07329L10.4267 2.28663L9.79334 5.33329H14C14.74 5.33329 15.3333 5.93329 15.3333 6.66663V7.99996C15.3333 8.17329 15.3 8.33329 15.24 8.48663L13.2267 13.1866C13.0267 13.6666 12.5533 14 12 14H6.00001ZM6.00001 12.6666H12.02L14 7.99996V6.66663H8.14001L8.89334 3.11996L6.00001 6.01996V12.6666Z" fill="#92A2B9" />
                                    </svg>
                                </svg>
                                <span className='like-text'>{post?.likeCount}</span>
                            </div>
                        </div>
                        {/* 내용 부분 */}
                        <div className='post-content-text'>{post?.content}</div>
                    </div>
                </div>
            </div>
            {/* 임시 수정, 삭제 버튼튼 */}
            <button
                className='text-and-icon-button flex gap-2 items-center justify-center'
                onClick={ModifyHandler}>
                <span className='nav-text-button'>Modify</span>
            </button>
            <button onClick={DeleteHandler}>Temp Delete</button>
        </>
    );
}

