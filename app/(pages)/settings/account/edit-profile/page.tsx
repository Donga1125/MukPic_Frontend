import React from "react";
// import { ProfileStep } from "@/app/components/settings/profileStep";
// import { PreferencesStep } from "@/app/components/settings/preferencesStep";
// import { AllergiesStep } from "@/app/components/settings/allergiesStep";

export default function EditProfilePage() {
//   const handleProfileSave = (data: { image: string; userName: string }) => {
//     console.log("Profile saved:", data);
//   };

//   const handlePreferencesSave = (data: {
//     country: string;
//     religion: string;
//     dietaryPreferences: string[];
//     chronicDiseases: string[];
//   }) => {
//     console.log("Preferences saved:", data);
//   };

//   const handleAllergiesSave = (allergies: string[]) => {
//     console.log("Allergies saved:", allergies);
//   };

  return (
    <div>
      <h1>Edit Profile</h1>
      {/* <ProfileStep
        initialImage="/default-profile.jpg"
        initialUserName="John Doe"
        onSave={handleProfileSave}
      />
      <PreferencesStep
        initialCountry="USA"
        initialReligion="Christianity"
        initialDietaryPreferences={["Vegan"]}
        initialChronicDiseases={["Diabetes"]}
        onSave={handlePreferencesSave}
      />
      <AllergiesStep initialAllergies={["Peanut"]} onSave={handleAllergiesSave} /> */}
    </div>
  );
}
