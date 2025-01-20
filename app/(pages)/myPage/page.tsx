'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled, { createGlobalStyle } from 'styled-components';
import { AddBotNav } from "@/app/components/BotNav";

const GlobalStyle = createGlobalStyle`
  html, body {
    background-color: #ffffff;
    width: 100%;
    height: 100%;
  }
`;

interface UserInfoData {
  image: string;
  userName: string;
  nationality: string;
  religion: string;
  allergies: string[];
  chronicDiseases: string[];
  dietaryPreferences: string[];
}

interface PostData {
  communityKey: string;
  title: string; 
  content: string;
  imageUrls: string[]; 
}

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfoData | null>(null);
  const [activeTab, setActiveTab] = useState<'liked' | 'myPost'>('liked');
  const [postData, setPostData] = useState<PostData[]>([]);
  const router = useRouter();

  // 토큰 가져오기 함수
  const getAuthToken = () => {
    const token = localStorage.getItem('Authorization');
    if (!token) {
      console.error('Authorization token not found');
    }
    return token;
  };

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = getAuthToken();
      if (!token) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/users/myinfo`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          console.error('Failed to fetch user info:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  // 게시글 정보 가져오기
  useEffect(() => {
    const fetchPostData = async () => {
      const token = getAuthToken();
      if (!token) return;

      const endpoint =
        activeTab === 'liked'
          ? `${process.env.NEXT_PUBLIC_ROOT_API}/community/likedCommunities?page=0&size=5`
          : `${process.env.NEXT_PUBLIC_ROOT_API}/community/myCommunities?page=0&size=5`;

      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPostData(data.content || []);
        } else {
          console.error('Failed to fetch posts:', response.status);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPostData();
  }, [activeTab]);

  return (
    <>
      <GlobalStyle />
      <Container>
        <CustomHeader>
          <Title>My Page</Title>
          <SettingsIcon onClick={() => router.push('/settings')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="..." fill="#1E252F" />
            </svg>
          </SettingsIcon>
        </CustomHeader>

        {/* 사용자 프로필 */}
        <ProfileSection>
          <Avatar style={{ backgroundImage: `url(${userInfo?.image})`}} />
          <UserInfo>
            <Username>{userInfo?.userName || 'Loading...'}</Username>
            <Location>{userInfo?.nationality || 'Loading...'}</Location>
            <Tags>
              {userInfo?.religion && <Tag color="#FFD700">{userInfo.religion}</Tag>}
            </Tags>
            <Tags>
              {userInfo?.allergies?.map((tag, index) => (
                <Tag key={index} color="#DFF2BF">{tag}</Tag>
              ))}
            </Tags>
            <Tags>
              {userInfo?.chronicDiseases?.map((tag, index) => (
                <Tag key={index} color="#F6c1ce">{tag}</Tag>
              ))}
            </Tags>
            <Tags>
              {userInfo?.dietaryPreferences?.map((tag, index) => (
                <Tag key={index} color="#CEDDF2">{tag}</Tag>
              ))}
            </Tags>
          </UserInfo>
        </ProfileSection>

        {/* 탭 */}
        <TabBar>
          <Tab isActive={activeTab === 'liked'} onClick={() => setActiveTab('liked')}>
            Liked
          </Tab>
          <Tab isActive={activeTab === 'myPost'} onClick={() => setActiveTab('myPost')}>
            My Post
          </Tab>
        </TabBar>

        {/* 게시글 목록 */}
        <PostsGrid>
          {postData.map((post) => (
            <PostCard key={post.communityKey}>
              <PostImage src={post.imageUrls[0]} alt={post.title} />
              <PostContent>
                <PostTitle>{post.title}</PostTitle>
                <PostDescription>{post.content}</PostDescription>
              </PostContent>
            </PostCard>
          ))}
        </PostsGrid>

        <AddBotNav />
      </Container>
    </>
  );
};

export default MyPage;


const Container = styled.div`
  margin: 0 auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  width: 24.375rem;
  height: 52.75rem;
  padding-top: 3.5rem;
`;

const CustomHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  position: fixed;
  top: 0;
  z-index: 10;
  width: 24.375rem;
  height: 3.5rem;
  flex-shrink: 0;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin: 0 auto;
  color: var(--Gray-gray-900, #0B0B0B);
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: SUIT;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const SettingsIcon = styled.div`
  cursor: pointer;
  position: absolute;
  right: 16px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #FFF;
  border-bottom: 1px solid #E0E5EB;
  width: 24.375rem;
  padding: 16px; 
  box-sizing: border-box;
  flex-wrap: wrap; 
`;

const Avatar = styled.div`
  width: 6.25rem;
  height: 6.25rem;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: #ccc;
  background-size: cover;
  background-position: center;
  margin-right: 16px;
`;

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Username = styled.div`
  color: var(--Gray-gray-900, #0B0B0B);
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: SUIT;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Location = styled.div`
  color: #6A7784;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: SUIT;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Tags = styled.div`
  display: inline-flex;
  flex-wrap: wrap; /* 태그가 많으면 줄 바꿈 */
  gap: 0.25rem;
  margin-top: 0.38px;
  padding: 0.38px 0.25px;
  align-items: center;
  color: #6A7784;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: SUIT;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  
`;

const Tag = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  padding: 0.125rem 0.75rem;
  border-radius: 3.125rem;
  border: 1px solid #1E252F;
  color: #1E252F;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: SUIT;
  font-size: 0.6875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const TabBar = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  padding: 1.5rem 0 1rem 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  width: 24.375rem;
  height: 3.75rem;
  flex-shrink: 0;
`;

const Tab = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  color: ${(props) => (props.isActive ? 'blue' : '#000')};
  border-bottom: ${(props) => (props.isActive ? '2px solid black' : 'none')};
  color: #0A0C10;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: SUIT;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  
`;


const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75px;
  padding: 16px;
  width: 24.375rem;
  height: 32.8125rem;
  flex-shrink: 0;
`;

const PostCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  border-radius: 0.5rem;
`;

// const TestImage = styled.img`
// width: 100%;
// height: 50%;
// flex-shrink: 0;
// border-radius: 0.5rem;
// `;

const PostTitle = styled.h3`
  font-size: 14px;
  margin: 8px;
`;

const PostDescription = styled.p`
  font-size: 12px;
  margin: 0 8px 8px;
`;

const PostContent = styled.div`
  padding: 8px;
`;

// const PostDetails = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-top: 8px;
// `;

// const Comments = styled.div`
//   font-size: 12px;
//   color: #555;
// `;

// const Likes = styled.div`
//   font-size: 12px;
//   color: #555;
// `;
