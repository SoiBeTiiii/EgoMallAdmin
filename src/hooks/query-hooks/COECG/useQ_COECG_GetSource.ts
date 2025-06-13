import baseAxios from '@/api/baseAxios'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

const ENDPOINT = "/COECG/GetSource"
export default function useQ_COECG_GetSource({
    options,
    params = ""
}: {
    options?: Partial<UseQueryOptions<ICoeCG[], Error>>,
    params?: string
} = {}) {
    const query = useQuery<ICoeCG[]>({
        queryKey: [ENDPOINT + params],
        queryFn: async () => {
            const res = await baseAxios.get(ENDPOINT + params)
            return res.data.data
        },
        ...options
    })
    return query

}
