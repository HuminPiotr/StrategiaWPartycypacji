import { useState } from 'react'
import { facadeQuiz, facadeVerdicts, facadeSignals, sections } from '../data/content.js'
import SectionShell from '../components/SectionShell.jsx'

const s = sections[7]

function QuizCard({ item }) {
  const [choice, setChoice] = useState(null)
  const answered = choice !== null
  const correct = choice === item.verdict

  return (
    <li className="facade__card card">
      <p className="facade__scenario">{item.scenario}</p>

      <div className="facade__choices" role="group" aria-label="Twoja ocena">
        {['real', 'facade'].map((v) => (
          <button
            key={v}
            type="button"
            className={`facade__choice ${choice === v ? 'facade__choice--picked' : ''} ${
              answered && v === item.verdict ? 'facade__choice--answer' : ''
            }`}
            aria-pressed={choice === v}
            disabled={answered}
            onClick={() => setChoice(v)}
          >
            {facadeVerdicts[v]}
          </button>
        ))}
      </div>

      {answered && (
        <div className={`facade__feedback ${correct ? 'is-correct' : 'is-wrong'}`} role="status">
          <p className="facade__verdict">
            {correct ? 'Trafnie.' : 'Niekoniecznie.'}{' '}
            <strong>{facadeVerdicts[item.verdict]}.</strong>
          </p>
          <p className="facade__explain">{item.explain}</p>
        </div>
      )}
    </li>
  )
}

export default function Facade() {
  return (
    <SectionShell id="facade" n={s.n} label={s.label} className="facade-section">
      <h2 data-reveal>Kiedy partycypacja staje się fasadą?</h2>
      <p className="lead section__intro" data-reveal>
        Czasem procedura jest dochowana, a sensu brak. Oceń scenariusze: to jeszcze
        partycypacja, czy już fasada?
      </p>

      <ul className="facade__quiz" data-reveal>
        {facadeQuiz.map((item) => (
          <QuizCard key={item.id} item={item} />
        ))}
      </ul>

      <div className="facade__signals" data-reveal>
        <h3 className="facade__signals-title">Sygnały ostrzegawcze</h3>
        <ul className="facade__signals-list">
          {facadeSignals.map((sig, i) => (
            <li key={i}>
              <span className="facade__signal-mark" aria-hidden="true">
                !
              </span>
              {sig}
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}
