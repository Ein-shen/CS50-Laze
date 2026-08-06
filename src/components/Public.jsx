import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"

const Public = ({ userId }) => {
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { deckId } = useParams()

  const fetchDecks = async () => {
    const cacheKey = `public_decks_${userId}`
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
      .eq('is_public', true)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    console.log('data:', data, 'error:', error)

    if (error) {
      console.error('Error fetching public decks:', error)
      setLoading(false)
      return
    }

    if (data) {
      setDecks(data)
      localStorage.setItem(cacheKey, JSON.stringify(data))
    }
    setLoading(false)
  }

  useEffect(() => {
    if (userId) fetchDecks()               // wait until userId is available
  }, [userId])

  if (loading) {
    return <p className="text-center text-gray-500 mt-8">Loading decks...</p>
  }

  if (decks.length === 0) {
    return <p className="text-center text-gray-500 mt-8">No public decks yet.</p>
  }

  return (
    <div className="flex flex-col items-center w-4/5 max-w-4xl mx-auto gap-4 mt-6">
      {decks.map((deck) => (
        <div
          key={deck.id}
          className="border-2 border-black rounded-lg p-4 w-4/5 shadow-sm hover:shadow-md transition"

          onClick={() => {
            navigate(`/sharestudy/${deck.id}`)
          }}
        >
          <h2 className="font-bold text-l">{deck.deckname}</h2>
          {deck.description && (
            <p className="text-gray-500 text-sm mt-1">{deck.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}

export default Public