"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function MainPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Top picks");
  const router = useRouter();

  const categories = ["Top picks", "Rice", "Noodle", "Snacks", "Cafe"];

  const foodData: Record<string, string[]> = {
    "Top picks": [
      "Dakgalbi",
      "Fried Chicken",
      "Bibimbap",
      "Tteokbokki",
      "Bulgogi",
      "Kimchi Stew",
      "Samgyeopsal",
      "Japchae",
    ],
    Rice: [
      "Kimchi Fried Rice",
      "Bibimbap",
      "Bulgogi Rice",
      "Gukbap",
      "Soy Sauce Egg Rice",
      "Albap",
      "Omurice",
      "Gimbap",
    ],
    Noodle: [
      "Jajangmyeon",
      "Kalguksu",
      "Jjamppong",
      "Naengmyeon",
      "Mak Guksu",
      "Spicy Cold Noodles",
      "Bulgogi Noodles",
      "Soybean Noodle",
    ],
    Snacks: [
      "Hotteok",
      "Tteokbokki",
      "Corn Dog",
      "Injeolmi",
      "Fish Cake Skewers",
      "Sweet Potato Fries",
      "Songpyeon",
      "Gamja Jeon",
    ],
    Cafe: [
      "Espresso",
      "Cappuccino",
      "Bingsu",
      "Macaron",
      "Iced Americano",
      "Matcha Latte",
      "Affogato",
      "Cheesecake",
    ],
  };

  const foodImages: Record<string, string> = {
    Dakgalbi: "/images/Dakgalbi.jpg",
    "Fried Chicken": "/images/Fried Chicken.jpg",
    Tteokbokki: "/images/Tteokbokki.jpeg",
    Bulgogi: "/images/Bulgogi.jpg",
    "Kimchi Stew": "/images/kimchi Stew.jpg",
    Samgyeopsal: "/images/Samgyeopsal.jpg",
    Japchae: "/images/Japchae.jpg",
    "Kimchi Fried Rice": "/images/Kimchi Fried Rice.jpg",
    Bibimbap: "/images/Bibimbap.jpg",
    "Bulgogi Rice": "/images/Bulgogi Rice.jpg",
    Gukbap: "/images/Gukbap.jpg",
    "Soy Sauce Egg Rice": "/images/Soy Sauce Egg Rice.jpg",
    Albap: "/images/Albap.jpg",
    Omurice: "/images/Omurice.jpg",
    Gimbap: "/images/Gimbap.jpg",
    Jajangmyeon: "/images/Jajangmyeon.jpeg",
    Kalguksu: "/images/Kalguksu.jpeg",
    Jjamppong: "/images/Jjamppong.jpeg",
    Naengmyeon: "/images/Naengmyeon.jpg",
    "Mak Guksu": "/images/Mak Guksu.jpg",
    "Spicy Cold Noodles": "/images/Spicy Cold Noodles.jpg",
    "Bulgogi Noodles": "/images/Bulgogi Noodles.jpg",
    "Soybean Noodle": "/images/Soybean Noodle.jpg",
    Hotteok: "/images/Hotteok.jpg",
    "Corn Dog": "/images/Corn Dog.jpg",
    "Fish Cake Skewers": "/images/Fish Cake Skewers.jpg",
    "Sweet Potato Fries": "/images/Sweet Potato Fries.jpeg",
    "Songpyeon": "/images/Songpyeon.jpg",
    "Injeolmi": "/images/Injeolmi.jpg",
    "Gamja Jeon": "/images/Gamja Jeon.jpg",
    Espresso: "/images/Espresso.jpg",
    Cappuccino: "/images/Cappuccino.jpg",
    Bingsu: "/images/Bingsu.jpg",
    Macaron: "/images/Macaron.jpg",
    "Iced Americano": "/images/Iced Americano.jpeg",
    "Matcha Latte": "/images/Matcha Latte.jpg",
    Affogato: "/images/Affogato.jpg",
    Cheesecake: "/images/Cheesecake.jpg",
  };

  const handleFoodClick = (food: string) => {
    router.push(`/keyword?query=${encodeURIComponent(food)}`);
  };

  useEffect(() => {
    const token = localStorage.getItem("Authorization");

    if (!token) {
      console.error("Access Token is missing. Redirecting to login...");
      setError("Access Token is missing. Please log in again.");
      router.push("/login");
    }
  }, [router]);

  const handleSnapClick = async () => {
    try {
      setLoading(true);
      setError(null);

      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.click();

      fileInput.onchange = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (!file) return;

        const imageTypeMapping: Record<string, string> = {
          "Top picks": "COMMUNITY",
          Bap: "COMMUNITY",
          Myeon: "COMMUNITY",
          Snacks: "COMMUNITY",
          Cafe: "COMMUNITY",
        };

        const imageType = imageTypeMapping[selectedCategory] || "COMMUNITY";

        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("type", imageType);

        const apiUrl = process.env.NEXT_PUBLIC_ROOT_API;

        try {
          const uploadResponse = await fetch(`${apiUrl}/images/upload`, {
            method: "POST",
            body: uploadFormData,
          });

          if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json();
            throw new Error(errorData.message || "Image upload failed.");
          }

          const uploadedUrls: string[] = await uploadResponse.json();
          const imageUrl = uploadedUrls[0];
          router.push(`/info?imageUrl=${encodeURIComponent(imageUrl)}`);
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message || "An unexpected error occurred.");
          } else {
            setError("An unknown error occurred.");
          }
        }
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "An unexpected error occurred.");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mukpic-main-container bg-gray-50 min-h-[calc(100vh-50px)] px-4 py-6 shadow-lg">
      <section className="flex justify-between items-center mb-6">
        <div className="flex-1 bg-black text-white rounded-3xl p-6 mr-4 flex flex-col items-center justify-center shadow-md">
          <p className="text-lg font-bold mb-2">Discover by Photo</p>
          <button
            className="bg-white text-black font-semibold px-4 py-2 rounded-md"
            onClick={handleSnapClick}
            disabled={loading}
          >
            {loading ? "Processing..." : "Snap"}
          </button>
        </div>
        <div className="flex-1 border border-gray-300 rounded-3xl p-6 flex flex-col items-center justify-center shadow-md">
          <p className="text-lg font-bold mb-2">Create a Post</p>
          <button
            className="bg-black text-white font-semibold px-4 py-2 rounded-md"
            onClick={() => router.push("/community")}
          >
            Post
          </button>
        </div>
      </section>

      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Categories</h2>
        </div>
        <div className="flex overflow-x-scroll space-x-3 pb-2">
          {categories.map((category, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <div className="grid grid-cols-4 gap-x-4 gap-y-6">
          {foodData[selectedCategory]?.map((food, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center cursor-pointer"
              style={{
                width: "4rem",
                height: "5rem",
              }}
              onClick={() => handleFoodClick(food)}
            >
              <div
                className="w-16 h-16 flex items-center justify-center rounded-lg mb-2 shadow-sm bg-gray-200"
                style={{
                  overflow: "hidden",
                }}
              >
                <Image
                  src={foodImages[food] || "/images/default.jpg"}
                  alt={food}
                  width={64}
                  height={64}
                  className="rounded-lg object-cover"
                />
              </div>
              <p className="text-sm text-gray-700 text-center truncate w-20">
                {food}
              </p>
            </div>
          ))}
        </div>
      </section>

      {error && (
        <section className="mt-4 text-red-500">
          <p>Error: {error}</p>
        </section>
      )}
    </main>
  );
}
