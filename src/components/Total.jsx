

import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useEffect, useState } from 'react'


const Total = () => {
  const navigate = useNavigate()
  const { deckId } = useParams()
  const [deck, setDeck] = useState(null)
  const [result, setResult] = useState(null)


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


  // 👇 new effect: fetch the latest quiz attempt for this deck
  useEffect(() => {
    if (!deckId) return

    const fetchLatestAttempt = async () => {
      const { data: userData } = await supabase.auth.getUser()
      const user = userData?.user
      if (!user) return

      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('deck_id', deckId)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (!error && data) {
        setResult(data)
      } else if (error) {
        console.error("Error fetching latest attempt:", error)
      }
    }

    fetchLatestAttempt()

  }, [deckId])


  return (



    <div className="w-screen h-screen bg-gray-300 flex flex-col items-center pt-20">
      <div className="  gap-4 w-[55%] h-auto flex flex-col border-black border-2 rounded-md bg-white-300  px-10 py-10">

        <h1 className="font-bold text-2xl text-center " > <img src="/mortarboard.png" className="w-12 h-16 inline pb-1"/>{deck?.deckname}  </h1>

        <h1 className="font-bold text-2xl text-center pt-20    " > Your result:  </h1>

        <h1 className="font-bold text-4xl text-center pt-5" > {result ? `${result.score} / ${result.total_questions}` : "Loading..."} </h1>


        <div className="flex flex-row gap-10 justify-center items-center pt-32">


          <button

          className="font-bold text-md border-black border-2 rounded-md h-12 w-32"
          type="button"
          onClick={() => navigate(`/cards/${deckId}`)}
          > Back </button>


          <button
          className="font-bold text-md border-black border-2 rounded-md h-12 w-32"
          onClick={() => navigate(`/study/${deckId}`)}
          > Re-study </button>

        </div>

      </div>
    </div>
  )
}

export default Total
