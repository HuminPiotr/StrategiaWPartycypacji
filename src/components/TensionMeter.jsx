// Element-podpis: trójgłosowy wskaźnik napięcia (mieszkańcy / eksperci / polityka).
// Wariant statyczny pojawia się w nagłówkach sekcji jako „stan debaty”,
// wariant interaktywny zasila Sekcję 09. Patrz DESIGN.md §1.

const ACCENT = {
  residents: 'var(--olive)',
  experts: 'var(--navy)',
  politics: 'var(--coral)',
}

const SHORT = {
  residents: 'Mieszkańcy',
  experts: 'Eksperci',
  politics: 'Polityka',
}

// values: { residents, experts, politics } — sumują się do 100 (lub dowolnie, normalizujemy).
export default function TensionMeter({ values, showLabels = false, size = 'sm', ariaHidden = true }) {
  const total =
    (values.residents || 0) + (values.experts || 0) + (values.politics || 0) || 1
  const order = ['residents', 'experts', 'politics']

  return (
    <div
      className={`meter meter--${size}`}
      aria-hidden={ariaHidden ? 'true' : undefined}
      role={ariaHidden ? undefined : 'img'}
      aria-label={
        ariaHidden
          ? undefined
          : `Proporcje: mieszkańcy ${Math.round((values.residents / total) * 100)}%, eksperci ${Math.round(
              (values.experts / total) * 100,
            )}%, polityka ${Math.round((values.politics / total) * 100)}%`
      }
    >
      <div className="meter__bar">
        {order.map((k) => (
          <span
            key={k}
            className="meter__seg"
            style={{
              flexGrow: values[k] || 0,
              background: ACCENT[k],
            }}
          />
        ))}
      </div>
      {showLabels && (
        <ul className="meter__legend">
          {order.map((k) => (
            <li key={k}>
              <span className="meter__dot" style={{ background: ACCENT[k] }} />
              {SHORT[k]}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
