import { useAdminDocument } from './useAdminDocument'

export function useAdminCollection<T>(
  sanityType: string
) {
  return useAdminDocument<T[]>(`*[_type == $type] | order(_id asc)`, { type: sanityType })
}
