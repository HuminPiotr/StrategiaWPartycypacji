import { poll, ending, sections } from '../data/content.js'
import { usePersistedAnswer } from '../hooks/usePersistedAnswer.js'
import { submitVote, useVoteResults } from '../hooks/useSurveyResults.js'
import ScrubText from '../components/ScrubText.jsx'
import { useState } from 'react'

const s = sections[9]

export default function ReturnToQuestion() {
  const [voted, setVoted] = usePersistedAnswer('strategia.poll.final', null)
  const { results, total, refetch } = useVoteResults()
  const [submitError, setSubmitError] = useState(null)

  const handleVote = async (id) => {
    if (voted) { setVoted(id); return }
    try {
      await submitVote(id)
      setVoted(id)
      refetch()
    } catch (err) {
      setSubmitError(err?.message ?? 'Błąd zapisu — spróbuj ponownie.')
      console.error('[vote] error:', err)
    }
  }

  return (
    <section id="return" className="section shell shell--full return-section" aria-labelledby="return-title">
      <div className="container return__inner">
        <p className="eyebrow shell__eyebrow">
          <span>Protokół</span>
          <span className="shell__sep" aria-hidden="true">·</span>
          <span className="shell__n">{s.n}</span>
          <span className="shell__sep" aria-hidden="true">·</span>
          {s.label}
        </p>

        <h2 id="return-title">Powrót do pytania z początku</h2>

        <fieldset className="return__poll">
          <legend className="return__poll-q">{poll.question}</legend>
          <div className="return__poll-options" role="radiogroup" aria-label={poll.question}>
            {poll.options.map((opt) => {
              const active = voted === opt.id
              const pct = total > 0 ? Math.round(((results[opt.id] || 0) / total) * 100) : 0
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  className={`poll-option ${active ? 'poll-option--active' : ''}`}
                  onClick={() => handleVote(opt.id)}
                >
                  <span className="poll-option__dot" aria-hidden="true" />
                  <span className="poll-option__label">{opt.label}</span>
                  {voted && total > 0 && (
                    <span className="poll-option__result" aria-label={`${pct}%`}>
                      <span className="poll-option__bar" style={{ width: `${pct}%` }} aria-hidden="true" />
                      <span className="poll-option__pct">{pct}%</span>
                    </span>
                  )}
                </button>
              )
            })}
          </div>
          {submitError && (
            <p className="return__error" role="alert">{submitError}</p>
          )}
          {voted && total > 0 && (
            <p className="hero__poll-saved" role="status">
              Dziękujemy — Twój głos dołączył do {total} odpowiedzi.
            </p>
          )}
        </fieldset>

        <ScrubText as="p" className="return__punchline" text={ending.punchline} end="bottom 70%" />
      </div>
    </section>
  )
}
