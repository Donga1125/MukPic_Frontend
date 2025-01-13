"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function MainPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Top picks");
  const router = useRouter();

  const categories = ["Top picks", "Bap", "Myeon", "Snacks", "Cafe"];

  const foodData: Record<string, string[]> = {
    "Top picks": [
      "Dakgalbi",
      "Fried Chicken",
      "Bibimbap with Extra Veggies",
      "Tteokbokki",
      "Bulgogi",
      "Kimchi Stew",
      "Samgyeopsal",
      "Japchae",
    ],
    Bap: [
      "Kimchi Fried Rice",
      "Bibimbap",
      "Bulgogi Rice",
      "Gukbap",
      "Soy Sauce Egg Rice",
      "Mushroom Rice Bowl",
      "Omurice",
      "Gimbap",
    ],
    Myeon: [
      "Jajangmyeon",
      "Kalguksu",
      "Jjamppong",
      "Naengmyeon",
      "Udon",
      "Spicy Cold Noodles",
      "Bulgogi Noodles",
      "Soy Sauce Noodles",
    ],
    Snacks: [
      "Hotteok",
      "Tteokbokki",
      "Corn Dog",
      "Gimbap",
      "Fish Cake Skewers",
      "Sweet Potato Fries",
      "Rice Cakes",
      "Manduguk",
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
    "Bibimbap with Extra Veggies": "/images/Bibimbap.jpg",
    Tteokbokki: "/images/Tteokbokki.jpg",
    Bulgogi: "/images/Bulgogi.jpg",
    "Kimchi Stew": "/images/kimchi Stew.jpg",
    Samgyeopsal: "/images/Samgyeopsal.jpg",
    Japchae: "/images/Japchae.jpg",
    "Kimchi Fried Rice": "/images/Kimchi Fried Rice.jpg",
    Bibimbap: "/images/Bibimbap.jpg",
    "Bulgogi Rice": "/images/Bulgogi Rice.jpg",
    Gukbap: "/images/Gukbap.jpg",
    "Soy Sauce Egg Rice": "/images/Soy Sauce Egg Rice.jpg",
    "Mushroom Rice Bowl": "/images/Mushroom Rice.jpg",
    Omurice: "/images/Omurice.jpg",
    "Seaweed Rice Roll": "/images/Gimbap.jpg",
    Jajangmyeon: "/images/Jajangmyeon.jpg",
    Kalguksu: "/images/Kalguksu.jpg",
    Jjamppong: "/images/Jjamppong.jpg",
    Naengmyeon: "/images/Naengmyeon.jpg",
    Udon: "/images/Udon.jpg",
    "Spicy Cold Noodles": "/images/Spicy Cold Noodles.jpg",
    "Bulgogi Noodles": "/images/Bulgogi Noodles.jpg",
    "Soy Sauce Noodles": "/images/Soy Sauce Noodles.jpg",
    Hotteok: "/images/Hotteok.jpg",
    "Corn Dog": "/images/Corn Dog.jpg",
    Gimbap: "/images/Gimbap.jpg",
    "Fish Cake Skewers": "/images/Fish Cake Skewers.jpg",
    "Sweet Potato Fries": "/images/Sweet Potato Fries.jpg",
    "Rice Cakes": "/images/Rice Cakes.jpg",
    Manduguk: "/images/Manduguk.jpg",
    Espresso: "/images/Espresso.jpg",
    Cappuccino: "/images/Cappuccino.jpg",
    Bingsu: "/images/Bingsu.jpg",
    Macaron: "/images/Macaron.jpg",
    "Iced Americano": "/images/Iced Americano.jpg",
    "Matcha Latte": "/images/Matcha Latte.jpg",
    Affogato: "/images/Affogato.jpg",
    Cheesecake: "/images/Cheesecake.jpg",
  };

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
          Cafe: "PROFILE",
        };
  
        const imageType = imageTypeMapping[selectedCategory] || "COMMUNITY"; // 기본값 COMMUNITY  

        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("type", imageType);

        const apiUrl = process.env.NEXT_PUBLIC_ROOT_API;
        const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

        try {
          const uploadResponse = await fetch(`${apiUrl}images/upload`, {
            method: "POST",
            body: uploadFormData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!uploadResponse.ok) throw new Error("이미지 업로드 실패");

          const uploadedUrls: string[] = await uploadResponse.json();
          const imageUrl = uploadedUrls[0];

          router.push(`/info?imageUrl=${encodeURIComponent(imageUrl)}`);
        } catch (apiError: any) {
          setError(apiError.message || "API 호출 중 문제가 발생했습니다.");
        }
      };
    } catch (error: any) {
      setError(error.message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mukpic-main-container bg-gray-50 min-h-[calc(100vh-50px)] px-4 py-6">
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
          <button className="bg-black text-white font-semibold px-4 py-2 rounded-md">
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

      <section style={{ marginTop: "1.5rem"}}>
        <div className="grid grid-cols-4 gap-x-4 gap-y-6">
          {foodData[selectedCategory]?.map((food, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center"
              style={{
                width: "4rem", // 부모 컨테이너의 고정 너비
                height: "5rem", // 고정 높이
              }}
            >
              <div
                className="w-16 h-16 flex items-center justify-center rounded-lg mb-2 shadow-sm bg-gray-200"
                style={{
                  overflow: "hidden", // 이미지가 컨테이너를 벗어나지 않도록
                }}
              >
                {/* next/image 사용 */}
                <Image
                  src={foodImages[food] || "/images/default.jpg"}
                  alt={food}
                  width={64} // 4rem
                  height={64} // 4rem
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
