import { createGenericStore } from "@/stores/S0GenericStore"

interface I {
    gradeId?: number
    gradeCode?: string
    noData?: boolean
}

const useStore = createGenericStore<I>({
    initialState: { gradeId: 0, gradeCode: "" },
})

export default function useS_t5sip6yyka() {
    const store = useStore()
    return {
        ...store,
    }
}
