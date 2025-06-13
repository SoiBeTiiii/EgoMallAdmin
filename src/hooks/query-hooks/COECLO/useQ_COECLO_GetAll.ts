import baseAxios from '@/api/baseAxios'
import { useQuery } from '@tanstack/react-query'

export default function useQ_COECLO_GetAll() {
    const query = useQuery<ICoeCLO[]>({
        queryKey: ["useQ_COECLO_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/COECLO/getAll")
            return res.data.data
        },
    })
    return query
}
