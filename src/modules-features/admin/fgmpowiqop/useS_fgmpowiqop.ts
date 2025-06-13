import { createGenericStore } from "@/stores/S0GenericStore"

interface I {
  programId?: number
  programCode?: string
  gradeId?: number
  gradeCode?: string
  gradeSubjectId?: number
  gradeSubjectCode?: string
  classId?: number
  className?: string
  noData?: boolean
}

const useStore = createGenericStore<I>({
  initialState: { programId: 0, programCode: "", gradeId: 0, gradeCode: "", gradeSubjectId: 0, gradeSubjectCode: "", classId: 0, className: "" },
})

export default function useS_fgmpowiqop() {
  const store = useStore()
  return {
    ...store,
  }
}
