import { Icon } from '../Icon'

export function BlogPagination() {
  return (
    <div className="flex justify-center pt-space-8">
      <div className="flex gap-space-2">
        <button
          type="button"
          className="w-10 h-10 border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-100"
          aria-label="Previous page"
        >
          <Icon name="chevron_left" filled={false} />
        </button>
        <button
          type="button"
          className="w-10 h-10 border-2 border-primary bg-primary text-on-primary font-label text-label flex items-center justify-center"
        >
          1
        </button>
        <button
          type="button"
          className="w-10 h-10 border border-gray-300 bg-white text-gray-700 font-label text-label flex items-center justify-center hover:bg-gray-100"
        >
          2
        </button>
        <button
          type="button"
          className="w-10 h-10 border border-gray-300 bg-white text-gray-700 font-label text-label flex items-center justify-center hover:bg-gray-100"
        >
          3
        </button>
        <button
          type="button"
          className="w-10 h-10 border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-100"
          aria-label="Next page"
        >
          <Icon name="chevron_right" filled={false} />
        </button>
      </div>
    </div>
  )
}
