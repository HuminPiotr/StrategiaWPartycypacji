import { poll, ending, sections } from '../data/content.js'
import { usePersistedAnswer } from '../hooks/usePersistedAnswer.js'
import { submitVote, useVoteResults } from '../hooks/useSurveyResults.js'
import ScrubText from '../components/ScrubText.jsx'
import VoteDonut3D from '../components/VoteDonut3D.jsx'
import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

const s = sections[9]

// Akcenty segmentów spójne z konwencją strony (olive=mieszkańcy, navy=eksperci,
// coral=spór/przeciw, ink-soft=neutralne „bez zdania").
const POLL_COLORS = {
  start: 'var(--olive)',
  stages: 'var(--navy)',
  experts: 'var(--coral)',
  unsure: 'var(--ink-soft)',
}

export default function ReturnToQuestion() {
  const sectionRef = useReveal()
  const [answer, setAnswer] = usePersistedAnswer('strategia.poll.answer', null)
  const [locked, setLocked] = usePersistedAnswer('strategia.poll.locked', false)
  const { results, total, refetch } = useVoteResults()
  const [submitError, setSubmitError] = useState(null)

  const handleVote = async (id) => {
    if (locked) return
    try {
      await submitVote(id)
      setAnswer(id)
      setLocked(true)
      refetch()
    } catch (err) {
      setSubmitError(err?.message ?? 'Błąd zapisu — spróbuj ponownie.')
      console.error('[vote] error:', err)
    }
  }

  // Segmenty wykresu liczone tu (nie w komponencie) — jedno źródło prawdy,
  // bez drugiego zapytania do Supabase i bez rozjazdu z paskami sondażu.
  const segments = poll.options.map((opt) => {
    const value = results[opt.id] || 0
    return {
      id: opt.id,
      label: opt.label,
      color: POLL_COLORS[opt.id] || 'var(--ink-soft)',
      value,
      pct: total > 0 ? Math.round((value / total) * 100) : 0,
    }
  })

  return (
    <section ref={sectionRef} id="return" className="section shell shell--full return-section" aria-labelledby="return-title">
      <div className="container return__inner">
        <div className="return__grid">
          <div className="return__main">
            <p className="eyebrow shell__eyebrow" data-reveal>
              <span>Protokół</span>
              <span className="shell__sep" aria-hidden="true">·</span>
              <span className="shell__n">{s.n}</span>
              <span className="shell__sep" aria-hidden="true">·</span>
              {s.label}
            </p>

            <h2 id="return-title" data-reveal>Powrót do pytania z początku</h2>

            <fieldset className="return__poll" data-reveal>
              <legend className="return__poll-q">{poll.question}</legend>
              <div className="return__poll-options" role="radiogroup" aria-label={poll.question}>
                {poll.options.map((opt) => {
                  const active = answer === opt.id
                  const pct = total > 0 ? Math.round(((results[opt.id] || 0) / total) * 100) : 0
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      className={`poll-option ${active ? 'poll-option--active' : ''} ${locked ? 'poll-option--locked' : ''}`}
                      onClick={() => handleVote(opt.id)}
                      disabled={locked}
                    >
                      <span className="poll-option__dot" aria-hidden="true" />
                      <span className="poll-option__label">{opt.label}</span>
                      {answer && total > 0 && (
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
              {locked && total > 0 && (
                <p className="hero__poll-saved" role="status">
                  Dziękujemy — Twój głos jest wiążący i dołączył do {total} odpowiedzi.
                </p>
              )}
              {answer && !locked && (
                <p className="hero__poll-saved" role="status">
                  Możesz jeszcze zmienić zdanie — kliknij inną odpowiedź.
                </p>
              )}
            </fieldset>
          </div>

          <aside className="return__aside">
            <VoteDonut3D segments={segments} total={total} revealed={Boolean(answer)} />
          </aside>
        </div>

        <ScrubText
          as="p"
          className="return__punchline"
          text={ending.punchline}
          start="top 85%"
          end="top 55%"
        />
      </div>
    </section>
  )
}
