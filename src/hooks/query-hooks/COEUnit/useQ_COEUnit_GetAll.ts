import baseAxios from '@/api/baseAxios'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

const ENDPOINT = "/COEUnit/getAll"
export default function useQ_COEUnit_GetAll({
    options
}: {
    options?: Partial<UseQueryOptions<ICoeUnit[], Error>>
} = {}) {
    const query = useQuery<ICoeUnit[]>({
        queryKey: [ENDPOINT],
        queryFn: async () => {
            const res = await baseAxios.get(ENDPOINT)
            return res.data.data
        },
        ...options
    })
    return query
}
