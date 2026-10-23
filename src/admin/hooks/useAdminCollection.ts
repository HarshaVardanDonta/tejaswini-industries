import { useAdminDocument } from './useAdminDocument'

export function useAdminCollection<T>(
  docType: string
) {
  return useAdminDocument<T[]>(`*[_type == $type] | order(_id asc)`, { type: docType })
}
