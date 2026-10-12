import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  code: string
  eyebrow: string
  title: string
  body?: string
  id?: string
  className?: string
}

/** Spec-sheet style heading: mono code + eyebrow, wide display title, optional lede. */
export function SectionHeading({ code, eyebrow, title, body, id, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
        <span className="text-ember-500">{code}</span> / {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.05] font-extrabold tracking-tight [font-stretch:112%]"
      >
        {title}
      </h2>
      {body && <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">{body}</p>}
    </div>
  )
}
