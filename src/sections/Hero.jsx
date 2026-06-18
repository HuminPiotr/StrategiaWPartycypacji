import { useState } from "react";
import { meta, poll, sections } from "../data/content.js";
import TensionMeter from "../components/TensionMeter.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { useVoteResults, submitVote } from "../hooks/useSurveyResults.js";
import { usePersistedAnswer } from "../hooks/usePersistedAnswer.js";

const s = sections[0];

export default function Hero() {
  const ref = useReveal({ y: 20, stagger: 0.07, blur: 0, duration: 0.6 });
  const { results, total, refetch } = useVoteResults();
  const [answer, setAnswer] = usePersistedAnswer("strategia.poll.answer", null);
  const [locked] = usePersistedAnswer("strategia.poll.locked", false);
  const [submitError, setSubmitError] = useState(null);

  const maxCount =
    total > 0 ? Math.max(...poll.options.map((o) => results[o.id] || 0)) : 0;

  const handleVote = async (id) => {
    if (locked) return;
    setSubmitError(null);
    try {
      await submitVote(id);
      setAnswer(id);
      refetch();
    } catch (err) {
      setSubmitError(err?.message ?? "Błąd zapisu — spróbuj ponownie.");
    }
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="section shell shell--full hero"
      aria-labelledby="hero-title"
    >
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__wash" />
        <span className="hero__grid" />
      </div>

      <div className="container hero__inner">
        <div className="hero__top" data-reveal>
          <p className="eyebrow shell__eyebrow">
            <span className="shell__proto">Protokół debaty</span>
            <span className="shell__sep" aria-hidden="true">
              ·
            </span>
            <span className="shell__n">{s.n}</span>
          </p>
          <div className="hero__meter">
            <span className="eyebrow">Stan debaty</span>
            <TensionMeter
              values={{ residents: 34, experts: 33, politics: 33 }}
            />
          </div>
        </div>

        <div className="hero__body">
          <div className="hero__left" data-reveal>
            <h1 id="hero-title" className="hero__title">
              {meta.title}
            </h1>

            <p className="lead hero__lead">{meta.intro}</p>

            <a className="hero__cta" href="#why">
              <span className="hero__cta-text">Wejdź do debaty</span>
              <span className="hero__cta-icon" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>

          <div className="hero__right" data-reveal>
            <div className="hero__chart card" aria-label="Głosowanie odwiedzających">
              <div className="hero__chart-header">
                <p className="eyebrow hero__chart-eyebrow">Co sądzą odwiedzający</p>
                <p>{poll.question}</p>
                {answer && total > 0 && (
                  <span className="hero__chart-count">
                    {total} głos{total === 1 ? "" : total < 5 ? "y" : "ów"}
                  </span>
                )}
              </div>

              {/* Wyniki (tryb po zablokowaniu) */}
              {locked && (
                <div className="hero__chart-bars">
                  {poll.options.map((opt) => {
                    const count = results[opt.id] || 0;
                    const pct =
                      total > 0 ? Math.round((count / total) * 100) : 0;
                    const isLeading =
                      total > 0 && count === maxCount && count > 0;
                    const isOwn = answer === opt.id;
                    return (
                      <div
                        key={opt.id}
                        className={`chart-bar ${isLeading ? "chart-bar--leading" : ""} ${isOwn ? "chart-bar--mine" : ""}`}
                      >
                        <div className="chart-bar__meta">
                          <span className="chart-bar__label">{opt.label}</span>
                          <span className="chart-bar__pct">
                            {total > 0 ? `${pct}%` : "—"}
                          </span>
                        </div>
                        <div
                          className="chart-bar__track"
                          role="progressbar"
                          aria-valuenow={pct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div
                            className="chart-bar__fill"
                            style={{ width: total > 0 ? `${pct}%` : "0%" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Formularz głosowania (przed zablokowaniem) */}
              {!locked && (
                <div
                  className="hero__poll"
                  role="radiogroup"
                  aria-label={poll.question}
                >
                  {poll.options.map((opt) => {
                    const active = answer === opt.id;
                    const pct =
                      answer && total > 0
                        ? Math.round(((results[opt.id] || 0) / total) * 100)
                        : 0;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        className={`poll-option ${active ? "poll-option--active" : ""}`}
                        onClick={() => handleVote(opt.id)}
                      >
                        <span className="poll-option__dot" aria-hidden="true" />
                        <span className="poll-option__label">{opt.label}</span>
                        {answer && total > 0 && (
                          <span
                            className="poll-option__result"
                            aria-label={`${pct}%`}
                          >
                            <span
                              className="poll-option__bar"
                              style={{ width: `${pct}%` }}
                              aria-hidden="true"
                            />
                            <span className="poll-option__pct">{pct}%</span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {!answer && !locked && (
                <p className="hero__chart-empty">
                  Zagłosuj — wyniki pokażą się od razu.
                </p>
              )}
              {answer && !locked && (
                <p className="hero__poll-saved" role="status">
                  Wstępny głos zapisany. Możesz zmienić zdanie na końcu strony.
                </p>
              )}
              {submitError && (
                <p className="return__error" role="alert">
                  {submitError}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
