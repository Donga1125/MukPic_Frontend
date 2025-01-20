
'use client';
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

// 동적 페이지 설정
export const dynamic = "force-dynamic";

const KeywordPageContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [response, setResponse] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_ROOT_API;
        const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

        if (!apiUrl) {
          throw new Error("API URL is not defined.");
        }

        const response = await fetch(`${apiUrl}search/info`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

  if (loading) {
    return (
      <div className="text-center mt-4">
        <p className="text-blue-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-4">
        <p>{error}</p>
      </div>
    );
  }

  if (response) {
    return (
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

      </section>
    );
  }

  return null;

};

export default function KeywordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KeywordPageContent />
    </Suspense>

  );
}