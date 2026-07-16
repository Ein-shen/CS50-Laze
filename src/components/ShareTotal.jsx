// ShareTotal.jsx
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const ShareTotal = () => {
  const { deckId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [deck, setDeck] = useState(null)
  const { score = 0, total = 0 } = location.state || {}
  const [ownerUsername, setOwnerUsername] = useState(null)



  useEffect(() => {
    if (!deckId) return                                  //  check deckId, not deck

    const fetchDeck = async () => {
      const cached = localStorage.getItem(`decks_${deckId}`)   //  backticks, use deckId
      if (cached) {
        setDeck(JSON.parse(cached))
        return                                           //  skip fetch if cached
      }

      const { data, error } = await supabase            //  added =
        .from('decks')
        .select('deckname')
        .eq('id', deckId)                               //  added dot, use deckId
        .single()

      if (!error && data) {
          setDeck(data)
          localStorage.setItem(`decks_${deckId}`, JSON.stringify(data))
        } else if (error) {
          console.error("Error fetching deck:", error)
        }
    }

    fetchDeck()

  }, [deckId])

  useEffect(() => {
    const fetchOwnerUsername = async () => {
      const { data: deck, error: deckError } = await supabase
        .from('decks')
        .select('user_id' )
        .eq('id', deckId)
        .single()

      if (deckError || !deck) return

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', deck.user_id)
        .single()

      if (!profileError && profile) {
        setOwnerUsername(profile.username)
      }
    }

    fetchOwnerUsername()
  }, [deckId])

  return (
    <div className="w-screen h-screen bg-gray-300 flex flex-col items-center pt-20">
      <div className="  gap-4 w-[55%] h-auto flex flex-col border-black border-2 rounded-md bg-white-300  px-10 py-10">


        <h1 className="font-bold text-2xl text-center " > <img src="/mortarboard.png" className="w-12 h-16 inline pb-1"/>{deck?.deckname}  </h1>

        <h1 className="font-bold text-2xl text-center pt-20    ">Your result:</h1>

        <p className="font-bold text-4xl text-center pt-5">{score} / {total}</p>


        <div className="flex flex-row gap-10 justify-center items-center pt-32">
          <button
            className="font-bold text-md border-black border-2 rounded-md h-12 w-32"
            type="button"
            disabled={!ownerUsername}
            onClick={() => navigate(`/stalk/${ownerUsername}`)}
          >
            Back
          </button>
          <button
            className="font-bold text-md border-black border-2 rounded-md h-12 w-32"
            type="button"
            onClick={() => navigate(`/sharestudy/${deckId}`)}
          >
            Re-study
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShareTotal
