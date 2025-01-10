import { create } from 'zustand'

interface SignupState {

    userId: string;
    email: string;
    password: string;
    userName: string;
    nationality: string;
    religion: string;
    agree: boolean;
    allergyTypes: string[];
    chronicDiseaseTypes: string[];
    dietaryPreferences: string[];

    setuserId: (userId: string) => void;
    setemail: (email: string) => void;
    setpassword: (password: string) => void;
    setuserName: (userName: string) => void;
    setnationality: (nationality: string) => void;
    setreligion: (religion: string) => void;
    setagree: (agree: boolean) => void;
    setAllergyTypes: (allergyTypes: string[]) => void;
    setChronicDiseaseTypes: (chronicDiseaseTypes: string[]) => void;
    setDietaryPreferences: (dietaryPreferences: string[]) => void;

}

export const useSignupStore = create<SignupState>((set) => ({
    userId: '',
    email: '',
    password: '',
    userName: '',
    nationality: '',
    religion: '',
    agree: false,
    allergyTypes: [],
    chronicDiseaseTypes: [],
    dietaryPreferences: [],

    setuserId: (userId: string) => set({ userId }),
    setemail: (email: string) => set({ email }),
    setpassword: (password: string) => set({ password }),
    setuserName: (userName: string) => set({ userName }),
    setnationality: (nationality: string) => set({nationality}),
    setreligion: (religion: string) => set({religion}),
    setagree: (agree: boolean) => set({ agree }),
    setAllergyTypes: (allergyTypes: string[]) => set({ allergyTypes }),
    setChronicDiseaseTypes: (chronicDiseaseTypes: string[]) => set({ chronicDiseaseTypes }),
    setDietaryPreferences: (dietaryPreferences: string[]) => set({ dietaryPreferences }),


}));


