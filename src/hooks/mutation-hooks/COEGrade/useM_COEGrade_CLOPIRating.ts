import baseAxios from '@/api/baseAxios'
import { useMutation } from '@tanstack/react-query'

export default function useM_COEGrade_CLOPIRating() {
    const mutation = useMutation({
        mutationFn: async (body: ICoeCLOPI[]) => {
            const res = await baseAxios.post("/COEGrade/CLOPIRating", body)
            return res
        }
    })
    return mutation
}
