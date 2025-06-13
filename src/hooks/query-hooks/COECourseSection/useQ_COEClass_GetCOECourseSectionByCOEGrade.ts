import baseAxios from '@/api/baseAxios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_COEClass_GetCOECourseSectionByCOEGrade({
  params = "",
  options
}: {
  params?: string,
  options?: Partial<UseQueryOptions<ICOECourseSection[], Error>>
} = {}) {
  const ENDPOINT = "/COECourseSection/GetCOECourseSectionByCOEGrade"

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
