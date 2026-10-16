import type { LeakId } from '../config/leaks'

// 8 booking-leak icons, one stroke weight, drawn on a 48 grid.
const paths: Record<LeakId, JSX.Element> = {
  'slow-mobile': (
    <>
      <rect x="13" y="5" width="22" height="38" />
      <path d="M21 39h6" />
      <circle cx="24" cy="21" r="7" />
      <path d="M24 17v4l3 2" />
    </>
  ),
  'hidden-button': (
    <>
      <rect x="6" y="10" width="28" height="14" strokeDasharray="3 3" />
      <path d="M26 22l14 6-6 2-2 7z" />
    </>
  ),
  'no-offer': (
    <>
      <path d="M6 22V8h14l20 20-14 14z" />
      <circle cx="14" cy="15" r="2.5" />
      <path d="M22 26l6 6M28 26l-6 6" />
    </>
  ),
  'no-google': (
    <>
      <path d="M24 43s-13-12-13-23a13 13 0 0126 0c0 11-13 23-13 23z" />
      <circle cx="24" cy="20" r="4.5" />
      <path d="M6 42l36-36" />
    </>
  ),
  'no-capture': (
    <>
      <rect x="5" y="11" width="38" height="26" />
      <path d="M5 13l19 13 19-13" />
      <path d="M34 4l8 8M42 4l-8 8" />
    </>
  ),
  'slow-replies': (
    <>
      <path d="M6 8h36v24H20l-9 8v-8H6z" />
      <path d="M16 20h.01M24 20h.01M32 20h.01" strokeWidth="4" />
    </>
  ),
  'weak-story': (
    <>
      <rect x="5" y="8" width="38" height="32" />
      <path d="M5 34l11-12 9 9 6-6 12 11" />
      <circle cx="33" cy="17" r="3" />
    </>
  ),
  'no-past-guests': (
    <>
      <circle cx="20" cy="16" r="6" />
      <path d="M8 40c0-8 5-13 12-13s12 5 12 13" />
      <path d="M36 12a9 9 0 016 14M42 26l-4-1M42 26l1-4" />
    </>
  ),
}

export function LeakIcon({ id, className = '' }: { id: LeakId; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      aria-hidden="true"
    >
      {paths[id]}
    </svg>
  )
}
