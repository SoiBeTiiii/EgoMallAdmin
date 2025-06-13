import { createGenericStore } from "@/stores/S0GenericStore"

interface I {
    subject?: ICoeSubject
}

const useStore = createGenericStore<I>({ initialState: {} })
export default function useS_nugmpmukta() {
    const store = useStore()
    return {
        ...store
    }
}
