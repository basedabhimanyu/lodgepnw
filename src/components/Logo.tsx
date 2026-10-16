export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" fill="#1F4D3A" />
      <path d="M5 25 L16 6 L27 25 Z" fill="#CFE36B" />
      <path d="M11 25 L16 16 L21 25 Z" fill="#1F4D3A" />
      <rect x="4" y="25" width="24" height="2" fill="#CFE36B" />
    </svg>
  )
}

export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5 text-basalt no-underline" aria-label="LodgePNW home">
      <LogoMark className="h-9 w-9 border-2 border-basalt" />
      <span className="font-display text-[26px] font-black uppercase leading-none tracking-tight">
        Lodge<span className="text-fir">PNW</span>
      </span>
    </a>
  )
}
