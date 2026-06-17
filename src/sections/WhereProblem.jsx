import { problemSteps, sections } from '../data/content.js'
import SectionShell from '../components/SectionShell.jsx'
import ScrubText from '../components/ScrubText.jsx'

const s = sections[3]

export default function WhereProblem() {
  return (
    <SectionShell id="problem" n={s.n} label={s.label} dark className="problem-section">
      <div className="problem__layout">
        <div className="problem__sticky">
          <h2 data-reveal>Gdzie zaczyna się problem?</h2>
          <p className="lead section__intro" data-reveal>
            Obowiązek konsultacji nie rozwiązuje najważniejszego pytania:
          </p>
          <ScrubText
            as="p"
            className="problem__core"
            text="kogo, kiedy i o co pytać?"
            start="top 75%"
            end="top 40%"
          />
        </div>

        <ol className="problem__steps">
          {problemSteps.map((step, i) => (
            <li key={i} className="problem__step" data-reveal>
              <p className="problem__q">
                <span className="problem__q-mark" aria-hidden="true">
                  ?
                </span>
                {step.q}
              </p>
              <p className="problem__a">{step.a}</p>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  )
}
