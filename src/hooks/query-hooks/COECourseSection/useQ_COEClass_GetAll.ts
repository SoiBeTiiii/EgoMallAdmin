import baseAxios from '@/api/baseAxios';
import { useQuery } from '@tanstack/react-query';

export default function useQ_COECourseSection_GetAll() {
  const ENDPOINT = "/COECourseSection/getall"

  const query = useQuery<ICOECourseSection[]>({
    queryKey: ["useQ_COECourseSection_GetAll"],
    queryFn: async () => {
      const response = await baseAxios.get(ENDPOINT);
      return response.data.data || [];
    },
  })
  return query;
}
