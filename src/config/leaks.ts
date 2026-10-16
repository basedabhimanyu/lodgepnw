export type LeakId = 'slow-mobile' | 'hidden-button' | 'no-offer' | 'no-google' | 'no-capture' | 'slow-replies' | 'weak-story' | 'no-past-guests'

export const leaks: { id: LeakId; title: string; line: string }[] = [
  { id: 'slow-mobile', title: 'Slow mobile', line: "4+ seconds and they're back on Airbnb" },
  { id: 'hidden-button', title: 'Hidden book button', line: '3 taps to see dates is 2 too many' },
  { id: 'no-offer', title: 'No reason to book direct', line: 'Give them one they can feel' },
  { id: 'no-google', title: 'No Google booking link', line: 'Maps sends them to the OTA' },
  { id: 'no-capture', title: 'No email capture', line: 'Every past guest, gone' },
  { id: 'slow-replies', title: 'Slow inquiry replies', line: 'First answer wins the booking' },
  { id: 'weak-story', title: 'Weak story', line: 'Your place is better than your page' },
  { id: 'no-past-guests', title: 'No past-guest emails', line: 'Repeat guests rebook through Airbnb' },
]
