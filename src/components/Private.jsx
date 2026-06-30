import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from "../supabaseClient"

const Private = ({ userId }) => {
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!userId) {
      setDecks([])
      setLoading(false)
      return
    }

    let cancelled = false

    const fetchDecks = async () => {
      // clear the previous user's decks right away
      setDecks([])
      setLoading(true)

      const cacheKey = `private_decks_${userId}`
      const cached = localStorage.getItem(cacheKey)

      if (cached && cached !== 'undefined') {
        try {
          if (!cancelled) {
            setDecks(JSON.parse(cached))
            setLoading(false)
          }
        } catch {
          localStorage.removeItem(cacheKey)
        }
      }

      const { data, error } = await supabase
        .from('decks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (cancelled) return // userId changed while fetching, ignore this result

      if (error) {
        console.error('Error fetching private decks:', error)
        setLoading(false)
        return
      }

      setDecks(data || [])
      localStorage.setItem(cacheKey, JSON.stringify(data || []))
      setLoading(false)
    }

    fetchDecks()
    return () => { cancelled = true }
  }, [userId])

  if (loading) {
    return <p className="w-4/5 max-w-4xl mx-auto text-center text-gray-500 mt-8">Loading decks...</p>
  }

  if (decks.length === 0) {
    return <p className="w-4/5 max-w-4xl mx-auto text-center text-gray-500 mt-8">No private decks yet.</p>
  }

  return (
    <div className="flex flex-col items-center w-4/5 max-w-4xl mx-auto mt-6">
      <div className="flex flex-col gap-3 w-full pb-5">
        {decks.map((deck) => (
          <div
            key={deck.id}
            onClick={() => navigate(`/cards/${deck.id}`)}
            className="rounded-lg p-4 items-center flex flex-row gap-1 capitalize card-theme shadow-sm card-hover-theme hover:shadow-md transition cursor-pointer"
          >
            <img src="https://img.icons8.com/?size=100&id=Mz7SNHv9HVjx&format=png&color=000000" alt="" height={20} width={20} />
            <p className="font-bold text-xs">{deck.deckname}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Private