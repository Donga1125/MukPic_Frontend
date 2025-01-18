'use client';
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

export default function KeywordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("query"); // URL에서 전달받은 데이터 가져오기
  const [response, setResponse] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setError("No query provided.");
      return;
    }

    setLoading(true);

    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_ROOT_API; // 환경 변수에서 API URL 가져오기
        // 로컬스토리지에서 Authorization 값 가져오기
        const token = localStorage.getItem("Authorization");

        if (!apiUrl) {
          throw new Error("API URL is not defined.");
        }

        if (!token) {
          throw new Error("Authorization token is missing. Please log in again.");
        }

        const response = await fetch(`${apiUrl}/search/info`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // 인증 토큰 추가
          },
          body: JSON.stringify({ keyword: query }),
        });

        if (!response.ok) throw new Error("Failed to fetch data.");

        const data = await response.json();
        setResponse(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleConfirmClick = () => {
    router.push("/"); // 메인페이지로 이동
  };

  return (
    <main className="w-full bg-white px-4 py-6 min-h-screen">
      {loading && (
        <div className="text-center mt-4">
          <p className="text-blue-500">Loading...</p>
        </div>
      )}

      {!loading && error && (
        <div className="text-center text-red-500 mt-4">
          <p>{error}</p>
        </div>
      )}

      {!loading && response && (
        <section className="max-w-3xl mx-auto">
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
              Recipes
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {response.recipe.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>

          {/* 확인 버튼 추가 */}
          <div className="mt-8 flex justify-center">
            <button
              className="px-6 py-3 bg-blue-500 text-white font-bold rounded-md"
              onClick={handleConfirmClick}
            >
              확인
            </button>
          </div>

        </section>
      )}
    </main>
  );
}
