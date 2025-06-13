import baseAxios from '@/api/baseAxios'
import { useQuery } from '@tanstack/react-query'

export default function useQ_COEGradeSubject_GetAll() {
    const query = useQuery({
        queryKey: ["useQ_COEGradeSubject_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/COEGradeSubject/GetAll")
            return res.data.data
        }
    })
    return query
}
