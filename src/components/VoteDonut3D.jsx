import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../hooks/useReveal.js'

// Pochylony, „3D" wykres kołowy (donut) z rozkładem głosów sondażu.
// Lico: conic-gradient; grubość: jednolity ciemniejszy bok (drabinka box-shadow);
// dziura: nieprzezroczysty krążek w kolorze papieru NA WIERZCHU (nie maska).
// Animacja (umotywowana — odsłonięcie danych): zegarowy „sweep” segmentów +
// count-up liczb, gdy pojawiają się wyniki. Jeden animator rAF napędza wszystko.
// Całość dekoracyjna → aria-hidden; liczby czyta sondaż obok.

// Buduje conic-gradient z dokładnych frakcji (nie z zaokrąglonych %), bez szczelin.
function buildConic(segments, total) {
  let acc = 0
  const stops = []
  for (const s of segments) {
    const start = (acc / total) * 100
    acc += s.value
    const end = (acc / total) * 100
    stops.push(`${s.color} ${start}% ${end}%`)
  }
  return `conic-gradient(from 0deg, ${stops.join(', ')})`
}

// 0 → 1 z easeOutCubic, gdy `active` staje się prawdą. Reduced motion → od razu 1.
function useRevealProgress(active, duration = 1100) {
  const [p, setP] = useState(0)
  const raf = useRef(0)

  useEffect(() => {
    if (!active) {
      setP(0)
      return
    }
    if (prefersReducedMotion()) {
      setP(1)
      return
    }
    let startT
    const tick = (t) => {
      if (startT === undefined) startT = t
      const x = Math.min(1, (t - startT) / duration)
      setP(1 - Math.pow(1 - x, 3))
      if (x < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [active, duration])

  return p
}

export default function VoteDonut3D({ segments, total, revealed }) {
  const figRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = figRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const showData = revealed && total > 0
  const progress = useRevealProgress(showData)
  const sweep = progress * 100 // ile % tarczy już odsłonięte (zegarowo)

  const face = showData
    ? buildConic(segments, total)
    : // placeholder: neutralny pierścień, zanim ktoś zagłosuje
      'conic-gradient(var(--hairline) 0% 100%)'

  return (
    <figure ref={figRef} className={`donut3d${inView ? ' donut3d--visible' : ''}`} aria-hidden="true">
      <div className="donut3d__stage">
        <div className="donut3d__disc" style={{ background: face }}>
          {showData && (
            <div
              className="donut3d__wipe"
              style={{
                background: `conic-gradient(from 0deg, rgba(0,0,0,0) 0 ${sweep}%, var(--hairline) ${sweep}% 100%)`,
              }}
            />
          )}
          <div className="donut3d__sheen" />
          <div className="donut3d__hole" />
        </div>
      </div>

      <figcaption className="donut3d__caption">
        {showData ? (
          <>
            <span className="donut3d__caption-num">{Math.round(total * progress)}</span>
            <span className="donut3d__caption-label">
              {total === 1 ? 'głos oddany' : 'oddanych głosów'}
            </span>
          </>
        ) : (
          <span className="donut3d__caption-label">
            Rozkład pojawi się po Twoim głosie
          </span>
        )}
      </figcaption>

      <ul className="donut3d__legend">
        {segments.map((s) => (
          <li key={s.id}>
            <span className="donut3d__dot" style={{ background: s.color }} />
            <span className="donut3d__legend-label">{s.label}</span>
            {showData && (
              <span className="donut3d__legend-pct">{Math.round(s.pct * progress)}%</span>
            )}
          </li>
        ))}
      </ul>
    </figure>
  )
}
