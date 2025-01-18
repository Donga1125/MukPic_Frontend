"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const router = useRouter();
  const imageUrl = searchParams.get("imageUrl"); // URL에서 imageUrl 가져오기
  const [response, setResponse] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      if (!imageUrl) {
        setError("Error: No image URL provided.");
        return;
      }

      // 로컬스토리지에서 Authorization 값 가져오기
      const token = localStorage.getItem("Authorization");

      setLoading(true); // 로딩 시작
      try {
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_ROOT_API}/url/analyze`,
          { imageUrl },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setResponse(result.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchData();
  }, [imageUrl]);

  const handleConfirmClick = () => {
    router.push("/"); // 메인페이지로 이동
  };

  const handlePostClick = () => {
    if (imageUrl) {
      router.push(`/community/post?imageUrl=${encodeURIComponent(imageUrl)}`); // 글쓰기 페이지로 이동, imageUrl 포함
    } else {
      setError("Error: Unable to proceed without image URL.");
    }
  };

  if (!imageUrl) {
    return (
      <main className="w-full bg-white px-4 py-6 text-center">
        <p className="text-red-500">Error: No image URL provided.</p>
      </main>
    );
  }

  return (
    <main className="w-full bg-white px-4 py-6">
      {loading && ( // 로딩 중 스피너 표시
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
        </div>
      )}

      {!loading && error && ( // 에러 화면
        <div className="text-red-500 text-center">
          <p>Error: {error}</p>
        </div>
      )}

      {!loading && response && ( // 데이터 로딩 완료 후 화면
        <section className="max-w-3xl mx-auto">
          {/* 이미지 */}
          <img
            src={imageUrl}
            alt={response.foodName}
            className="w-full h-72 object-cover rounded-md mb-4"
          />

          {/* 음식 이름 */}
          <div className="text-center border-b-2 border-gray-300 pb-4">
            <h2 className="text-2xl font-extrabold text-gray-800">
              {response.foodName}
            </h2>
            <p className="text-sm text-gray-500">{response.engFoodName}</p>
          </div>

          {/* 음식 설명 */}
          <p className="text-gray-700 mt-4 leading-relaxed">
            {response.foodDescription}
          </p>

          {/* 알러지 정보 */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
              Allergy Information
            </h3>
            <p className="text-gray-700 mt-2">{response.allergyInformation}</p>
          </div>

          {/* 재료 */}
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

          {/* 레시피 */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
              Recipes
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {response.recipe.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>

          {/* 확인 버튼 및 글쓰기 버튼 */}
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
      )}

      {!loading && !response && !error && ( // 데이터 없음 화면
        <div className="text-center">
          <p>Loading or no data available...</p>
        </div>
      )}
    </main>
  );
}
