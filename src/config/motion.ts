// Every timing on the site lives here. Seconds, for GSAP.
export const motion = {
  snap: { duration: 0.18, ease: 'power4.out' },
  deal: { duration: 0.42, stagger: 0.06, ease: 'back.out(1.6)' },
  swing: { duration: 0.9, ease: 'elastic.out(1, 0.45)' },
  wipe: { duration: 0.36, ease: 'power2.inOut' },
  roll: { out: 0.28, in: 0.42, ease: 'back.out(2)', interval: 2.4 },
  cast: { out: 0.12, reel: 0.16, pocket: 0.6, cooldown: 4 },
  hop: { duration: 0.36, height: 18 },
  fade: { duration: 0.2 },
} as const
