import baseAxios from '@/api/baseAxios'
import { useMutation } from '@tanstack/react-query'

export default function useM_COEClass_Delete() {
  const ENDPOINT = "/COEClass/Delete"
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await baseAxios.post(ENDPOINT, { id: id })
      return res
    }
  })
  return mutation
}
