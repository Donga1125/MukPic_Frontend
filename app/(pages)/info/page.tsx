"use client";

import axios, { AxiosError } from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export const dynamic = "force-dynamic"; // 동적 렌더링 강제 설정

interface AnalysisResult {
  foodName: string;
  engFoodName: string;
  foodDescription: string;
  ingredients: string[];
  recipe: string[];
  allergyInformation: string;
}

export default function InfoPage() {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("imageUrl"); // 쿼리 파라미터에서 이미지 URL 가져오기
  const router = useRouter();
  const [response, setResponse] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // 데이터 가져오는 함수
    const fetchData = async () => {
      if (!imageUrl) {
        setError("Error: No image URL provided.");
        return;
      }

      const token = localStorage.getItem("Authorization"); // 로컬 스토리지에서 토큰 가져오기
      setLoading(true);

      try {
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_ROOT_API}/url/analyze`,
          { imageUrl }, // 요청 본문에 imageUrl 포함
          {
            headers: {
              Authorization: token || "", // 토큰 설정
            },
          }
        );
        setResponse(result.data); // 결과 데이터 상태에 저장
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.error || "Something went wrong");
        } else if (error instanceof Error) {
          setError(error.message || "An unexpected error occurred");
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [imageUrl]);

  const handleConfirmClick = () => {
    router.push("/"); // 메인 페이지로 이동
  };

  const handlePostClick = () => {
    if (imageUrl) {
      router.push(`/community/post`); // 커뮤니티 게시글 작성 페이지로 이동
    } else {
      setError("Error: Unable to proceed without image URL.");
    }
  };

  if (!imageUrl) {
    // 이미지 URL이 없는 경우 에러 표시
    return (
      <main className="w-full bg-white px-4 py-6 text-center">
        <p className="text-red-500">Error: No image URL provided.</p>
      </main>
    );
  }

  if (loading) {
    // 로딩 상태 표시
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    );
  }

  if (error) {
    // 에러 상태 표시
    return (
      <div className="text-red-500 text-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (response) {
    // API 결과 표시
    return (
      <main className="w-full bg-white px-4 py-6">
        <section className="max-w-3xl mx-auto">
          <Image
            src={imageUrl}
            alt={response.foodName}
            width={800}
            height={300}
            className="object-cover rounded-md mb-4"
          />

          <div className="text-center border-b-2 border-gray-300 pb-4">
            <h2 className="text-2xl font-extrabold text-gray-800">
              {response.foodName}
            </h2>
            <p className="text-sm text-gray-500">{response.engFoodName}</p>
          </div>

          <p className="text-gray-700 mt-4 leading-relaxed">
            {response.foodDescription}
          </p>

          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
              Allergy Information
            </h3>
            <p className="text-gray-700 mt-2">{response.allergyInformation}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
              Ingredients
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {response.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
              Recipe
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {response.recipe.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button
              className="px-6 py-3 bg-blue-500 text-white font-bold rounded-md"
              onClick={handleConfirmClick}
            >
              OK
            </button>
            <button
              className="px-6 py-3 bg-green-500 text-white font-bold rounded-md"
              onClick={handlePostClick}
            >
              POST
            </button>
          </div>
        </section>
      </main>
    );
  }

  return null; // 기본 반환값
}
