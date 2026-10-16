// Every destination the site rotates through, with map coordinates (lat, lon).
export type Destination = { name: string; state: 'WA' | 'OR' | 'ID'; lat: number; lon: number }

export const destinations: Destination[] = [
  { name: 'Lake Chelan', state: 'WA', lat: 47.84, lon: -120.02 },
  { name: 'Leavenworth', state: 'WA', lat: 47.6, lon: -120.66 },
  { name: 'Winthrop', state: 'WA', lat: 48.48, lon: -120.19 },
  { name: 'Mazama', state: 'WA', lat: 48.59, lon: -120.4 },
  { name: 'Manson', state: 'WA', lat: 47.88, lon: -120.16 },
  { name: 'Wenatchee', state: 'WA', lat: 47.42, lon: -120.31 },
  { name: 'Cle Elum', state: 'WA', lat: 47.2, lon: -120.94 },
  { name: 'Roslyn', state: 'WA', lat: 47.22, lon: -120.99 },
  { name: 'Packwood', state: 'WA', lat: 46.61, lon: -121.67 },
  { name: 'Ashford', state: 'WA', lat: 46.76, lon: -122.03 },
  { name: 'Index', state: 'WA', lat: 47.82, lon: -121.55 },
  { name: 'Glacier', state: 'WA', lat: 48.89, lon: -121.95 },
  { name: 'Friday Harbor', state: 'WA', lat: 48.53, lon: -123.02 },
  { name: 'Orcas Island', state: 'WA', lat: 48.65, lon: -122.9 },
  { name: 'Whidbey Island', state: 'WA', lat: 48.1, lon: -122.55 },
  { name: 'Port Townsend', state: 'WA', lat: 48.12, lon: -122.76 },
  { name: 'Ocean Shores', state: 'WA', lat: 46.97, lon: -124.16 },
  { name: 'Long Beach', state: 'WA', lat: 46.35, lon: -124.05 },
  { name: 'Cannon Beach', state: 'OR', lat: 45.89, lon: -123.96 },
  { name: 'Manzanita', state: 'OR', lat: 45.72, lon: -123.93 },
  { name: 'Lincoln City', state: 'OR', lat: 44.96, lon: -124.01 },
  { name: 'Depoe Bay', state: 'OR', lat: 44.81, lon: -124.06 },
  { name: 'Hood River', state: 'OR', lat: 45.71, lon: -121.52 },
  { name: 'Government Camp', state: 'OR', lat: 45.3, lon: -121.75 },
  { name: 'Sisters', state: 'OR', lat: 44.29, lon: -121.55 },
  { name: 'Bend', state: 'OR', lat: 44.06, lon: -121.31 },
  { name: 'Sunriver', state: 'OR', lat: 43.88, lon: -121.44 },
  { name: 'Joseph', state: 'OR', lat: 45.35, lon: -117.23 },
  { name: 'Sandpoint', state: 'ID', lat: 48.28, lon: -116.55 },
  { name: "Coeur d'Alene", state: 'ID', lat: 47.68, lon: -116.78 },
]

export const destinationNames = destinations.map((d) => d.name)

// ?city=Leavenworth pins one destination (case-insensitive, matches config names only).
export function pinnedDestination(search: string): string | null {
  const wanted = new URLSearchParams(search).get('city')
  if (!wanted) return null
  const match = destinations.find((d) => d.name.toLowerCase() === wanted.trim().toLowerCase())
  return match ? match.name : null
}
