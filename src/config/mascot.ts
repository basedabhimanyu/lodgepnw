// Every place Bandit appears. Bandit is drawn in code (src/components/bandit): `art` says which
// pose or animated scene each spot shows. To swap in a rendered file later, put it in
// public/mascot/<file> and set `ready: true`; the file then replaces the drawing.
import type { Pose } from '../components/bandit/Bandit'
import type { Outfit } from '../components/bandit/Figure'
import type { SceneId } from '../components/bandit/Scenes'

export type MascotSlotId =
  | 'nav-badge' | 'hero-loop' | 'hero-peek' | 'marquee-hop' | 'leaks-perch'
  | 'step-1' | 'step-2' | 'step-3' | 'plans-lean' | 'math-canoe' | 'bandit-hero'
  | 'bandit-var-1' | 'bandit-var-2' | 'bandit-var-3' | 'bandit-var-4'
  | 'guarantee-stamp' | 'faq-peek' | 'cta-cast' | 'footer-sleep'

export type MascotArt = { pose: Pose; outfit?: Outfit } | { scene: SceneId; outfit?: Outfit }

export type MascotSlot = {
  file: string
  type: 'image' | 'video'
  width: number
  height: number
  position: string
  ready: boolean
  art: MascotArt
  note: string
}

export const mascot: Record<MascotSlotId, MascotSlot> = {
  'nav-badge': { file: 'nav-badge.png', type: 'image', width: 40, height: 40, position: 'Beside the logo', ready: false, art: { pose: 'head' }, note: 'Head only, masked face, beanie' },
  'hero-loop': { file: 'hero-loop.mp4', type: 'video', width: 480, height: 300, position: 'Hero video card', ready: false, art: { scene: 'desk' }, note: 'Bandit at a lodge desk handing over a key card' },
  'hero-peek': { file: 'hero-peek.png', type: 'image', width: 150, height: 110, position: 'Over the hero card top-right corner', ready: false, art: { pose: 'peek' }, note: 'Peeking, paws on the edge' },
  'marquee-hop': { file: 'marquee-hop.png', type: 'image', width: 64, height: 72, position: 'Hops along the ticker top', ready: false, art: { pose: 'hop' }, note: 'Full body, mid-hop' },
  'leaks-perch': { file: 'leaks-perch.png', type: 'image', width: 170, height: 190, position: 'Top-right corner of the leak grid', ready: false, art: { pose: 'perch' }, note: 'Sitting, loot sack raised' },
  'step-1': { file: 'step-1.png', type: 'image', width: 120, height: 140, position: 'Beside folio row 01', ready: false, art: { pose: 'phone' }, note: 'Holding a phone, squinting' },
  'step-2': { file: 'step-2.png', type: 'image', width: 120, height: 140, position: 'Beside folio row 02', ready: false, art: { pose: 'hammer' }, note: 'Hammer raised' },
  'step-3': { file: 'step-3.png', type: 'image', width: 120, height: 140, position: 'Beside folio row 03', ready: false, art: { pose: 'wave' }, note: 'Waving a guest in' },
  'plans-lean': { file: 'plans-lean.png', type: 'image', width: 124, height: 190, position: 'Leaning on the Start here clipboard', ready: false, art: { pose: 'lean' }, note: 'Elbow on the clipboard, thumbs-up' },
  'math-canoe': { file: 'math-canoe.mp4', type: 'video', width: 420, height: 236, position: 'The math band video card', ready: false, art: { scene: 'canoe' }, note: 'Paddling a canoe across a lake' },
  'bandit-hero': { file: 'bandit-hero.mp4', type: 'video', width: 300, height: 533, position: 'Meet Bandit phone frame, 9:16', ready: false, art: { scene: 'portrait' }, note: 'Full length, blinks, tosses his sack' },
  'bandit-var-1': { file: 'bandit-var-1.png', type: 'image', width: 140, height: 140, position: 'Outfit tile 1', ready: false, art: { pose: 'bust', outfit: 'fly' }, note: 'Fly-fishing vest' },
  'bandit-var-2': { file: 'bandit-var-2.png', type: 'image', width: 140, height: 140, position: 'Outfit tile 2', ready: false, art: { pose: 'bust', outfit: 'rain' }, note: 'Rain shell' },
  'bandit-var-3': { file: 'bandit-var-3.png', type: 'image', width: 140, height: 140, position: 'Outfit tile 3', ready: false, art: { pose: 'bust', outfit: 'apron' }, note: 'Innkeeper apron' },
  'bandit-var-4': { file: 'bandit-var-4.png', type: 'image', width: 140, height: 140, position: 'Outfit tile 4', ready: false, art: { pose: 'bust', outfit: 'snow' }, note: 'Snow gear' },
  'guarantee-stamp': { file: 'guarantee-stamp.png', type: 'image', width: 200, height: 220, position: 'Guarantee band, holding the stamp', ready: false, art: { pose: 'stamp' }, note: 'Raising a rubber stamp' },
  'faq-peek': { file: 'faq-peek.png', type: 'image', width: 140, height: 90, position: 'Peeking over the FAQ top edge', ready: false, art: { pose: 'eyes' }, note: 'Eyes and mask over the edge' },
  'cta-cast': { file: 'cta-cast.mp4', type: 'video', width: 420, height: 300, position: 'Final call to action video card', ready: false, art: { scene: 'heist' }, note: 'Bags a guest off the OTA fee tag, drops them at your door' },
  'footer-sleep': { file: 'footer-sleep.png', type: 'image', width: 220, height: 110, position: 'Asleep on the giant wordmark', ready: false, art: { pose: 'sleep' }, note: 'Curled up, tail over nose' },
}
