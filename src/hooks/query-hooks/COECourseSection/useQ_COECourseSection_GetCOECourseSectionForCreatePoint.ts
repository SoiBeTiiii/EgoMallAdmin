import baseAxios from '@/api/baseAxios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_COECourseSection_GetCOECourseSectionForCreatePoint({
  params = "",
  options
}: {
  params?: string,
  options?: Partial<UseQueryOptions<ICOECourseSection[], Error>>
} = {}) {
  const ENDPOINT = "/COECourseSection/GetCOECourseSectionForCreatePoint"

  const query = useQuery<ICOECourseSection[]>({
    queryKey: [ENDPOINT + params],
    queryFn: async () => {
      const response = await baseAxios.get(ENDPOINT + params);
      return response.data.data || [];
    },
    ...options
  })
  return query;
}
