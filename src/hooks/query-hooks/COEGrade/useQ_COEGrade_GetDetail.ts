import baseAxios from '@/api/baseAxios'
import { useQuery } from '@tanstack/react-query'

const ENDPOINT = "/COEGrade/GetDetail"

export default function useQ_COEGrade_GetDetail({
    params = ""
}: {
    params?: string
} = {}) {
    const query = useQuery<ICoeGradeSubject[]>({
        queryKey: [ENDPOINT + params],
        queryFn: async () => {
            const res = await baseAxios.get(ENDPOINT + params)
            return res.data.data
        }
    })
    return query
}
