import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stages, stagePanelLabels, sections } from '../data/content.js'
import SectionShell from '../components/SectionShell.jsx'
import { prefersReducedMotion } from '../hooks/useReveal.js'

gsap.registerPlugin(ScrollTrigger)

const s = sections[5]

export default function WhenInvolve() {
  const [active, setActive] = useState(0)
  const stage = stages[active]
  const timelineRef = useRef(null)
  const progressRef = useRef(null)

  // Linia procesu „rysuje się” w miarę przewijania sekcji (scrub).
  useEffect(() => {
    const line = progressRef.current
    const trig = timelineRef.current
    if (!line || !trig) return
    if (prefersReducedMotion()) {
      gsap.set(line, { scaleY: 1 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: trig, start: 'top 70%', end: 'bottom 70%', scrub: true },
        },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <SectionShell id="when" n={s.n} label={s.label} className="when-section">
      <h2 data-reveal>Kiedy włączać mieszkańców?</h2>
      <p className="lead section__intro" data-reveal>
        Strategia to ścieżka etapów. Klikaj kropki — w dowolnej kolejności — i sprawdź, gdzie
        udział mieszkańców ma sens, a gdzie bywa pozorny.
      </p>

      <div className="when__layout" data-reveal>
        <ol
          className="when__timeline"
          role="tablist"
          aria-label="Etapy procesu strategii"
          ref={timelineRef}
        >
          <span className="when__progress" ref={progressRef} aria-hidden="true" />
          {stages.map((st, i) => (
            <li key={st.id} className="when__node">
              <button
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="when-panel"
                className={`when__dot ${i === active ? 'when__dot--active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="when__dot-mark" aria-hidden="true" />
                <span className="when__dot-label">{st.name}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="when__panel card" id="when-panel" role="tabpanel" aria-live="polite">
          <h3 className="when__panel-title">{stage.name}</h3>
          <dl className="when__panel-grid">
            <div className="when__field when__field--good">
              <dt>{stagePanelLabels.potential}</dt>
              <dd>{stage.potential}</dd>
            </div>
            <div className="when__field when__field--risk">
              <dt>{stagePanelLabels.risk}</dt>
              <dd>{stage.risk}</dd>
            </div>
            <div className="when__field">
              <dt>{stagePanelLabels.tools}</dt>
              <dd>
                <ul className="when__tools">
                  {stage.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="when__field when__field--debate">
              <dt>{stagePanelLabels.debate}</dt>
              <dd className="voice">{stage.debate}</dd>
            </div>
          </dl>
        </div>
      </div>
    </SectionShell>
  )
}
