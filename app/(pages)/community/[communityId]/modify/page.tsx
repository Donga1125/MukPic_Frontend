'use client';
import { SvgButtonForNav } from "@/app/components/button";
import { Modify, Write } from "@/app/components/community/postComponents";
import TopNav from "@/app/components/TopNav";
import { usePostStore } from "@/app/types/postStore";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BoardDetail() {
    const router = useRouter();
    // 쿼리 파라미터 추출
    const pathname = usePathname() as string;
    const [communityId, setCommunityId] = useState<string | null>(null);

    // 파라미터에서 communityId 추출
    useEffect(() => {
        if (pathname) {
            const match = pathname.match(/\/community\/([^/]+)/);
            if (match) {
                setCommunityId(match[1]); // communityId 추출
            }
        }
    }, [pathname]);

    // zustand 사용해서 받아 온 값을 상태에 저장해준다음 수정할 때, 페이지에 보여줄 때 사용

    const title = usePostStore(state => state.title);
    const content = usePostStore(state => state.content);
    const images = usePostStore(state => state.images);
    const category = usePostStore(state => state.category);
    const imageUrls = usePostStore(state => state.imageUrls);
    const setTitle = usePostStore(state => state.setTitle);
    const setContent = usePostStore(state => state.setContent);
    // const setImages = usePostStore(state => state.setImages);
    const setCategory = usePostStore(state => state.setCategory);
    const setImageUrls = usePostStore(state => state.setImageUrls);
    const likeCount = usePostStore(state => state.likeCount);
    const setLikeCount = usePostStore(state => state.setLikeCount);


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
    function UpDateHandler() {
        if (title && content && category) {
            if (images.length > 0) {
                const uploadPromises = images.map((image) => {
                    const uploadFormData = new FormData();
                    uploadFormData.append("file", image);
                    uploadFormData.append("type", 'COMMUNITY');

                    return axios({
                        method: 'post',
                        url: `${process.env.NEXT_PUBLIC_ROOT_API}/images/upload`,
                        data: uploadFormData
                    }).then((response) => {
                        const imageUrl = response.data[0];
                        return imageUrl; // 서버에서 반환한 이미지 URL 배열
                    });
                });
                Promise.all(uploadPromises)
                    .then((uploadedImageUrlsArrays) => {
                        // uploadedImageUrlsArrays는 배열 안에 배열이 있을 수 있으므로, 이를 평평하게(flatten) 만듭니다
                        const flattenedImageUrls = [].concat(...uploadedImageUrlsArrays);
                        console.log('업로드된 이미지 URLs:', flattenedImageUrls);
                        let uploadedImageUrls: string[] = [];

                        if (imageUrls.length > 0) {
                            uploadedImageUrls = [...flattenedImageUrls, ...imageUrls]; // 기존 imageUrls와 결합
                        } else {
                            uploadedImageUrls = flattenedImageUrls; // 단독으로 flattenedImageUrls만 사용
                        }
                        console.log('업로드된 이미지 URLs:', imageUrls);
                        console.log('업로드된 이미지 URLs:', uploadedImageUrls);


                        // 게시글 등록 API 호출
                        axios({
                            method: 'patch',
                            url: `${process.env.NEXT_PUBLIC_ROOT_API}/community/${communityId}`,
                            data: {
                                communityKey: communityId,
                                title: title,
                                content: content,
                                imageUrls: uploadedImageUrls,
                                likecount: likeCount
                            },
                            headers: {
                                Authorization: `${localStorage.getItem('Authorization')}`
                            }
                        }).then((response) => {
                            if (response.status === 200) {
                                alert('Item successfully modified.');
                                router.push(`/community/${communityId}`);
                            }
                        }).catch((error) => {
                            console.error('게시글 수정 api 에러: ', error);
                        })
                    })

            }
        }
    }



    // 컴포넌트 마운트 후 데이터 불러오기
    useEffect(() => {

        if (communityId) {
            console.log('use effect 작동 체크 communityId: ', communityId);
            axios.get(`${process.env.NEXT_PUBLIC_ROOT_API}/community/${communityId}`,
                {
                    headers:
                    {
                        Authorization: `${localStorage.getItem('Authorization')}`
                    }
                }
            )
                .then((response) => {
                    if (response.status === 200) {
                        setPost(response.data);
                        // 정보 불러오면서 상태 업데이트
                        setTitle(response.data.title);
                        setContent(response.data.content);
                        setImageUrls(response.data.imageUrls);
                        setCategory(''); // 카테고리 정보는 없음
                        setLikeCount(response.data.likeCount);
                        setLoading(false);
                    }
                    if (response.status === 401) {
                        alert('You do not have permission to view this.');
                        router.push('/community');
                    }
                })
                .catch((error) => {
                    alert('You do not have permission to view this.');
                    router.push(`/community/${communityId}`);
                    console.error('게시글 상세정보 조회 api 에러: ', error);
                });
        }

    }, [communityId, setTitle, setCategory, setContent, setImageUrls, setLikeCount, router]); // communityId가 변경될 때마다 호출

    // 로딩 상태와 에러 처리
    if (loading) return <div>Loading...</div>;

    return (
        <>
            <TopNav
                leftButton={
                    <SvgButtonForNav
                        onClick={() => { router.back(); }}>
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
                    </SvgButtonForNav>
                }
                rightButton={<button
                    className='text-and-icon-button flex gap-2 items-center justify-center'
                    onClick={UpDateHandler}>
                    <span className='nav-text-button'>Update</span>
                </button>}
            />
            <div className='community-container flex-1' style={{ background: '#F1F3F6' }}>
                <Modify />
            </div>
        </>

    );
}   