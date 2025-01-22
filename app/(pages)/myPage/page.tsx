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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M14.2446 23.9584H9.75534C9.45606 23.9584 9.19668 23.8588 8.9772 23.6595C8.75773 23.4601 8.62804 23.211 8.58813 22.9121L8.22899 20.1317C7.96961 20.0321 7.72539 19.9125 7.49634 19.773C7.26649 19.6335 7.04183 19.484 6.82235 19.3246L4.21857 20.4008C3.93924 20.5005 3.65991 20.5104 3.38058 20.4307C3.10124 20.351 2.88177 20.1816 2.72215 19.9225L0.507442 16.0659C0.347824 15.8068 0.297943 15.5278 0.3578 15.2288C0.417657 14.9299 0.567299 14.6907 0.806727 14.5113L3.05136 12.8073C3.03141 12.6678 3.02143 12.533 3.02143 12.4031V11.5959C3.02143 11.4667 3.03141 11.3324 3.05136 11.1929L0.806727 9.48883C0.567299 9.30946 0.417657 9.07029 0.3578 8.77133C0.297943 8.47237 0.347824 8.19335 0.507442 7.93425L2.72215 4.07769C2.86182 3.79866 3.0761 3.62407 3.36501 3.55391C3.65472 3.48455 3.93924 3.4997 4.21857 3.59935L6.82235 4.6756C7.04183 4.51616 7.27128 4.36668 7.51071 4.22716C7.75013 4.08765 7.98956 3.96807 8.22899 3.86841L8.58813 1.0881C8.62804 0.789144 8.75773 0.540012 8.9772 0.340706C9.19668 0.141401 9.45606 0.041748 9.75534 0.041748H14.2446C14.5439 0.041748 14.8033 0.141401 15.0228 0.340706C15.2422 0.540012 15.3719 0.789144 15.4118 1.0881L15.771 3.86841C16.0303 3.96807 16.275 4.08765 16.5048 4.22716C16.7339 4.36668 16.9581 4.51616 17.1776 4.6756L19.7814 3.59935C20.0607 3.4997 20.34 3.48973 20.6194 3.56946C20.8987 3.64918 21.1182 3.81859 21.2778 4.07769L23.4925 7.93425C23.6521 8.19335 23.702 8.47237 23.6422 8.77133C23.5823 9.07029 23.4327 9.30946 23.1932 9.48883L20.9486 11.1929C20.9685 11.3324 20.9785 11.4667 20.9785 11.5959V12.4031C20.9785 12.533 20.9586 12.6678 20.9187 12.8073L23.1633 14.5113C23.4027 14.6907 23.5524 14.9299 23.6122 15.2288C23.6721 15.5278 23.6222 15.8068 23.4626 16.0659L21.2479 19.8926C21.0883 20.1517 20.864 20.3263 20.5751 20.4164C20.2854 20.5056 20.0009 20.5005 19.7215 20.4008L17.1776 19.3246C16.9581 19.484 16.7287 19.6335 16.4893 19.773C16.2498 19.9125 16.0104 20.0321 15.771 20.1317L15.4118 22.9121C15.3719 23.211 15.2422 23.4601 15.0228 23.6595C14.8033 23.8588 14.5439 23.9584 14.2446 23.9584ZM12.0598 16.1855C13.2171 16.1855 14.2047 15.7769 15.0228 14.9598C15.8408 14.1426 16.2498 13.1561 16.2498 12.0001C16.2498 10.8441 15.8408 9.85755 15.0228 9.04039C14.2047 8.22324 13.2171 7.81466 12.0598 7.81466C10.8826 7.81466 9.88982 8.22324 9.08135 9.04039C8.27368 9.85755 7.86985 10.8441 7.86985 12.0001C7.86985 13.1561 8.27368 14.1426 9.08135 14.9598C9.88982 15.7769 10.8826 16.1855 12.0598 16.1855ZM12.0598 13.7938C11.561 13.7938 11.1372 13.6192 10.7885 13.2701C10.4389 12.9217 10.2641 12.4983 10.2641 12.0001C10.2641 11.5018 10.4389 11.0785 10.7885 10.7301C11.1372 10.3809 11.561 10.2063 12.0598 10.2063C12.5586 10.2063 12.9828 10.3809 13.3324 10.7301C13.6812 11.0785 13.8555 11.5018 13.8555 12.0001C13.8555 12.4983 13.6812 12.9217 13.3324 13.2701C12.9828 13.6192 12.5586 13.7938 12.0598 13.7938ZM10.8028 21.5667H13.1672L13.5862 18.3978C14.2047 18.2383 14.7785 18.004 15.3077 17.6946C15.836 17.3861 16.3197 17.0126 16.7586 16.5741L19.7215 17.7999L20.8887 15.767L18.3149 13.8237C18.4146 13.5447 18.4845 13.2505 18.5244 12.9412C18.5643 12.6327 18.5842 12.319 18.5842 12.0001C18.5842 11.6812 18.5643 11.3671 18.5244 11.0578C18.4845 10.7492 18.4146 10.4555 18.3149 10.1764L20.8887 8.23321L19.7215 6.20029L16.7586 7.45591C16.3197 6.99751 15.836 6.61365 15.3077 6.30433C14.7785 5.9958 14.2047 5.76182 13.5862 5.60237L13.1971 2.43341H10.8328L10.4138 5.60237C9.79525 5.76182 9.22182 5.9958 8.69348 6.30433C8.16434 6.61365 7.6803 6.98755 7.24135 7.42602L4.27843 6.20029L3.11122 8.23321L5.68507 10.1465C5.58531 10.4455 5.51547 10.7445 5.47557 11.0434C5.43567 11.3424 5.41571 11.6613 5.41571 12.0001C5.41571 12.319 5.43567 12.6279 5.47557 12.9269C5.51547 13.2258 5.58531 13.5248 5.68507 13.8237L3.11122 15.767L4.27843 17.7999L7.24135 16.5442C7.6803 17.0027 8.16434 17.3861 8.69348 17.6946C9.22182 18.004 9.79525 18.2383 10.4138 18.3978L10.8028 21.5667Z" fill="#1E252F"/>
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
