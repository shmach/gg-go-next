import { create } from "zustand";

interface IControlAnimationStore {
  pauseAnimation: boolean;
  setPauseAnimation: (pause: boolean) => void;
}

export const useControlAnimationStore = create<IControlAnimationStore>()(
  (set) => ({
    pauseAnimation: false,
    setPauseAnimation: (pause) => set({ pauseAnimation: pause }),
  }),
);
