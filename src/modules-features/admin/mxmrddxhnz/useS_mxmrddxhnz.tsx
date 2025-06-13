import { createGenericStore } from "@/stores/S0GenericStore"

interface I {
    gradeId?: number
    gradeCode?: string
    noData?: boolean,
    programId?: number
}

const useStore = createGenericStore<I>({
    initialState: { gradeId: 0, gradeCode: "", programId: 0 },
    storageKey: "useS_mxmrddxhnz"
})

export default function useS_mxmrddxhnz() {
    const store = useStore()
    // function GradeIdWithCode(myAdd: string) {
    //     return store.state.gradeId! + " - " + store.state.gradeCode + myAdd
    // }
    return {
        ...store,
        // GradeIdWithCode
    }
}
