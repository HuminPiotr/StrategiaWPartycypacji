import { useMemo, useState } from 'react'
import { tools, toolFilters, sections } from '../data/content.js'
import SectionShell from '../components/SectionShell.jsx'
import Chip from '../components/Chip.jsx'

const s = sections[6]

export default function Tools() {
  const [active, setActive] = useState(() => new Set())

  const toggle = (id) =>
    setActive((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  // Narzędzie pasuje, jeśli ma WSZYSTKIE wybrane tagi (zawężanie). Brak filtrów → wszystkie.
  const visible = useMemo(() => {
    if (active.size === 0) return tools
    return tools.filter((t) => [...active].every((f) => t.tags.includes(f)))
  }, [active])

  return (
    <SectionShell id="tools" n={s.n} label={s.label} className="tools-section">
      <h2 data-reveal>Jakie narzędzia działają?</h2>
      <p className="lead section__intro" data-reveal>
        Zaznacz, czego szukasz. Lista zawęża się do narzędzi, które w debacie uznano za
        sensowne w danym kontekście.
      </p>

      <div className="tools__filters" data-reveal>
        {toolFilters.map((f) => (
          <Chip key={f.id} active={active.has(f.id)} onClick={() => toggle(f.id)} accent="navy">
            {f.label}
          </Chip>
        ))}
        {active.size > 0 && (
          <button type="button" className="tools__clear" onClick={() => setActive(new Set())}>
            Wyczyść filtry
          </button>
        )}
      </div>

      <p className="tools__count" role="status">
        {visible.length === 0
          ? 'Żadne pojedyncze narzędzie nie spełnia wszystkich kryteriów naraz — w praktyce łączy się kilka metod.'
          : `Pasujące narzędzia: ${visible.length}`}
      </p>

      <ul className="tools__grid" data-reveal>
        {visible.map((t) => (
          <li key={t.id} className="tools__card card">
            <h3 className="tools__name">{t.name}</h3>
            <p className="tools__desc">{t.desc}</p>
            <ul className="tools__tags">
              {t.tags.map((tag) => (
                <li key={tag}>{toolFilters.find((f) => f.id === tag)?.label}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}
