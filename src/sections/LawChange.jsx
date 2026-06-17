import { useRef, useState } from 'react'
import { lawShift, sections } from '../data/content.js'
import SectionShell from '../components/SectionShell.jsx'

const s = sections[2]

function Column({ data, accent }) {
  return (
    <div className="law__col" style={{ '--col-accent': `var(--${accent})` }}>
      <h3 className="law__col-title">{data.title}</h3>
      <ul className="law__list">
        {data.points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  )
}

export default function LawChange() {
  // Suwak steruje „odsłonięciem” kolumny TERAZ nad kolumną KIEDYŚ (wipe).
  // Obie kolumny są w DOM → dostępne dla czytników niezależnie od suwaka.
  const [split, setSplit] = useState(55)
  const draggingRef = useRef(false)

  // Wipe działa tylko, gdy kolumny są nałożone (≥ 560px). Na wąskich ekranach
  // kolumny stackują się i przeciąganie nie ma sensu — nie przejmujemy scrolla.
  const isWipeActive = () =>
    typeof window !== 'undefined' && !window.matchMedia('(max-width: 560px)').matches

  const setFromClientX = (clientX, el) => {
    const rect = el.getBoundingClientRect()
    if (!rect.width) return
    const pct = ((clientX - rect.left) / rect.width) * 100
    setSplit(Math.min(100, Math.max(0, pct)))
  }

  const handlePointerDown = (e) => {
    if (!isWipeActive()) return
    draggingRef.current = true
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setFromClientX(e.clientX, e.currentTarget)
  }
  const handlePointerMove = (e) => {
    if (!draggingRef.current) return
    setFromClientX(e.clientX, e.currentTarget)
  }
  const endDrag = (e) => {
    draggingRef.current = false
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  return (
    <SectionShell id="law" n={s.n} label={s.label} className="law-section">
      <h2 data-reveal>Co zmieniło prawo?</h2>
      <p className="lead section__intro" data-reveal>
        Chwyć linię i przeciągnij — od „kiedyś” do „teraz”. To samo zadanie, inne reguły gry.
      </p>

      <div
        className="law__compare"
        data-reveal
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="law__pane law__pane--before" aria-hidden="false">
          <Column data={lawShift.before} accent="ink-soft" />
        </div>
        <div
          className="law__pane law__pane--after"
          style={{ clipPath: `inset(0 0 0 ${split}%)` }}
        >
          <Column data={lawShift.after} accent="navy" />
        </div>
        <div className="law__handle" style={{ left: `${split}%` }} aria-hidden="true">
          <span className="law__handle-grip">
            <span className="law__handle-arrow">‹</span>
            <span className="law__handle-arrow">›</span>
          </span>
        </div>
      </div>

      <label className="law__slider-label">
        <span className="sr-only">
          Suwak porównania: 0 to wyłącznie „kiedyś”, 100 to wyłącznie „teraz”
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          className="law__slider"
          aria-label="Przesuń od „kiedyś” do „teraz”"
        />
      </label>

      <p className="law__note voice" data-reveal>
        {lawShift.note}
      </p>
    </SectionShell>
  )
}
