import { useReveal } from '../hooks/useReveal.js'

// Wspólna oprawa sekcji: kotwica (id), eyebrow „PROTOKÓŁ · 0X · etykieta”,
// opcjonalny wariant ciemny, oraz fade-in dzieci z [data-reveal].
export default function SectionShell({
  id,
  n,
  label,
  dark = false,
  full = false,
  className = '',
  children,
}) {
  const ref = useReveal()

  return (
    <section
      id={id}
      ref={ref}
      className={`section shell ${dark ? 'shell--dark' : ''} ${full ? 'shell--full' : ''} ${className}`}
      aria-labelledby={`${id}-eyebrow`}
    >
      <div className="container">
        <p className="eyebrow shell__eyebrow" id={`${id}-eyebrow`} data-reveal>
          <span className="shell__proto">Protokół</span>
          <span className="shell__sep" aria-hidden="true">
            ·
          </span>
          <span className="shell__n">{n}</span>
          <span className="shell__sep" aria-hidden="true">
            ·
          </span>
          {label}
        </p>
        {children}
      </div>
    </section>
  )
}
