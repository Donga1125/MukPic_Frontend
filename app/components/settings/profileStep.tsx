// 'use client';

// import React, { useState } from "react";
// import axios from "axios";
// import Image from "next/image";

// export function ProfileStep({
//   initialImage,
//   initialUserName,
//   onSave,
// }: {
//   initialImage: string;
//   initialUserName: string;
//   onSave: (data: { image: string; userName: string }) => void;
// }) {
//   const [profileImage, setProfileImage] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(initialImage);
//   const [userName, setUserName] = useState(initialUserName);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];
//     if (!allowedTypes.includes(file.type)) {
//       alert("jpg, jpeg, png 파일만 업로드 가능합니다.");
//       return;
//     }

//     if (file.size > 10 * 1024 * 1024) {
//       alert("10MB 이하의 파일만 업로드 가능합니다.");
//       return;
//     }

//     setProfileImage(file);
//     setPreviewUrl(URL.createObjectURL(file));
//   };

//   const handleSave = async () => {
//     let uploadedImage = initialImage;

//     // 이미지 업로드
//     if (profileImage) {
//       const formData = new FormData();
//       formData.append("file", profileImage);
//       formData.append("type", "PROFILE");

//       try {
//         const response = await axios.post("/users/update/image", formData);
//         uploadedImage = response.data.imageUrl;
//       } catch (error) {
//         console.error("이미지 업로드 실패:", error);
//         setMessage("이미지 업로드 실패");
//         return;
//       }
//     }

//     onSave({ image: uploadedImage, userName });
//   };

//   return (
//     <div>
//       <div onClick={() => document.getElementById("fileInput")?.click()}>
//         {previewUrl ? (
//           <Image src={previewUrl} alt="미리보기" width={100} height={100} />
//         ) : (
//           <div>이미지 선택</div>
//         )}
//       </div>
//       <input
//         id="fileInput"
//         type="file"
//         accept="image/*"
//         style={{ display: "none" }}
//         onChange={handleFileChange}
//       />
//       <input
//         type="text"
//         placeholder="Enter Your Name"
//         value={userName}
//         onChange={(e) => setUserName(e.target.value)}
//       />
//       <button onClick={handleSave}>Save</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }
