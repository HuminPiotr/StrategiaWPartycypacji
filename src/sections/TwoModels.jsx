import { useState } from 'react'
import { models, sections } from '../data/content.js'
import SectionShell from '../components/SectionShell.jsx'
import Chip from '../components/Chip.jsx'

const s = sections[4]

function ModelCol({ model, facet, side }) {
  return (
    <div className={`models__col models__col--${side}`} style={{ '--m-accent': `var(--${model.accent})` }}>
      <p className="models__tag">{side === 'a' ? 'Model A' : 'Model B'}</p>
      <h3 className="models__name">{model.name}</h3>
      <ul className="models__list">
        {model[facet].map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default function TwoModels() {
  const [facet, setFacet] = useState('for')

  return (
    <SectionShell id="models" n={s.n} label={s.label} className="models-section">
      <h2 data-reveal>Dwa modele myślenia</h2>
      <p className="lead section__intro" data-reveal>
        Dwa kontrastowe podejścia. Żadne nie jest „dobre” ani „złe” — różnią się tym, dla kogo
        i kiedy działają.
      </p>

      <div className="models__tabs" role="group" aria-label="Aspekt porównania" data-reveal>
        {models.tabs.map((t) => (
          <Chip key={t.id} active={facet === t.id} onClick={() => setFacet(t.id)} accent="ink">
            {t.label}
          </Chip>
        ))}
      </div>

      <div className="models__split" data-reveal>
        <ModelCol model={models.a} facet={facet} side="a" />
        <div className="models__divider" aria-hidden="true">
          vs
        </div>
        <ModelCol model={models.b} facet={facet} side="b" />
      </div>

      <p className="models__note voice" data-reveal>
        {models.note}
      </p>
    </SectionShell>
  )
}
