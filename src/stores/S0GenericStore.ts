import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GenericStore<T> {
    state: T;
    setState: (newState: T) => void;
    setProperty: <K extends keyof T>(key: K, value: T[K]) => void;
    resetState: () => void;
}

export function createGenericStore<T>({ initialState, storageKey }: { initialState: T, storageKey?: string }) {
    const storeCreator = (set: any) => ({
        state: initialState,
        setState: (newState: T) => set({ state: newState }),
        setProperty: <K extends keyof T>(key: K, value: T[K]) =>
            set((store: GenericStore<T>) => ({ state: { ...store.state, [key]: value } })),
        resetState: () => set({ state: initialState }),
    });

    return storageKey
        ? create(persist<GenericStore<T>>(storeCreator, { name: storageKey }))
        : create<GenericStore<T>>(storeCreator);
}
