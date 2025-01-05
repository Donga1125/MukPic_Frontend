import { create } from 'zustand';

interface loginStore {
    userId: string;
    password: string;
    setUserId: (userId: string) => void;
    setPassword: (password: string) => void;

}

export const userLoginStore = create<loginStore>((set) => ({
    userId: '',
    password: '',
    setUserId: (userId) => set({ userId }),
    setPassword: (password) => set({ password }),
}));