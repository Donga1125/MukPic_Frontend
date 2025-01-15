'use client';
import axios from "axios";
import { useState } from "react";

const ProfileImageUpload: React.FC = () => {
    const [profileImage, setProfileImage] = useState<File | null>(null); // 선택한 이미지 파일
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 미리보기 URL
    const [loading, setLoading] = useState<boolean>(false); // 업로드 중 상태
    const [error, setError] = useState<string | null>(null); // 에러 메시지

    const apiUrl = process.env.NEXT_PUBLIC_ROOT_API; // API URL (환경 변수)
    const token = process.env.NEXT_PUBLIC_AUTH_TOKEN; // 인증 토큰 (환경 변수)

    // 파일 선택 시 처리
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 선택한 파일을 상태에 저장
        setProfileImage(file);

        // 미리보기 URL 생성
        const previewUrl = URL.createObjectURL(file);
        setPreviewUrl(previewUrl);
    };

    // 서버에 이미지 업로드
    const handleUpload = async () => {
        if (!profileImage) {
            setError("이미지를 선택해주세요.");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // FormData 생성
            const formData = new FormData();
            formData.append("file", profileImage);

            // 서버에 업로드 요청
            const response = await axios.post(`${apiUrl}/profile/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                alert("프로필 이미지가 성공적으로 업로드되었습니다!");
            } else {
                throw new Error("이미지 업로드 실패");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "업로드 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>프로필 이미지 업로드</h2>

            {/* 이미지 미리보기 */}
            <div style={{ marginBottom: "20px" }}>
                {previewUrl ? (
                    <img
                        src={previewUrl}
                        alt="미리보기"
                        style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}
                    />
                ) : (
                    <div
                        style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            backgroundColor: "#eaeaea",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                            color: "#aaa",
                        }}
                    >
                        이미지 미리보기
                    </div>
                )}
            </div>

            {/* 파일 선택 버튼 */}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ marginBottom: "20px" }}
            />

            {/* 업로드 버튼 */}
            <button
                onClick={handleUpload}
                disabled={loading}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: loading ? "not-allowed" : "pointer",
                }}
            >
                {loading ? "업로드 중..." : "프로필 이미지 업로드"}
            </button>

            {/* 에러 메시지 표시 */}
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>
    );
};

export default function Page() {
    return <ProfileImageUpload />;
}
