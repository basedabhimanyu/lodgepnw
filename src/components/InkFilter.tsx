// Shared SVG filter that roughens stamp edges like ink on paper.
export function InkFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <filter id="ink" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="1" seed="4" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" result="rough" />
        <feComponentTransfer in="noise" result="speckle">
          <feFuncA type="discrete" tableValues="1 1 1 1 1 0.55 1 1 1 1" />
        </feComponentTransfer>
        <feComposite in="rough" in2="speckle" operator="in" />
      </filter>
    </svg>
  )
}
