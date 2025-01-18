'use client';
import { TextAndIconButton, TextLogoButtonForNav } from "@/app/components/button";
import { PostComponents } from "@/app/components/community/communityComponents";
import TopNav from "@/app/components/TopNav";
import '@/app/(css)/community.css';


export default function boardMain() {

    return (
        <>
            <div className='main container flex-1' style={{ background: '#F1F3F6' }}>

                <PostComponents></PostComponents>
                <PostComponents></PostComponents>
                <PostComponents></PostComponents>
                <PostComponents></PostComponents>
                <PostComponents></PostComponents>
            </div>

        </>
    );
}