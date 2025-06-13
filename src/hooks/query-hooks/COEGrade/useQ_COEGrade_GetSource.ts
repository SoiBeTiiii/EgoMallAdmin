import baseAxios from '@/api/baseAxios'
import { useQuery } from '@tanstack/react-query'

const ENDPOINT = "/COEGrade/GetSource"

export default function useQ_COEGrade_GetAll() {
    const query = useQuery<ICoeGrade[]>({
        queryKey: [ENDPOINT],
        queryFn: async () => {
            const res = await baseAxios.get(ENDPOINT)
            return res.data.data
        }
    })
    return query
}
