// A hand-painted underline. Animations draw it in (data-brush) on scroll.
export function BrushUnderline({ className = '', color = '#CFE36B' }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 300 20"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute left-0 w-full ${className}`}
      aria-hidden="true"
    >
      <path
        data-brush
        d="M4 13 C 50 6, 110 4, 160 9 S 250 15, 296 7"
        fill="none"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="0"
      />
    </svg>
  )
}
