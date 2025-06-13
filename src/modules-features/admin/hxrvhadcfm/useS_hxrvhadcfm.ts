import { createGenericStore } from "@/stores/S0GenericStore"

interface I {
    edited?: Record<string, ICoeCLOPI>
}

const useStore = createGenericStore<I>({
    initialState: {},
    storageKey: "useS_hxrvhadcfm"
})

export default function useS_hxrvhadcfm() {
    const store = useStore()
    return {
        ...store,
    }
}
