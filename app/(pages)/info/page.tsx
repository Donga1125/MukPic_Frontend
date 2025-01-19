'use client';

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface AnalysisResult {
  foodName: string;
  engFoodName: string;
  foodDescription: string;
  ingredients: string[];
  recipe: string[];
  allergyInformation: string;
}

// 동적 렌더링 설정
export const dynamic = "force-dynamic";

function InfoPageContent() {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("imageUrl");
  const [response, setResponse] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN || "";

  useEffect(() => {
    const fetchData = async () => {
      if (!imageUrl) {
        setError("Error: No image URL provided.");
        return;
      }

      setLoading(true);
      try {
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_ROOT_API}url/analyze`,
          { imageUrl },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResponse(result.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [imageUrl]);

  if (!imageUrl) {
    return (
      <main className="w-full bg-white px-4 py-6 text-center">
        <p className="text-red-500">Error: No image URL provided.</p>
      </main>
    );
  }

  return (
    <main className="w-full bg-white px-4 py-6">
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
        </div>
      )}

      {!loading && error && (
        <div className="text-red-500 text-center">
          <p>Error: {error}</p>
        </div>
      )}

      {!loading && response && (
        <section className="max-w-3xl mx-auto">
          <img
            src={imageUrl}
            alt={response.foodName}
            className="w-full h-72 object-cover rounded-md mb-4"
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
              Recipes
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {response.recipe.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {!loading && !response && !error && (
        <div className="text-center">
          <p>Loading or no data available...</p>
        </div>
      )}
    </main>
  );
}

export default function InfoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InfoPageContent />
    </Suspense>
  );
}
