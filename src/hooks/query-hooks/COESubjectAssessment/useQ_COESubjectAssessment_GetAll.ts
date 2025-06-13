import baseAxios from '@/api/baseAxios'
import { useQuery } from '@tanstack/react-query'

export default function useQ_COESubjectAssessment_GetAll() {
    const query = useQuery<ICoeSubjectAssessment[]>({
        queryKey: ["useQ_COESubjectAssessment_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/COESubjectAssessment/getAll")
            return res.data.data
        },
        // enabled:enabled
    })
    return query
}
