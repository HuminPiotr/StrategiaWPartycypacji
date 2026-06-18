import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { getSessionId } from '../lib/session.js'

export async function submitVote(answer) {
  const { error } = await supabase
    .from('votes')
    .upsert({ answer, session_id: getSessionId() }, { onConflict: 'session_id' })
  if (error) throw error
}

export function useVoteResults() {
  const [results, setResults] = useState({})
  const [total, setTotal] = useState(0)

  const refetch = useCallback(async () => {
    const { data, error } = await supabase.from('votes').select('answer')
    if (error || !data) return
    const counts = {}
    for (const { answer } of data) {
      counts[answer] = (counts[answer] || 0) + 1
    }
    setResults(counts)
    setTotal(data.length)
  }, [])

  useEffect(() => { refetch() }, [refetch])

  return { results, total, refetch }
}
