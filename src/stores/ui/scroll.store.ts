import { create } from "zustand";

interface ScrollState {
  isScrolled: boolean;
  setScrolled: (value: boolean) => void;
}

const useScrollStore = create<ScrollState>((set) => ({
  isScrolled: false,
  setScrolled: (value) => set({ isScrolled: value }),
}));

export default useScrollStore;
