import { Faq } from "@/components/home/faq"
import { Hero } from "@/components/home/hero"
import { FinalCta, HowItWorks, Leaks, Services, Trades, Trust } from "@/components/home/sections"

export default function Home() {
  return (
    <>
      <Hero />
      <Leaks />
      <Services />
      <HowItWorks />
      <Trust />
      <Trades />
      <Faq />
      <FinalCta />
    </>
  )
}
