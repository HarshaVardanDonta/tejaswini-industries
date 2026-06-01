export function PageLoading({ label = 'Loading content…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[40vh] font-body-sm text-body-sm text-gray-500">
      {label}
    </div>
  )
}
