import baseAxios from '@/api/baseAxios'
import { useQuery } from '@tanstack/react-query'

export default function useQ_COESubjectFormula_GetAll() {
    const query = useQuery<ICoeSubjectFormula[]>({
        queryKey: ["useQ_COESubjectFormula_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/COESubjectFormula/getAll")

            return res.data.data
        },
        // enabled:enabled
    })
    return query
}
