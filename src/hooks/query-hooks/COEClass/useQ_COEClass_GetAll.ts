import baseAxios from '@/api/baseAxios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const ENDPOINT = "/COEClass/getall"
export default function useQ_COEClass_GetAll({
  options,
  params
}: {
  options?: Partial<UseQueryOptions<ICOEClass[], Error>>,
  params?: string
} = {}) {
  const query = useQuery<ICOEClass[]>({
    queryKey: [ENDPOINT + params],
    queryFn: async () => {
      const response = await baseAxios.get(ENDPOINT + params);
      return response.data.data || [];
    },
    ...options
  })
  return query;
}
