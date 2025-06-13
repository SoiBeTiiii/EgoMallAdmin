import baseAxios from '@/api/baseAxios'
import { useQuery } from '@tanstack/react-query'

export default function useQ_COESubjectMethod_GetAll() {
    const query = useQuery<ICoeSubjectMethod[]>({
        queryKey: ["useQ_COESubject_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/COESubjectMethod/getAll")
            return res.data.data
        },
    })
    return query
}
