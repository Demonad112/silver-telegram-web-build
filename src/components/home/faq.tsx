import { SectionHeading } from "@/components/site/section-heading"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqs } from "@/content/home"

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <SectionHeading id="faq-title" code="OI-007" eyebrow="FAQ" title="Straight answers." />
        <Accordion className="border-t border-line">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-b border-line">
              <AccordionTrigger className="py-5 text-base font-medium hover:no-underline hover:text-ember-400">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
