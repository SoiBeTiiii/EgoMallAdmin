import baseAxios from "@/api/baseAxios";
import { useQuery } from "@tanstack/react-query";

const ENDPOINT = "/COEGradeSubject/GetSubjectByGrade"

export default function useQ_COEGradeSubject_GetSubjectByGrade({
    params = ""
}: {
    params?: string
}) {
    const query = useQuery<ICoeGradeSubject[]>({
        queryKey: [ENDPOINT + params],
        queryFn: async () => {
            const res = await baseAxios.get(ENDPOINT + params)
            return res.data.data
        }
    })
    return query
}
