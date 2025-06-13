import baseAxios from '@/api/baseAxios'
import { useMutation } from '@tanstack/react-query'

export default function useM_COECourseSection_UpdateList() {
  const ENDPOINT = "/COECourseSection/UpdateList"
  const mutation = useMutation({
    mutationFn: async (body: ICOECourseSection[]) => {
      const res = await baseAxios.post(ENDPOINT, body)
      return res
    }
  })
  return mutation
}
