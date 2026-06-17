// Klikany chip/toggle. Natywny <button> z aria-pressed → dostępny z klawiatury.
export default function Chip({ active, onClick, children, accent, className = '' }) {
  return (
    <button
      type="button"
      className={`chip ${active ? 'chip--active' : ''} ${className}`}
      aria-pressed={active}
      onClick={onClick}
      style={active && accent ? { '--chip-accent': `var(--${accent})` } : undefined}
    >
      {children}
    </button>
  )
}
