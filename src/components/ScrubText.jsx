import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../hooks/useReveal.js'

gsap.registerPlugin(ScrollTrigger)

// Tekst, którego słowa rozjaśniają się sekwencyjnie w miarę scrolla (scrub).
// Reduced motion → pełna czytelność od razu, bez animacji.
export default function ScrubText({
  text,
  as: Tag = 'p',
  className = '',
  start = 'top 80%',
  end = 'top 35%',
}) {
  const ref = useRef(null)
  const words = text.split(' ')

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const spans = root.querySelectorAll('[data-word]')
    if (!spans.length) return

    if (prefersReducedMotion()) {
      gsap.set(spans, { opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.5,
          scrollTrigger: {
            trigger: root,
            start,
            end,
            scrub: true,
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [text, start, end])

  return (
    <Tag ref={ref} className={`scrub ${className}`}>
      {words.map((w, i) => (
        <span key={i} data-word className="scrub__word">
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
