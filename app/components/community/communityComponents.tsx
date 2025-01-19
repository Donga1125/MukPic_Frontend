'use client';
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import "@/app/globals.css";
import "@/app/(css)/community.css";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CommunityPost {
    communityKey: number;
    title: string;
    content: string;
    imageUrls: string[]; // 이미지 URL 배열
    likeCount: number;
}

interface Pageable {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

interface CommunityApiResponse {
    content: CommunityPost[]; // 게시글 배열
    pageable: Pageable; // 페이지 정보
    totalPages: number;
    totalElements: number;
    last: boolean; // 마지막 페이지 여부
    size: number; // 요청당 글 개수
    number: number; // 현재 페이지 번호
    sort: Sort; // 정렬 정보
    numberOfElements: number; // 현재 페이지에서 가져온 게시글 수
    first: boolean; // 첫 페이지 여부
    empty: boolean; // 게시글이 비어있는지 여부
}

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



export function ViewAiResearchButton() {
    return (
        <button className='view-ai-research-button'>
            <span className='view-ai-research-button-text'>View Ai Research <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clip-path="url(#clip0_113_5030)">
                    <path d="M12.9167 11.6667H12.2583L12.025 11.4417C13.025 10.275 13.5417 8.68337 13.2583 6.9917C12.8667 4.67503 10.9333 2.82503 8.6 2.5417C5.075 2.10837 2.10834 5.07503 2.54167 8.60003C2.825 10.9334 4.675 12.8667 6.99167 13.2584C8.68334 13.5417 10.275 13.025 11.4417 12.025L11.6667 12.2584V12.9167L15.2083 16.4584C15.55 16.8 16.1083 16.8 16.45 16.4584C16.7917 16.1167 16.7917 15.5584 16.45 15.2167L12.9167 11.6667ZM7.91667 11.6667C5.84167 11.6667 4.16667 9.9917 4.16667 7.9167C4.16667 5.8417 5.84167 4.1667 7.91667 4.1667C9.99167 4.1667 11.6667 5.8417 11.6667 7.9167C11.6667 9.9917 9.99167 11.6667 7.91667 11.6667Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_113_5030">
                        <rect width="20" height="20" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            </span>
        </button>
    )

}

export function FoodCategoryBadge({ children }: FoodCategoryBadgeProps) {
    return (
        <span className='food-category-badge food-category-badge-text'>
            {children}
        </span>
    );
}

// 마이데이터, 게시판에 게시글 리스트 보여주기용 컴포넌트



export function PostComponents() {
    const [posts, setPosts] = useState<CommunityPost[]>([]);
    // 임시방편으로 페이지를 -1로 설정해서 첫 페이지를 불러오게 함
    const [page, setPage] = useState<number>(-1);
    const [isLast, setIsLast] = useState<boolean>(false);
    const router=useRouter();

    // 감지할 마지막 요소 Ref
    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetchPosts = async () => {
        console.log('fetchPosts실행');
        if (isLast) return; // 로딩 중이거나 마지막 페이지면 요청하지 않음

        try {
            const response = await axios.get<CommunityApiResponse>(
                `${process.env.NEXT_PUBLIC_ROOT_API}/community`, {
                params: {
                    category: "RICE", // 카테고리 선택 (예: RICE, NOODLE)
                    sortBy: "latest", // 정렬 방식 (예: latest, popular)
                    page,
                    size: 3, // 한 번에 가져올 게시글 수
                },
                headers: {
                    Authorization: `${localStorage.getItem('Authorization')}`
                }
            });
            if (response.status === 200) {
                const { content, last } = response.data;
                setPosts((prevPosts) => [...prevPosts, ...content]); // 게시글 병합
                setIsLast(last); // 마지막 페이지 여부 업데이트
                console.log('게시글 목록을 불러왔습니다.');
            }
            else {
                console.log('게시글 목록을 불러오는데 실패했습니다.');
            }
        } catch (error) {
            console.error("데이터를 가져오는 중 오류가 발생했습니다: catch", error);
        }
    };

   

    // 초기 데이터 로드
    useEffect(() => {
        console.log('페이지 변경 : useEffect  fetchposts실행 page : ', page, '!isLast : ', !isLast);
        if(page === 0) return;
        fetchPosts();
    }, [page]);




    // Intersection Observer 설정 (마지막 요소 감지해서 스크롤 시 추가 데이터)
    // 일단 지금은 처음에는 2번 실행됨.. 
    useEffect(() => {
        if (isLast) return; // 마지막 페이지면 Intersection Observer 설정하지 않음

        console.log('useEffect  observer실행행');
        const observer = new IntersectionObserver(
            (entries) => {
                // 마지막 게시글이 반 정도 보이면 페이지 증가
                if (entries[0].isIntersecting) {
                    // 페이지 번호 증가
                    setPage((prevPage) => prevPage + 1);
                }
            },
            {
                root: null, // viewport를 기준으로 관찰
                rootMargin: "0px", // root와의 간격 설정
                threshold: 0.5, // 요소가 50% 이상 보일 때
            }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current); // 마지막 게시글 참조를 관찰
        }

        // Cleanup
        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current); // 관찰 해제
            }
        };
    }, [isLast]);


    return (
        <div className="post-component-wrapper" >
            {posts.map((post) => (
                <PostContent key={post.communityKey} post={post} />
            ))}

            {isLast && <p>no more post</p>}
            <div ref={observerRef} className="loading-placeholder h-1" />
        </div>
    );
}

export function PostContent({ post }: { post: CommunityPost }) {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    const handleImageLoad = () => {
        setImageLoaded(true); // 이미지가 정상적으로 로드되었음을 확인
    };


    const DetailPostHandler = () => {
        console.log('게시글 상세보기 페이지로 이동');
        //뒤로가기 시 제대로 작동 안하는 것 때문에 임시로 이렇게 해놓음
        location.href=`/community/${post.communityKey}`;
    }

    // 일단 좋아요 요청 보내는것만.
    const likeHandler = (event: React.MouseEvent) => {
        event.stopPropagation(); //부모요소 이벤트 방지(div 클릭시 상세 페이지로 이동하는 것 방지)
        axios({
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_ROOT_API}/community/like/${post.communityKey}/likes`,
            headers: {
                Authorization: `${localStorage.getItem('Authorization')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log('좋아요 성공');
            }
        }).catch((error) => {
            console.log('좋아요 실패', error);
        })

        // 좋아요 취소 요청
        // axios({
        //     method: 'delete',
        //     url: `${process.env.NEXT_PUBLIC_ROOT_API}/community/like/${post.communityKey}/likes`,
        //     headers: {
        //         Authorization: `${localStorage.getItem('Authorization')}`
        //     }
        // }).then((response) => {
        //     if(response.status === 200){
        //         console.log('좋아요 취소 성공');
        //     }
        // }).catch((error) => {
        //     console.log('좋아요 취소소 실패', error);
        // })
    }

    return (
        <div className='post-contents-wrapper self-center gap-2'
            onClick={DetailPostHandler}>
            {/* 프로필 부분 */}
            <div className='post-profile-wrapper mt-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="17.5" fill="#F1F3F6" stroke="#E0E4EB" />
                </svg>
                <span className='post-profile-text flex-none'>UserName</span>
            </div>
            {/* 이미지 부분 */}
            <div className='post-img-wrapper'>
                <img src={post.imageUrls[0]} alt="img_error" className="img"
                    onLoad={handleImageLoad}></img>
                {imageLoaded && <ViewAiResearchButton></ViewAiResearchButton>}
            </div>
            <div className='post-contents-wrapper-row'>
                {/* 음식 카테고리 뱃지 입력받아서 넣기 */}
                <div className='post-contents-left'>
                    <div className='flex-row flex gap-2 justify-between'>
                        <FoodCategoryBadge>snacks</FoodCategoryBadge>
                    </div>
                    {/* 컨텐츠 제목 */}
                    <div>
                        <span className='post-content-text'>{post.title}</span>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none"
                        onClick={likeHandler}
                        style={{ cursor: 'pointer' }}
                    >
                        <circle cx="18" cy="18" r="18" fill="#E0E4EB" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" x="10" y="10">
                            <path d="M3.33334 5.99996V14H0.666672V5.99996H3.33334ZM6.00001 14C5.64638 14 5.30724 13.8595 5.0572 13.6094C4.80715 13.3594 4.66667 13.0202 4.66667 12.6666V5.99996C4.66667 5.63329 4.81334 5.29996 5.06001 5.05996L9.44667 0.666626L10.1533 1.37329C10.3333 1.55329 10.4467 1.79996 10.4467 2.07329L10.4267 2.28663L9.79334 5.33329H14C14.74 5.33329 15.3333 5.93329 15.3333 6.66663V7.99996C15.3333 8.17329 15.3 8.33329 15.24 8.48663L13.2267 13.1866C13.0267 13.6666 12.5533 14 12 14H6.00001ZM6.00001 12.6666H12.02L14 7.99996V6.66663H8.14001L8.89334 3.11996L6.00001 6.01996V12.6666Z" fill="#92A2B9" />
                        </svg>
                    </svg>
                    <span className='like-text'>{post.likeCount}</span>
                </div>
            </div>
            {/* 내용 부분 */}
        </div>
    )
}