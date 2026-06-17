import { useState } from 'react'
import { reasons, sections } from '../data/content.js'
import SectionShell from '../components/SectionShell.jsx'

const s = sections[1]

export default function WhyStrategies() {
  // Wiele kafelków można otworzyć naraz — by zobaczyć napięcie między motywacjami.
  const [open, setOpen] = useState(() => new Set())

  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <SectionShell id="why" n={s.n} label={s.label}>
      <h2 data-reveal>Po co w ogóle tworzy się strategie?</h2>
      <p className="lead section__intro" data-reveal>
        Powody bywają sprzeczne. Otwórz kilka naraz i zobacz, jak trudno je ze sobą pogodzić.
      </p>

      <ul className="why__grid" data-reveal>
        {reasons.map((r) => {
          const isOpen = open.has(r.id)
          return (
            <li key={r.id} className={`why__card card ${isOpen ? 'why__card--open' : ''}`}>
              <button
                type="button"
                className="why__card-btn"
                aria-expanded={isOpen}
                onClick={() => toggle(r.id)}
              >
                <span className="why__card-label">{r.label}</span>
                <span className="why__card-sign" aria-hidden="true">
                  {isOpen ? '–' : '+'}
                </span>
              </button>
              {isOpen && <p className="why__card-note">{r.note}</p>}
            </li>
          )
        })}
      </ul>
    </SectionShell>
  )
}
