import baseAxios from "@/api/baseAxios";
import { useMutation } from "@tanstack/react-query";

const ENDPOINT = "/COEGradeSubject"

export default function useM_COEGradeSubject({
    endpointSuffix = ""
}: {
    endpointSuffix: string
}) {
    const mutation = useMutation({
        mutationFn: async (body: ICoeGradeSubject[] | ICoeGradeSubject) => {
            const res = await baseAxios.post(ENDPOINT + endpointSuffix, body)
            return res
        }
    })
    return mutation
}
