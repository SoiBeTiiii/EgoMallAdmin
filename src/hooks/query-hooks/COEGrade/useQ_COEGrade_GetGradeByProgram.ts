import baseAxios from '@/api/baseAxios'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

const ENDPOINT = "/COEGrade/GetGradeByProgram"

export default function useQ_COEGrade_GetGradeByProgram({
    params = "",
    option
}: {
    params?: string,
    option?: Partial<UseQueryOptions<ICoeGrade[], Error>>
} = {}) {
    const query = useQuery<ICoeGrade[]>({
        queryKey: [ENDPOINT + params],
        queryFn: async () => {
            const res = await baseAxios.get(ENDPOINT + params)
            return res.data.data
        },
        ...option
    })
    return query
}
