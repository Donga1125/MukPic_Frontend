import { create } from 'zustand'

interface SignUpData {
    "userId": string,
    "email": string,
    "password": string,
    "userName": string,
    "nationality": string,
    "religion": string,
    "agree": boolean,
    "allergyTypes": string[],
    "chronicDiseaseTypes": string[],
    "dietaryPreferences": string[]
}

interface SignUpState {
    SignUpData: SignUpData;
    updateSignUpData: (data: Partial<SignUpData>) => void;
    resetSignUpData: () => void;
}

const useSignUpStore = create<SignUpState>((set) => ({
    SignUpData: {
        "userId": '',
        "email": '',
        "password": '',
        "userName": '',
        "nationality": '',
        "religion": '',
        "agree": false,
        "allergyTypes": [],
        "chronicDiseaseTypes": [],
        "dietaryPreferences": [],
    },
    updateSignUpData: (data) => set((state) => ({
        SignUpData: {
            ...state.SignUpData,
            ...data,
        },
    })),
    resetSignUpData: () => set(() => ({
        SignUpData: {
            "userId": '',
            "email": '',
            "password": '',
            "userName": '',
            "nationality": '',
            "religion": '',
            "agree": false,
            "allergyTypes": [],
            "chronicDiseaseTypes": [],
            "dietaryPreferences": [],
        },
    })),
}));