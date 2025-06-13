import baseAxios from '@/api/baseAxios'
import { useQuery } from '@tanstack/react-query'

export default function useQ_COESemester_getAll(enabled: boolean) {
    const query = useQuery<ICoeSemester[]>({
        queryKey: ["useQ_COESemester_getAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/COESemester/getAll?cols=COESchoolYear")
            return res.data.data
        },
        enabled: enabled
    })
    return query
}
