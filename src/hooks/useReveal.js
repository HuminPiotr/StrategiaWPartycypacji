import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Kinowe wejście dzieci [data-reveal]: ciężki fade-up z rozmyciem (blur→0),
// sprężysty ease, stagger. Reduced motion → natychmiastowe pokazanie bez ruchu.
export function useReveal(options = {}) {
  const ref = useRef(null)
  // blur=0 → lekkie, szybkie wejście (np. hero, który jest pierwszym widokiem);
  // blur>0 → ciężki, kinowy rewal dla sekcji, do których się DOściela.
  const {
    selector = '[data-reveal]',
    y = 34,
    stagger = 0.09,
    blur = 10,
    duration = 0.95,
  } = options

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = root.querySelectorAll(selector)
    if (!targets.length) return

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0, filter: 'none' })
      return
    }

    const fromFilter = blur > 0 ? `blur(${blur}px)` : 'none'

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y, filter: fromFilter },
        {
          opacity: 1,
          y: 0,
          filter: blur > 0 ? 'blur(0px)' : 'none',
          duration,
          ease: 'expo.out',
          stagger,
          scrollTrigger: {
            trigger: root,
            start: 'top 82%',
            once: true,
            // gdyby trigger już minął przy montażu (np. powrót w środek strony)
            invalidateOnRefresh: true,
          },
        },
      )
    }, root)

    // Web-fonty ładują się asynchronicznie i przesuwają layout — przelicz pozycje
    // triggerów po ich załadowaniu, by nic nie zostało zablokowane jako niewidoczne.
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {})
    }

    // Bezpiecznik: gdyby trigger nie wystartował (treść > efekt) — po krótkim czasie
    // odsłoń WYŁĄCZNIE elementy już widoczne w viewporcie. Reszta nadal czeka na scroll.
    const safety = window.setTimeout(() => {
      targets.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) {
          gsap.to(el, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.3, overwrite: 'auto' })
        }
      })
    }, 2000)

    return () => {
      window.clearTimeout(safety)
      ctx.revert()
    }
  }, [selector, y, stagger])

  return ref
}

export { prefersReducedMotion }
