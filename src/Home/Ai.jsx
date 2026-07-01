import { useState, useEffect } from 'react'
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"

// ===== ADJUST THESE =====
const MAX_RECENT = 6      // how many decks to show
const FETCH_LIMIT = 100   // how many recent attempts to pull before removing duplicates
// ========================

// One row per deck, newest first: the deck you just studied moves to the top
const getUniqueRecent = (attempts) => {
  const seen = new Set()
  return attempts
    .filter((attempt) => {
      if (seen.has(attempt.deck_id)) return false
      seen.add(attempt.deck_id)
      return true
    })
    .slice(0, MAX_RECENT)
}

const Ai = ({ onNavigate }) => {
  const [recentAttempts, setRecentAttempts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false

    const fetchRecentAttempts = async () => {
      // old global cache key leaked between accounts, so remove it
      localStorage.removeItem('recent_attempts')

      // getSession reads the local session, so it's instant (no network call)
      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user

      if (!user) {
        setRecentAttempts([])
        return
      }

      // cache is now per user
      const cacheKey = `recent_attempts_${user.id}`
      const cached = localStorage.getItem(cacheKey)

      if (cached && cached !== 'undefined') {
        try {
          if (!cancelled) setRecentAttempts(getUniqueRecent(JSON.parse(cached)))
        } catch {
          localStorage.removeItem(cacheKey)
        }
      } else {
        setRecentAttempts([])
      }

      // then fetch fresh data
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('id, deck_id, score, total_questions, created_at, decks(deckname)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(FETCH_LIMIT)

      if (error) {
        console.error('Error fetching recent attempts:', error)
        return
      }

      if (data && !cancelled) {
        const unique = getUniqueRecent(data)
        setRecentAttempts(unique)
        localStorage.setItem(cacheKey, JSON.stringify(unique))
      }
    }

    fetchRecentAttempts()
    return () => { cancelled = true }
  }, [])

  const handleClick = (deckId) => {
    navigate(`/cards/${deckId}`)
    onNavigate?.()   // closes the mobile sidebar
  }

  return (
    <div className="w-full px-6 pb-6">
      <h2 className="font-bold text-xs mb-2">Recent:</h2>

      <div className="flex flex-col gap-2">
        {recentAttempts.length === 0 && (
          <p className="text-gray-500 text-xs">No quiz attempts yet.</p>
        )}

        {recentAttempts.map((attempt) => (
          <div
            key={attempt.id}
            onClick={() => handleClick(attempt.deck_id)}
            className="flex items-center justify-between gap-2 card-hover-theme div-theme rounded-md px-2 py-3.5 text-xs shadow-sm hover:shadow-md transition cursor-pointer"
          >
            {/* Left: icon + deck name */}
            <div className="flex items-center gap-2 min-w-0">
              <img
                src="https://img.icons8.com/?size=100&id=0vQcEsGZ967K&format=png&color=000000"
                alt=""
                width={14}
                height={14}
                className="flex-shrink-0"
              />
              <span className="font-semibold truncate">
                {attempt.decks?.deckname ?? 'Unknown deck'}
              </span>
            </div>

            {/* Right: score */}
            <span className="flex-shrink-0">
              {attempt.score} / {attempt.total_questions}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ai