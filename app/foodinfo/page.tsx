"use client";

import React, { useState } from "react";
import axiosInstance from "../axios";
import "./foodinfopage.css";

const FoodInfoPage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 응답 데이터를 JSON 형태로 변환
  const parseResponse = (responseText: string) => {
    const sections = responseText.split(/\n{2,}/); // 빈 줄로 구분
    const result: { [key: string]: string } = {};

    sections.forEach((section) => {
      const [key, ...valueParts] = section.split(":");
      if (key && valueParts.length > 0) {
        result[key.trim()] = valueParts.join(":").trim();
      }
    });

    return result;
  };

  const handleAnalyzeImage = async () => {
    if (!imageUrl.trim()) {
      setError("Please provide a valid image URL.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(
        "/images/analyze",
        { imageUrl },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYWFuMjMiLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzM2MTYwNTU0LCJleHAiOjE3MzYxNjQxNTR9.Y3hfq6B3f5Ysgdli4SawYA1nDB-YgCs_BY76SuOK3RA`,
          },
        }
      );

      const parsedResult = parseResponse(response.data);
      setResult(parsedResult); // JSON 형태로 저장
    } catch (err: any) {
      setError(err.response?.data?.error || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="food-info-page p-4 max-w-3xl mx-auto">
      {/* 이미지 업로드와 Analyze 버튼 숨기기 */}
      {!result && (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center">Food Info Analysis</h1>

          {/* Input Field */}
          <div className="image-uploader flex flex-col items-center mb-6">
            <input
              type="text"
              placeholder="Enter image URL..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border p-3 w-full max-w-md mb-4 rounded"
            />
            <button
              onClick={handleAnalyzeImage}
              disabled={loading}
              className={`bg-blue-500 text-white px-6 py-2 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}
        </>
      )}

      {/* 결과 표시 */}
      {result && (
        <div className="analysis-result bg-white p-6 rounded shadow-md space-y-6">
          {/* 이미지 표시 */}
          <div className="image-preview flex justify-center mb-6">
            <img
              src={imageUrl}
              alt="Analyzed food"
              className="max-w-full max-h-64 object-contain border p-2 rounded"
            />
          </div>

          {result["Food Name"] && (
            <div className="result-section">
              <h3 className="font-bold text-xl text-gray-800">Food Name</h3>
              <p className="text-lg text-gray-700">{result["Food Name"]}</p>
            </div>
          )}

          {result["Food Description"] && (
            <div className="result-section">
              <h3 className="font-bold text-xl text-gray-800">Food Description</h3>
              <p className="text-lg text-gray-700">{result["Food Description"]}</p>
            </div>
          )}

          {result["Ingredients"] && (
            <div className="result-section">
              <h3 className="font-bold text-xl text-gray-800">Ingredients</h3>
              <ul className="list-disc list-inside text-lg text-gray-700">
                {result["Ingredients"].split("\n").map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {result["Recipe"] && (
            <div className="result-section">
              <h3 className="font-bold text-xl text-gray-800">Recipe</h3>
              <ul className="list-disc list-inside text-lg text-gray-700">
                {result["Recipe"].split("\n").map((step: string, index: number) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          )}

          {result["Allergy Information"] && (
            <div className="result-section">
              <h3 className="font-bold text-xl text-gray-800">Allergy Information</h3>
              <p className="text-lg text-gray-700">{result["Allergy Information"]}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodInfoPage;
