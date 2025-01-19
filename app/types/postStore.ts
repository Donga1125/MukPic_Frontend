import { create } from "zustand";

interface PostState {
  title: string;
  content: string;
  images: File[];
  category: string;
  imageUrl: string[];

  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setImages: (images: File[]) => void;
  setImageUrl: (imageUrl: string[]) => void;
  setCategory: (category: string) => void;
}

export const usePostStore = create<PostState>((set) => ({
  title: "",
  content: "",
  images: [],
  category: "",
  imageUrl: [],

  setTitle: (title: string) => set({ title }),
  setContent: (content: string) => set({ content }),
  setImages: (images: File[]) => set({ images }),
  setCategory: (category: string) => set({ category }),
  setImageUrl: (imageUrl: string[]) => set({ imageUrl }),
}));
