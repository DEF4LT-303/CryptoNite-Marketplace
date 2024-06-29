import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProductTimer = {
  timestamp: number;
  isRunning: boolean;
};

type TimerState = {
  timeStamps: Record<string, ProductTimer>;
  setTimer: (productId: string, timestamp: number) => void;
  clearProductTimer: (productId: string) => void;
  clearAllTimers: () => void;
};

export const useBiddingTimer = create<TimerState>()(
  persist(
    (set) => ({
      timeStamps: {},

      setTimer: (productId, timestamp) =>
        set((state) => ({
          timeStamps: {
            ...state.timeStamps,
            [productId]: { timestamp, isRunning: true },
          },
        })),

      clearProductTimer: (productId) =>
        set((state) => {
          const { [productId]: _, ...rest } = state.timeStamps;
          return {
            timeStamps: rest,
          };
        }),

      clearAllTimers: () =>
        set(() => ({
          timeStamps: {},
        })),
    }),
    {
      name: "timer",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
