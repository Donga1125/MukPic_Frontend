'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const GoogleCallback = () => {
    const searchParams = useSearchParams();  // Next.js의 useSearchParams
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const code = searchParams.get('code');  // 'code' 파라미터 추출

        if (code) {
            const getToken = async () => {
                try {
                    const response = await axios.post('/api/get-google-token', { code });
                    if (response.data.accessToken) {
                        localStorage.setItem('access_token', response.data.accessToken);
                        router.push('/');
                    }
                } catch (error) {
                    console.error('Error fetching the access token', error);
                }
            };

            getToken();
        }
    }, [isClient, searchParams, router]);

    if (!isClient) return null;

    return <div>Loading...</div>;
};

export default GoogleCallback;
