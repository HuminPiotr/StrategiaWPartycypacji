import { useMemo, useState } from "react";
import { ratio, sections } from "../data/content.js";
import SectionShell from "../components/SectionShell.jsx";
import TensionMeter from "../components/TensionMeter.jsx";

const s = sections[8];

const KEY = {
  residents: "residents",
  experts: "experts",
  politics: "politics",
};

export default function GoldenRatio() {
  const [vals, setVals] = useState({
    residents: 34,
    experts: 33,
    politics: 33,
  });
  // „nie istnieje” w nagłówku odsłania się dopiero, gdy ktoś ruszy suwakami.
  const [touched, setTouched] = useState(false);

  const total = vals.residents + vals.experts + vals.politics || 1;
  const pct = {
    residents: Math.round((vals.residents / total) * 100),
    experts: Math.round((vals.experts / total) * 100),
    politics: Math.round((vals.politics / total) * 100),
  };

  // Komentarz opisowy (nie oceniający): ostrzeżenie pojawia się przy wyraźnej przewadze.
  const comment = useMemo(() => {
    const entries = Object.entries(pct).sort((a, b) => b[1] - a[1]);
    const [topKey, topVal] = entries[0];
    const [, secondVal] = entries[1];
    if (topVal >= 50 && topVal - secondVal >= 15) {
      return { text: ratio.warnings[topKey], tone: "warn" };
    }
    return { text: ratio.balanced, tone: "balanced" };
  }, [pct]);

  const setOne = (id, v) => {
    if (!touched) setTouched(true);
    setVals((prev) => ({ ...prev, [id]: Number(v) }));
  };

  return (
    <SectionShell id="ratio" n={s.n} label={s.label} className="ratio-section">
      <h2 data-reveal>
        Złota proporcja?{" "}
        <span className={`ratio__reveal ${touched ? "is-shown" : ""}`}>
          <span className="ratio__reveal-word" style={{ "--i": 0 }}>
            nie
          </span>{" "}
          <span className="ratio__reveal-word" style={{ "--i": 1 }}>
            istnieje
          </span>
        </span>
      </h2>
      <p className="lead section__intro" data-reveal>
        Trzy składniki każdej strategii. Ustaw proporcje i zobacz, co ryzykujesz
        — bo nie ma jednej poprawnej odpowiedzi.
      </p>

      <div className="ratio__panel" data-reveal>
        <div className="ratio__meter">
          <TensionMeter values={vals} size="lg" showLabels ariaHidden={false} />
        </div>

        <div className="ratio__sliders">
          {ratio.components.map((c) => (
            <div
              key={c.id}
              className="ratio__slider-row"
              style={{ "--r-accent": `var(--${c.accent})` }}
            >
              <label className="ratio__slider-label" htmlFor={`r-${c.id}`}>
                <span
                  className="ratio__dot"
                  style={{ background: `var(--${c.accent})` }}
                  aria-hidden="true"
                />
                {c.label}
                <span className="ratio__val">{pct[KEY[c.id]]}%</span>
              </label>
              <input
                id={`r-${c.id}`}
                type="range"
                min="0"
                max="100"
                value={vals[c.id]}
                onChange={(e) => setOne(c.id, e.target.value)}
                className="ratio__slider"
                aria-valuetext={`${pct[KEY[c.id]]} procent`}
              />
            </div>
          ))}
        </div>

        <p
          className={`ratio__comment ratio__comment--${comment.tone}`}
          role="status"
          aria-live="polite"
        >
          {comment.text}
        </p>
      </div>

      <p className="ratio__thesis voice" data-reveal>
        {ratio.thesis}
      </p>
    </SectionShell>
  );
}
