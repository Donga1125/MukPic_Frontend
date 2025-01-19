'use client';
import { SvgButtonForNav } from "@/app/components/button";
import { Write } from "@/app/components/community/postComponents";
import TopNav from "@/app/components/TopNav";
import { usePostStore } from "@/app/types/postStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Post() {
    const router = useRouter();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const title = usePostStore((state) => state.title);
    const content = usePostStore((state) => state.content);
    const images = usePostStore((state) => state.images);
    const category = usePostStore((state) => state.category);

    const UploadHandler = () => {


        //이미지 등록 포스트 요청
        if (images.length != 0 && category != '' && title != '' && content != '') {
            axios({
                method: 'post',
                url: `${process.env.NEXT_PUBLIC_ROOT_API}/images/upload`,
                data: {
                    file: images,
                    type: 'COMMUNITY',
                }
            }).then((resposne) => {
                setImageUrls(resposne.data);
            }).catch((error) => {
                alert('Image Upload Error');
                console.log(error);
            });

            // 글 등록 포스트 요청
            axios({
                method: 'post',
                url: `${process.env.NEXT_PUBLIC_ROOT_API}/community`,
                headers: {
                    // 헤더 토큰 추가
                    Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
                },
                data: {
                    title: title,
                    content: content,
                    imageUrl: imageUrls,
                    category: category,
                }
            }).then((response) => {
                if (response.status === 200) {
                    alert('Upload Success');
                    router.push('/community');
                }
            }).catch((error) => {
                alert('Upload Error');
                console.log(error);
                router.push('/community');
            });
        }
        // 작성 안하고 등록할 경우
        else {
            alert('Please fill in all the blanks');
        }
    }

    return (
        <>
            <TopNav
                leftButton={
                    <SvgButtonForNav>
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