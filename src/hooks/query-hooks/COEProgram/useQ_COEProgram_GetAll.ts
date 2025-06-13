import baseAxios from "@/api/baseAxios";
import { useQuery } from "@tanstack/react-query";

export default function useQ_COEProgram_GetAll() {
    const query = useQuery<ICoeProgram[]>({
        queryKey: ["useQ_COEProgram_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/COEProgram/getAll")
            return res.data.data
        }
    })
    return query
}
