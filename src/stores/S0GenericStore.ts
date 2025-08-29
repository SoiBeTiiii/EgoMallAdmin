import { create } from "zustand";
import { persist } from "zustand/middleware";
import { baseAxiosAuth } from "../api/baseAxios";

interface GenericStore<T> {
  state: T;
  setState: (newState: T) => void;
  setProperty: <K extends keyof T>(key: K, value: T[K]) => void;
  resetState: () => void;
  fetchProfile: () => Promise<void>;
  getProfile: () => any;
}

export function createGenericStore<T>({
  initialState,
  storageKey,
}: {
  initialState: T;
  storageKey?: string;
}) {
  const storeCreator = (set: any, get: any): GenericStore<T> => ({
    state: initialState,
    setState: (newState: T) => set({ state: newState }),
    setProperty: <K extends keyof T>(key: K, value: T[K]) =>
      set((store: GenericStore<T>) => ({
        state: { ...store.state, [key]: value },
      })),
    resetState: () => set({ state: initialState }),

    fetchProfile: async () => {
      try {

        const res = await baseAxiosAuth.get("/user", {
            headers: {
                Authorization: `Bearer ${get().state.token}`,
            }
        });

        set((store: GenericStore<T>) => ({
          state: { ...store.state, user: res.data.data },
        }));
      } catch (err) {
        console.error("fetchProfile error:", err);
      }
    },

    getProfile: () => get().state.user,
  });

  return storageKey
    ? create(persist(storeCreator, { name: storageKey }))
    : create(storeCreator);
}
