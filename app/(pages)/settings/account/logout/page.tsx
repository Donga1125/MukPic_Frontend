'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LogoutPage = () => {
  const router = useRouter();

  const getAuthToken = () => {
    const token = localStorage.getItem('Authorization');
    if (!token) {
      console.error('Authorization token not found');
    }
    return token;
  };

  useEffect(() => {
    const handleLogout = async () => {
      const token = getAuthToken();
      if (!token) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/auth/logout`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`, 
          },
        });

        if (response.ok) {
          localStorage.removeItem('Authorization');

          // 로그인 페이지로 리다이렉트
          router.push('/login');
        } else {
          console.error('Failed to logout:', response.status);
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    handleLogout();
  }, [router]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
      }}
    >
      <h1>로그아웃 중입니다...</h1>
    </div>
  );
};

export default LogoutPage;
