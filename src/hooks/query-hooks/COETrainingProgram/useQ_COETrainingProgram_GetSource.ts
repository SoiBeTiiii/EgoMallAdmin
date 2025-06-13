import baseAxios from '@/api/baseAxios'
import { useQuery } from '@tanstack/react-query'

export default function useQ_COETrainingProgram_GetSource() {
    const query = useQuery<ICoeTrainingProgram[]>({
        queryKey: ["useQ_COETrainingProgram_GetSource"],
        queryFn: async () => {
            const res = await baseAxios.get("/COEGrade/GetSource")
            return res.data.data
        }
    })
    return query
}
