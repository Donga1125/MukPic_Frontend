// 'use client';
// import React, { useEffect, useRef, useState } from "react";
// import { useSignupStore } from "@/app/types/signupStore";
// import { useRouter } from "next/navigation";

// function FormatStringArray(input: string[]): string[] {
//     return input.map((str) => str.replace(/\s+/g, "_").toUpperCase());
// }

// const DropDownIcon = () => {
//     return (
//         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
//             <g clip-path="url(#clip0_112_2361)">
//                 <path d="M11.6133 15.6133L15.0667 19.0666C15.5867 19.5866 16.4267 19.5866 16.9467 19.0666L20.4 15.6133C21.24 14.7733 20.64 13.3333 19.4533 13.3333H12.5467C11.36 13.3333 10.7733 14.7733 11.6133 15.6133Z" fill="black" />
//             </g>
//             <defs>
//                 <clipPath id="clip0_112_2361">
//                     <rect width="32" height="32" fill="white" />
//                 </clipPath>
//             </defs>
//         </svg>
//     );
// }

// const DropDownIconReverse = () => {
//     return (
//         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
//             <path d="M20.3867 16.3867L16.9333 12.9334C16.4133 12.4134 15.5733 12.4134 15.0533 12.9334L11.6 16.3867C10.76 17.2267 11.36 18.6667 12.5467 18.6667L19.4533 18.6667C20.64 18.6667 21.2267 17.2267 20.3867 16.3867Z" fill="black" />
//         </svg>
//     )
// }

// type DropdownProps = {
//     options: string[];
//     buttonName: string;
//     isMultiSelect?: boolean;
//     onSelect: (selected: string | string[]) => void;
// }
// export function Dropdown({ options, buttonName, isMultiSelect, onSelect }: DropdownProps) {
//     const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 상태
//     const [selectedItems, setSelectedItems] = useState<string[]>([]); // 선택된 항목 리스트
//     const [selectedItem, setSelectedItem] = useState<string | null>(null); // 단일 선택용
//     const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 외부 클릭 감지

//     // 드롭다운 토글
//     const toggleDropdown = () => {
//         setIsOpen((prev) => !prev);
//     };

//     // 항목 선택
//     const selectItem = (item: string) => {
//         if (isMultiSelect) {
//             if (selectedItems.includes(item)) {
//                 // 체크 해제: 선택된 항목에서 제거
//                 const newSelectedItems = selectedItems.filter((selected) => selected !== item);
//                 setSelectedItems(newSelectedItems);
//                 onSelect(newSelectedItems); // 부모로 선택된 항목 전달
//             } else {
//                 // 체크: 선택된 항목에 추가
//                 const newSelectedItems = [...selectedItems, item];
//                 setSelectedItems(newSelectedItems);
//                 onSelect(newSelectedItems); // 부모로 선택된 항목 전달
//             }
//         } else {
//             setSelectedItem(item);
//             setIsOpen(false);
//             onSelect(item); // 부모로 선택된 항목 전달
//         }
//     };

//     // 뱃지 삭제
//     const removeBadge = (item: string) => {
//         if (isMultiSelect) {
//             const newSelectedItems = selectedItems.filter((selected) => selected !== item);
//             setSelectedItems(newSelectedItems);
//             onSelect(newSelectedItems); // 부모로 선택된 항목 전달
//         } else {
//             setSelectedItem(null);
//             onSelect(""); // 부모로 선택 해제 상태 전달
//         }
//     };

//     // 드롭다운 외부 클릭 감지
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener("click", handleClickOutside);
//         return () => document.removeEventListener("click", handleClickOutside);
//     }, []);

//     return (
//         <div ref={dropdownRef} className="dropdown-container">
//             {/* 드롭다운 버튼 */}
//             <button
//                 type="button"
//                 onClick={toggleDropdown}
//                 className="profile-dropdown-button"
//             >
//                 <span>{buttonName}</span>
//                 {!isOpen ? <DropDownIcon /> : <DropDownIconReverse />}
//             </button>

//             {/* 드롭다운 리스트 */}
//             {isOpen && (
//                 <div className="dropdown-list">
//                     <ul>
//                         {options.map((option) => (
//                             <li
//                                 key={option}
//                                 className="dropdown-item flex"
//                                 onClick={() => selectItem(option)}
//                             >
//                                 <span className="flex flex-1">{option}</span>
//                                 {/* 여기에 체크박스 추가 */}
//                                 {isMultiSelect ? (
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedItems.includes(option)}
//                                         onChange={() => selectItem(option)}
//                                         className="dropdown-checkbox" />
//                                 ) :
//                                     (
//                                         null
//                                     )
//                                 }
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {/* 선택된 항목 표시 (뱃지) */}
//             <div className='dropdown-badge-container'>
//                 {isMultiSelect ? selectedItems.map((item) => (
//                     <button
//                         key={item}
//                         className="dropdown-badge dropdown-badge-green"
//                         onClick={() => removeBadge(item)}
//                     >
//                         {item} ×
//                     </button>
//                 ))
//                     : selectedItem && (
//                         <button
//                             key={selectedItem}
//                             className="dropdown-badge dropdown-badge-green"
//                             onClick={() => removeBadge(selectedItem)}
//                         >
//                             {selectedItem} ×
//                         </button>
//                     )}
//             </div>
//         </div>
//     );
// }

// export function SignupStep4() {
//     const [selectedCountry, setSelectedCountry] = useState<string | null>(null); // 지역 선택 상태
//     const [selectedReligions, setSelectedReligions] = useState<string | null>(null); // 종교 선택 상태
//     const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState<string[]>([]); // 식습관 선택 상태
//     const [selectedChronicDisease, setSelectedChronicDisease] = useState<string[]>([]); // 만성질환 선택 상태
//     const router = useRouter();

//     const setNationality = useSignupStore(state => state.setnationality);
//     const setReligion = useSignupStore(state => state.setreligion);
//     const setDietaryPreferences = useSignupStore(state => state.setDietaryPreferences);
//     const setChronicDiseaseTypes = useSignupStore(state => state.setChronicDiseaseTypes);

//     const countryList: string[] = [
//         "Afghanistan",
//         "Albania",
//         "Algeria",
//         "Andorra",
//         "Angola",
//         "Antigua and Barbuda",
//         "Argentina",
//         "Armenia",
//         "Australia",
//         "Austria",
//         "Azerbaijan",
//         "Bahamas",
//         "Bahrain",
//         "Bangladesh",
//         "Barbados",
//         "Belarus",
//         "Belgium",
//         "Belize",
//         "Benin",
//         "Bhutan",
//         "Bolivia",
//         "Bosnia and Herzegovina",
//         "Botswana",
//         "Brazil",
//         "Brunei",
//         "Bulgaria",
//         "Burkina Faso",
//         "Burundi",
//         "Cabo Verde",
//         "Cambodia",
//         "Cameroon",
//         "Canada",
//         "Central African Republic",
//         "Chad",
//         "Chile",
//         "China",
//         "Colombia",
//         "Comoros",
//         "Congo (Congo-Brazzaville)",
//         "Costa Rica",
//         "Croatia",
//         "Cuba",
//         "Cyprus",
//         "Czechia (Czech Republic)",
//         "Denmark",
//         "Djibouti",
//         "Dominica",
//         "Dominican Republic",
//         "Ecuador",
//         "Egypt",
//         "El Salvador",
//         "Equatorial Guinea",
//         "Eritrea",
//         "Estonia",
//         "Eswatini (fmr. Swaziland)",
//         "Ethiopia",
//         "Fiji",
//         "Finland",
//         "France",
//         "Gabon",
//         "Gambia",
//         "Georgia",
//         "Germany",
//         "Ghana",
//         "Greece",
//         "Grenada",
//         "Guatemala",
//         "Guinea",
//         "Guinea-Bissau",
//         "Guyana",
//         "Haiti",
//         "Holy See",
//         "Honduras",
//         "Hungary",
//         "Iceland",
//         "India",
//         "Indonesia",
//         "Iran",
//         "Iraq",
//         "Ireland",
//         "Israel",
//         "Italy",
//         "Jamaica",
//         "Japan",
//         "Jordan",
//         "Kazakhstan",
//         "Kenya",
//         "Kiribati",
//         "Korea (North)",
//         "Korea (South)",
//         "Kosovo",
//         "Kuwait",
//         "Kyrgyzstan",
//         "Laos",
//         "Latvia",
//         "Lebanon",
//         "Lesotho",
//         "Liberia",
//         "Libya",
//         "Liechtenstein",
//         "Lithuania",
//         "Luxembourg",
//         "Madagascar",
//         "Malawi",
//         "Malaysia",
//         "Maldives",
//         "Mali",
//         "Malta",
//         "Marshall Islands",
//         "Mauritania",
//         "Mauritius",
//         "Mexico",
//         "Micronesia",
//         "Moldova",
//         "Monaco",
//         "Mongolia",
//         "Montenegro",
//         "Morocco",
//         "Mozambique",
//         "Myanmar (Burma)",
//         "Namibia",
//         "Nauru",
//         "Nepal",
//         "Netherlands",
//         "New Zealand",
//         "Nicaragua",
//         "Niger",
//         "Nigeria",
//         "North Macedonia",
//         "Norway",
//         "Oman",
//         "Pakistan",
//         "Palau",
//         "Palestine State",
//         "Panama",
//         "Papua New Guinea",
//         "Paraguay",
//         "Peru",
//         "Philippines",
//         "Poland",
//         "Portugal",
//         "Qatar",
//         "Romania",
//         "Russia",
//         "Rwanda",
//         "Saint Kitts and Nevis",
//         "Saint Lucia",
//         "Saint Vincent and the Grenadines",
//         "Samoa",
//         "San Marino",
//         "Sao Tome and Principe",
//         "Saudi Arabia",
//         "Senegal",
//         "Serbia",
//         "Seychelles",
//         "Sierra Leone",
//         "Singapore",
//         "Slovakia",
//         "Slovenia",
//         "Solomon Islands",
//         "Somalia",
//         "South Africa",
//         "South Sudan",
//         "Spain",
//         "Sri Lanka",
//         "Sudan",
//         "Suriname",
//         "Sweden",
//         "Switzerland",
//         "Syria",
//         "Tajikistan",
//         "Tanzania",
//         "Thailand",
//         "Timor-Leste",
//         "Togo",
//         "Tonga",
//         "Trinidad and Tobago",
//         "Tunisia",
//         "Turkey",
//         "Turkmenistan",
//         "Tuvalu",
//         "Uganda",
//         "Ukraine",
//         "United Arab Emirates",
//         "United Kingdom",
//         "United States of America",
//         "Uruguay",
//         "Uzbekistan",
//         "Vanuatu",
//         "Venezuela",
//         "Vietnam",
//         "Yemen",
//         "Zambia",
//         "Zimbabwe"
//     ];
//     const religionList: string[] = ["Atheism", "Christianity", "Buddhism", "Catholicism", "Islam",
//         "Hinduism"];
//     const dietaryPreferences: string[] = ["No food to cover", 'Halal', 'Kosher', "Vegetarian", "Vegan",
//         "Pescatarian", "Low Spice tolerance", "No Alcohol", 'Gluten Free', 'Lactose Free', 'Low Carb'];
//     const chronicDiseaseList: string[] = ['No Disease', 'Cancer', 'Diabetes', 'Osteoporosis', 'Heart Disease'];
//     const isFormValid = selectedCountry && selectedReligions;


//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         setSelectedCountry(selectedCountry);
//         setSelectedReligions(selectedReligions);
//         setSelectedDietaryPreferences(selectedDietaryPreferences);
//         setSelectedChronicDisease(selectedChronicDisease);

//         // useSignupStore 상태 업데이트 (대문자로 변환, 공백에 _ 추가)
//         setNationality((selectedCountry ?? "").toUpperCase());  // 국가 정보 설정
//         setReligion((selectedReligions ?? "").toUpperCase());   // 종교 정보 설정
//         setDietaryPreferences(FormatStringArray(selectedDietaryPreferences));  // 식습관 설정
//         setChronicDiseaseTypes(FormatStringArray(selectedChronicDisease)); // 만성질환 설정

//         console.log(selectedCountry, selectedReligions, selectedDietaryPreferences, selectedChronicDisease);

//         router.push('/signup/step5');
//     }


//     return (
//         <form onSubmit={handleSubmit} className='signup-text signup-text-black flex-grow flex flex-col gap-[8rem]'>
//             <div>
//                 <Dropdown
//                     options={countryList}
//                     buttonName="Select Your Country"
//                     isMultiSelect={false}
//                     onSelect={(selected) => setSelectedCountry(selected as string | null)}
//                 />
//             </div>
//             <div>
//                 <Dropdown
//                     options={religionList}
//                     buttonName="Select Your Religion"
//                     isMultiSelect={false}
//                     onSelect={(selected) => setSelectedReligions(selected as string | null)}
//                 />
//             </div>
//             <div>
//                 <Dropdown
//                     options={dietaryPreferences}
//                     buttonName="Select Your DietaryPreferences"
//                     isMultiSelect={true}
//                     onSelect={(selected) => setSelectedDietaryPreferences(selected as string[])}
//                 />
//             </div>
//             <div>
//                 <Dropdown
//                     options={chronicDiseaseList}
//                     buttonName="Select Your Chronic Disease"
//                     isMultiSelect={true}
//                     onSelect={(selected) => setSelectedChronicDisease(selected as string[])}
//                 />
//             </div>
//             <button className='auth-button auth-button-id sign-up-button-text'
//                 type='submit'
//                 disabled={!isFormValid}
//             >Next
//             </button>
//         </form >
//     );
// }
