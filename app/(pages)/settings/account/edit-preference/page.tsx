'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dropdown } from "@/app/components/auth/signupComponents";


interface UserInfoData {
    nationality: string;
    religion: string;
    allergies: string[];
    chronicDiseases: string[];
    chronicDiseaseTypes: string[];
    dietaryPreferences: string[];
  }



const EditPreference = () => {
    const [userInfo, setUserInfo] = useState<UserInfoData | null>(null);

    const [selectedCountry, setSelectedCountry] = useState<string | null>(null); // 지역 선택 상태
    const [selectedReligions, setSelectedReligions] = useState<string | null>(null); // 종교 선택 상태
    const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState<string[]>([]); // 식습관 선택 상태
    const [selectedChronicDisease, setSelectedChronicDisease] = useState<string[]>([]); // 만성질환 선택 상태
    const router = useRouter();


    const countryList: string[] = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo (Congo-Brazzaville)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czechia (Czech Republic)",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini (fmr. Swaziland)",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Holy See",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (North)",
        "Korea (South)",
        "Kosovo",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar (Burma)",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine State",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syria",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States of America",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe"
    ];
    const religionList: string[] = ["Atheism", "Christianity", "Buddhism", "Catholicism", "Islam",
        "Hinduism"];
    const dietaryPreferences: string[] = ["No food to cover", 'Halal', 'Kosher', "Vegetarian", "Vegan",
        "Pescatarian", "Low Spice tolerance", "No Alcohol", 'Gluten Free', 'Lactose Free', 'Low Carb'];
    const chronicDiseaseList: string[] = ['No Disease', 'Cancer', 'Diabetes', 'Osteoporosis', 'Heart Disease'];
    //const isFormValid = selectedCountry && selectedReligions;
    


    const getAuthToken = () => {
        const token = localStorage.getItem("Authorization");
        if (!token) {
          console.error("Authorization token not found");
        }
        return token;
      };
    
      // 사용자 정보 가져오기
      useEffect(() => {
        const fetchUserInfo = async () => {
          const token = getAuthToken();
          if (!token) return;
    
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/users/myinfo`, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
              },
            });
    
            if (response.ok) {
                const data = await response.json();
                setUserInfo(data);
                // userInfo 값으로 selected* 상태 초기화
                setSelectedCountry(data.nationality || null);
                setSelectedReligions(data.religion || null);
                setSelectedDietaryPreferences(data.dietaryPreferences || []);
                setSelectedChronicDisease(data.chronicDiseases || []);
                
            } else {
              console.error('Failed to fetch user info:', response.status);
            }
          } catch (error) {
            console.error('Error fetching user info:', error);
          }
        };
    
        fetchUserInfo();
      }, [router]);



      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = getAuthToken();
        if (!token) return;

        try {
            const updatedData: Partial<UserInfoData> = {};

            if (selectedCountry && selectedCountry !== userInfo?.nationality) {
                updatedData.nationality = selectedCountry;
            }
            if (selectedReligions && selectedReligions !== userInfo?.religion) {
                updatedData.religion = selectedReligions;
            }
            if (JSON.stringify(selectedDietaryPreferences) !== JSON.stringify(userInfo?.dietaryPreferences)) {
                updatedData.dietaryPreferences = selectedDietaryPreferences;
            }
            if (JSON.stringify(selectedChronicDisease) !== JSON.stringify(userInfo?.chronicDiseases)) {
                updatedData.chronicDiseaseTypes = selectedChronicDisease; 
            }

        if (Object.keys(updatedData).length > 0) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/users/editUserInfo`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
            body: JSON.stringify(updatedData),
            });

            if (response.ok) {
            const data = await response.json();
            setUserInfo(data); 
            alert("User information has been modified.");
            router.push("/settings");
            } else {
            console.error("Failed to update user info:", response.status);
            }
        } else {
            alert("No changes detected.");
        }
        } catch (error) {
        console.error("Failed to update profile:", error);
        alert("Failed to update profile. Please try again.");
        }
  };


  return (
    <div className="w-[24.375rem] h-[52.75rem] mx-auto flex items-center justify-center bg-white rounded-lg">
        <form onSubmit={handleSubmit} className="signup-text signup-text-black flex-grow flex flex-col gap-[5rem]">
            {/* 국가 (Nationality) */}
            <div>
                <Dropdown
                    options={countryList}
                    buttonName="Select Your Country"
                    isMultiSelect={false}
                    onSelect={(selected) => setSelectedCountry(selected as string | null)}
                />
                {/* 선택된 값 표시 */}
                {selectedCountry && (
                    <div className="dropdown-badge-container mt-2">
                        <span className="dropdown-badge dropdown-badge-green">
                            {selectedCountry}
                        </span>
                    </div>
                )}
            </div>

            {/* 종교 (Religion) */}
            <div>
                <Dropdown
                    options={religionList}
                    buttonName="Select Your Religion"
                    isMultiSelect={false}
                    onSelect={(selected) => setSelectedReligions(selected as string | null)}
                />
                {/* 선택된 값 표시 */}
                {selectedReligions && (
                    <div className="dropdown-badge-container mt-2">
                        <span className="dropdown-badge dropdown-badge-green">
                            {selectedReligions}
                        </span>
                    </div>
                )}
            </div>

            {/* 식습관 (Dietary Preferences) */}
            <div>
                <Dropdown
                    options={dietaryPreferences}
                    buttonName="Select Your Dietary Preferences"
                    isMultiSelect={true}
                    onSelect={(selected) => setSelectedDietaryPreferences(selected as string[])}
                />
                {/* 선택된 값 표시 */}
                {selectedDietaryPreferences.length > 0 && (
                    <div className="dropdown-badge-container mt-2">
                        {selectedDietaryPreferences.map((item) => (
                            <span key={item} className="dropdown-badge dropdown-badge-green">
                                {item}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* 만성질환 (Chronic Diseases) */}
            <div>
                <Dropdown
                    options={chronicDiseaseList}
                    buttonName="Select Your Chronic Disease"
                    isMultiSelect={true}
                    onSelect={(selected) => setSelectedChronicDisease(selected as string[])}
                />
                {/* 선택된 값 표시 */}
                {selectedChronicDisease.length > 0 && (
                    <div className="dropdown-badge-container mt-2">
                        {selectedChronicDisease.map((item) => (
                            <span key={item} className="dropdown-badge dropdown-badge-green">
                                {item}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* 저장 버튼 */}
            <button
                className="auth-button auth-button-id sign-up-button-text"
                type="submit"
                disabled={!selectedCountry || !selectedReligions}
            >
                Save
            </button>
        </form>
    </div>
);
}

export default EditPreference;