import baseAxios from '@/api/baseAxios'
import { useMutation } from '@tanstack/react-query'

export default function useM_COEClassStudent_Delete() {
  const ENDPOINT = "/COECourseSectionStudent/Delete"
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await baseAxios.post(ENDPOINT, { id: id })
      return res
    }
  })
  return mutation
}
