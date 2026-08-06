import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from "../supabaseClient"

const Private = ({ userId }) => {
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchDecks = async () => {
    if (!userId) {
      setLoading(false)
      return
    }

    const cacheKey = `private_decks_${userId}`
    const cached = localStorage.getItem(cacheKey)

    if (cached && cached !== 'undefined') {
      try {
        setDecks(JSON.parse(cached))
        setLoading(false)
      } catch {
        localStorage.removeItem(cacheKey)
      }
    }

    const { data, error } = await supabase
      .from('decks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching private decks:', error)
      setLoading(false)
      return
    }

    setDecks(data || [])
    localStorage.setItem(cacheKey, JSON.stringify(data || []))
    setLoading(false)
  }

  useEffect(() => {
    fetchDecks()
  }, [userId])

  if (loading) {
    return <p className="text-center text-gray-500 mt-8">Loading decks...</p>
  }

  if (decks.length === 0) {
    return <p className="text-center text-gray-500 mt-8">No private decks yet.</p>
  }

  return (
    <div className="flex flex-col items-center w-2/3 max-w-4xl mx-auto mt-6 ">
      <div className="flex flex-col gap-3 w-full pb-5">
        {decks.map((deck) => (
          <div
            key={deck.id}
            onClick={() => navigate(`/cards/${deck.id}`)}
            className="border-2 border-black rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer "
          >
            <p className="font-bold">{deck.deckname}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Private