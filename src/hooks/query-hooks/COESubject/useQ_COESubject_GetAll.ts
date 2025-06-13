import baseAxios from '@/api/baseAxios'
import { useQuery } from '@tanstack/react-query'

export default function useQ_COESubject_GetAll(enabled: boolean) {
    const query = useQuery<ICoeSubject[]>({
        queryKey: ["useQ_COESubject_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/COESubject/getAll?cols=COEUnit")
            return res.data.data
        },
        enabled: enabled
    })
    return query
}
