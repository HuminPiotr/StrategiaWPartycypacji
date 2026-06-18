// Unikalny ID sesji przeglądarki — używany do upsert głosu (jeden rekord per sesja).
export function getSessionId() {
  const KEY = 'strategia.session_id'
  try {
    let id = localStorage.getItem(KEY)
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem(KEY, id)
    }
    return id
  } catch {
    return crypto.randomUUID()
  }
}
