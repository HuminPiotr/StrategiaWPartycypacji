import { useCallback, useEffect, useState } from 'react'

// Zapis odpowiedzi sondażu w localStorage — spina Sekcję 01 z Sekcją 10.
// Bezpieczny przy braku localStorage (np. tryb prywatny) — degraduje do stanu w pamięci.
export function usePersistedAnswer(key, initial = null) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw === null ? initial : JSON.parse(raw)
    } catch {
      return initial
    }
  })

  const set = useCallback(
    (next) => {
      setValue(next)
      try {
        window.localStorage.setItem(key, JSON.stringify(next))
      } catch {
        /* tryb prywatny / brak dostępu — trzymamy tylko w pamięci */
      }
    },
    [key],
  )

  // Synchronizacja między kartami/instancjami (np. dwie sekcje czytające ten sam klucz).
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === key) {
        try {
          setValue(e.newValue === null ? initial : JSON.parse(e.newValue))
        } catch {
          /* ignoruj uszkodzony wpis */
        }
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key, initial])

  return [value, set]
}
