import baseAxios from '@/api/baseAxios'
import { useQuery } from '@tanstack/react-query'

export default function useQ_COESubjectGroup_getAll(enabled: boolean) {
    const query = useQuery<ICoeSubjectGroup[]>({
        queryKey: ["useQ_COESubjectGroup_getAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/COESubjectGroup/getAll")
            return res.data.data
        },
        enabled: enabled
    })
    return query
}
