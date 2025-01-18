'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>(""); // 검색어 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const router = useRouter();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a valid keyword.");
      return;
    }

    setLoading(true);
    setError(null);

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

      // API 호출
      const response = await fetch(`${apiUrl}/search/info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // 인증 토큰 추가
        },
        body: JSON.stringify({ keyword: searchQuery }),
      });

      if (!response.ok) throw new Error("Failed to fetch search results.");

      const data = await response.json();

      // 데이터를 전달하며 `/keyword` 페이지로 이동
      router.push(`/keyword?query=${encodeURIComponent(searchQuery)}`);
    } catch (err: any) {
      setError(err.message || "An error occurred during the search.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Search</h1>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search keyword..."
          className="flex-1 border border-gray-300 p-2 rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </main>
  );
}
