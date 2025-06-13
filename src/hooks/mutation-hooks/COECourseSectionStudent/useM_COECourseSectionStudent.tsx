import baseAxios from "@/api/baseAxios";
import { useMutation } from "@tanstack/react-query";

const ENDPOINT = "/COECourseSectionStudent"
export default function useM_COECourseSectionStudent({
    endpointSuffix = ""
}: {
    endpointSuffix: string
}) {
    const query = useMutation({
        mutationFn: async (body: ICoeCourseSectionStudent | ICoeCourseSectionStudent[]) => {
            const res = await baseAxios.post(ENDPOINT + endpointSuffix, body)
            return res.data.data
        },
    })
    return query
}
