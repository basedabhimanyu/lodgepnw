import { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { destinationNames, pinnedDestination } from '../config/destinations'
import { motion } from '../config/motion'

type DestinationState = {
  name: string
  index: number
  pinned: string | null
  setHovering: (hovering: boolean) => void
}

const DestinationContext = createContext<DestinationState>({
  name: destinationNames[0],
  index: 0,
  pinned: null,
  setHovering: () => {},
})

// One clock for every rotating destination on the page. Pauses on hover and while the tab is hidden.
export function DestinationProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0)
  const [pinned, setPinned] = useState<string | null>(null)
  const hovering = useRef(false)

  useEffect(() => {
    const pin = pinnedDestination(window.location.search)
    if (pin) {
      setPinned(pin)
      setIndex(destinationNames.indexOf(pin))
    }
  }, [])

  useEffect(() => {
    if (pinned) return
    const id = window.setInterval(() => {
      if (hovering.current || document.hidden) return
      setIndex((i) => (i + 1) % destinationNames.length)
    }, motion.roll.interval * 1000)
    return () => window.clearInterval(id)
  }, [pinned])

  const value: DestinationState = {
    name: destinationNames[index],
    index,
    pinned,
    setHovering: (h) => {
      hovering.current = h
    },
  }
  return <DestinationContext.Provider value={value}>{children}</DestinationContext.Provider>
}

export const useDestination = () => useContext(DestinationContext)
