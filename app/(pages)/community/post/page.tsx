'use client';
import { SvgButtonForNav } from "@/app/components/button";
import { Write } from "@/app/components/community/postComponents";
import TopNav from "@/app/components/TopNav";
import { usePostStore } from "@/app/types/postStore";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Post() {
    const router = useRouter();
    const title = usePostStore((state) => state.title);
    const content = usePostStore((state) => state.content);
    const images = usePostStore((state) => state.images);
    const category = usePostStore((state) => state.category);

    const UploadHandler = () => {

        // 이미지 등록 포스트 요청
        if (images.length !== 0 && category !== '' && title !== '' && content !== '') {
            // 이미지 업로드 요청을 각각 보내는 배열
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

            // 모든 이미지 업로드가 완료된 후 커뮤니티 게시글 등록
            Promise.all(uploadPromises)
                .then((uploadedImageUrlsArrays) => {
                    // uploadedImageUrlsArrays는 배열 안에 배열이 있을 수 있으므로, 이를 평평하게(flatten) 만듭니다
                    const uploadedImageUrls = [].concat(...uploadedImageUrlsArrays);
                    console.log('업로드된 이미지 URLs:', uploadedImageUrls);

                    const formData = { title, content, uploadedImageUrls, category };
                    console.log('formData:', formData);

                    // 게시글 등록 API 호출
                    axios({
                        method: 'post',
                        url: `${process.env.NEXT_PUBLIC_ROOT_API}/community`,
                        headers: {
                            Authorization: `${localStorage.getItem('Authorization')}`,
                        },
                        data: {
                            title: title,
                            content: content,
                            imageUrl: uploadedImageUrls, // 평평하게 만든 이미지 URL 배열
                            category: category,
                        }
                    }).then((response) => {
                        if (response.status === 200) {
                            alert('Upload Success');
                            location.href = '/community';
                        }
                    }).catch((error) => {
                        alert('Upload Error');
                        console.log('post upload error', error);
                        router.push('/community');
                    });
                })
                .catch((error) => {
                    alert('Image Upload Error');
                    console.log('image upload error', error);
                    router.push('/community');
                });
        }
        else {
            const missingFields = [];

            if (images.length === 0) {
                missingFields.push('image');
            }
            if (category === '') {
                missingFields.push('category');
            }
            if (title === '') {
                missingFields.push('title');
            }
            if (content === '') {
                missingFields.push('content');
            }

            if (missingFields.length > 0) {
                const message = `Please fill in the following fields - ${missingFields.join(', ')}`;
                alert(message);
            }
        }
    };

    return (
        <>
            <TopNav
                leftButton={
                    <SvgButtonForNav
                        onClick={() => { location.href = '/community'; }} >
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
                    onClick={UploadHandler}>
                    <span className='nav-text-button'>Upload</span>
                </button>}
            />
            <div className='community-container flex-1' style={{ background: '#F1F3F6' }}>
                <Write />
            </div>
        </>

    );
}   