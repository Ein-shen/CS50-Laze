import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useEffect, useState } from 'react'

const Total = () => {
  const navigate = useNavigate()
  const { deckId } = useParams()
  const [deck, setDeck] = useState(null)
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (!deckId) return

    const fetchDeck = async () => {
      const cached = localStorage.getItem(`decks_${deckId}`)
      if (cached) {
        setDeck(JSON.parse(cached))
        return
      }

      const { data, error } = await supabase
        .from('decks')
        .select('deckname')
        .eq('id', deckId)
        .single()

      if (!error && data) {
        setDeck(data)
        localStorage.setItem(`decks_${deckId}`, JSON.stringify(data))
      } else if (error) {
        console.error('Error fetching deck:', error)
      }
    }

    fetchDeck()
  }, [deckId])

  // fetch the latest quiz attempt for this deck
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
        console.error('Error fetching latest attempt:', error)
      }
    }

    fetchLatestAttempt()
  }, [deckId])

  return (
    <div className="w-full min-h-screen div-theme  flex flex-col items-center pt-8 sm:pt-20 pb-8 px-4">
      <div className="w-full md:w-[55%] max-w-2xl card-theme rounded-md flex flex-col gap-4 px-4 py-8 sm:px-6 sm:py-10 md:px-10">

        <h1 className="font-bold text-xl sm:text-2xl text-center break-words">
          <img
            src="/mortarboard.png"
            alt="mortarboard"
            className="w-10 h-12 sm:w-12 sm:h-16 inline pb-1 object-contain"
          />{' '}
          {deck?.deckname}
        </h1>

        <h1 className="font-bold text-xl sm:text-2xl text-center pt-8 sm:pt-20">
          Your result:
        </h1>

        <h1 className="font-bold text-3xl sm:text-4xl text-center pt-2 sm:pt-5">
          {result ? `${result.score} / ${result.total_questions}` : 'Loading...'}
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-10 justify-center items-center pt-8 sm:pt-20 md:pt-32">
          <button
            type="button"
            className="font-bold text-md card-hover-theme div-theme rounded-md h-12 w-full sm:w-32"
            onClick={() => navigate(`/cards/${deckId}`)}
          >
            Back
          </button>

          <button
            type="button"
            className="font-bold text-md card-hover-theme div-theme rounded-md h-12 w-full sm:w-32"
            onClick={() => navigate(`/study/${deckId}`)}
          >
            Re-study
          </button>
        </div>

      </div>
    </div>
  )
}

export default Total