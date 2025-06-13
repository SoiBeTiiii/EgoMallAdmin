import baseAxios from '@/api/baseAxios'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

const ENDPOINT = "/COECLO/GetSource"
export default function useQ_COECLO_GetSource({
    options,
    params = ""
}: {
    options?: Partial<UseQueryOptions<ICoeSubject[], Error>>,
    params?: string
} = {}) {
    const query = useQuery<ICoeSubject[]>({
        queryKey: [ENDPOINT + params],
        queryFn: async () => {
            const res = await baseAxios.get(ENDPOINT + params)
            return res.data.data
        },
        ...options
    })
    return query
}

