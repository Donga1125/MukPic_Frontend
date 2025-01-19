"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a valid keyword.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_ROOT_API;
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
          Authorization: token,
        },
        body: JSON.stringify({ keyword: searchQuery }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch search results.");
      }

      router.push(`/keyword?query=${encodeURIComponent(searchQuery)}`);
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
