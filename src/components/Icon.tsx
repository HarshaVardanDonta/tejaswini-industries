type IconProps = {
  name: string
  className?: string
  size?: number
  filled?: boolean
}

export function Icon({
  name,
  className = '',
  size,
  filled = true,
}: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? '' : 'icon-outline'} ${className}`.trim()}
      style={size ? { fontSize: size } : undefined}
    >
      {name}
    </span>
  )
}
