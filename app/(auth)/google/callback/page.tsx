'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

const GoogleCallback = () => {
    const searchParams = useSearchParams(); // Next.js의 useSearchParams
    const router = useRouter(); // Next.js의 useRouter
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const code = searchParams.get('code'); // 'code' 파라미터 추출

        if (code) {
            const getToken = async () => {
                try {
                    const response = await axios.post('/api/get-google-token', { code });
                    if (response.data.accessToken) {
                        setAccessToken(response.data.accessToken);
                        localStorage.setItem('access_token', response.data.accessToken);
                        router.push('/dashboard');
                    }
                } catch (error) {
                    console.error('Error fetching the access token', error);
                }
            };

            getToken();
        }
    }, [searchParams, router]);

    return <div>Loading...</div>;
};

const SuspendedGoogleCallback = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <GoogleCallback />
    </Suspense>
);

export default SuspendedGoogleCallback;

