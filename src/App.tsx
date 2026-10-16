import { InkFilter } from './components/InkFilter'
import { DestinationProvider } from './lib/destination'
import { MobileBar, Nav, TopBar } from './sections/Chrome'
import { Hero } from './sections/Hero'
import { Ticker } from './sections/Ticker'
import { Leaks } from './sections/Leaks'
import { HowItWorks } from './sections/HowItWorks'
import { Plans } from './sections/Plans'
import { TheMath } from './sections/TheMath'
import { MeetBandit } from './sections/MeetBandit'
import { Guarantee } from './sections/Guarantee'
import { Faq } from './sections/Faq'
import { FinalCta } from './sections/FinalCta'
import { Footer } from './sections/Footer'
import { useSiteMotion } from './lib/useSiteMotion'

export default function App() {
  useSiteMotion()
  return (
    <DestinationProvider>
      <InkFilter />
      <a href="#start" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:bg-lichen focus:p-3">
        Skip to the teardown form
      </a>
      <TopBar />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Leaks />
        <HowItWorks />
        <Plans />
        <TheMath />
        <MeetBandit />
        <Guarantee />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
    </DestinationProvider>
  )
}
