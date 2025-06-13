import baseAxios from '@/api/baseAxios'
import { useQuery } from '@tanstack/react-query'

export default function useQ_COEPLO_GetCOEPLOByGrade({ params = "" }: { params?: string } = {}) {
    const query = useQuery<ICoePLO[]>({
        queryKey: ["useQ_COEPLO_GetCOEPLOByGrade", params],
        queryFn: async () => {
            const res = await baseAxios.get("/COEPLO/GetCOEPLOByGrade" + params)
            if (!res.data.isSuccess) throw Error("Có lỗi xảy ra!")
            return res.data.data
        }
    })
    return query
}
