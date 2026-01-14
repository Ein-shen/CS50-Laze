import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { supabase } from '../supabaseClient'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const Study = () => {
  const navigate = useNavigate()
  const { deckId } = useParams()
  const [deck, setDeck] = useState(null)
  const [cards, setCards] = useState([])
  const [index, setIndex] = useState(0)
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  // Save the score when the quiz is finished, then go to the results page
  useEffect(() => {
    if (!finished) return

    const saveScore = async () => {
      const { data: userData } = await supabase.auth.getUser()
      const user = userData?.user

      if (!user) {
        console.error('No logged in user, cannot save score.')
        navigate(`/total/${deckId}`)
        return
      }

      const { error } = await supabase
        .from('quiz_attempts')
        .insert([
          {
            user_id: user.id,
            deck_id: deckId,
            score: score,
            total_questions: cards.length,
          },
        ])

      if (error) console.error('Error saving score:', error)

      navigate(`/total/${deckId}`)
    }

    saveScore()
  }, [finished])

  // Fetch the cards
  useEffect(() => {
    async function fetchCards() {
      const startTime = Date.now()
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('deck_id', deckId)

      if (error) console.error('Error fetching cards:', error)
      else setCards(data)

      const remaining = 1000 - (Date.now() - startTime)

      if (remaining > 0) {
        setTimeout(() => setLoading(false), remaining)
      } else {
        setLoading(false)
      }
    }

    fetchCards()
  }, [deckId])

  const card = cards[index]

  useEffect(() => {
    if (card) {
      const wrongAnswers = [card.option1, card.option2, card.option3].filter(Boolean)
      setOptions(shuffle([card.back, ...wrongAnswers]))
      setSelected(null)
    }
  }, [card])

  // Fetch the deck name
  useEffect(() => {
    async function fetchDeck() {
      const { data, error } = await supabase
        .from('decks')
        .select('*')
        .eq('id', deckId)
        .single()

      if (error) console.error('Error fetching deck:', error)
      else setDeck(data)
    }

    fetchDeck()
  }, [deckId])

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen w-full div-theme flex items-center justify-center px-4">
        <p className="text-xl sm:text-3xl font-bold flex flex-col sm:flex-row items-center gap-2 text-center">
          <img src="/mortarboard.png" alt="mortarboard" className="w-20 h-auto sm:w-32" />
          Please wait...
        </p>
      </div>
    )
  }

  if (!cards.length) {
    return <p className="p-6 text-center">No cards in this deck yet.</p>
  }

  function handleNext() {
    if (index + 1 < cards.length) {
      setIndex((i) => i + 1)
    } else {
      setFinished(true)
    }
  }

  function handleAnswer(opt) {
    setSelected(opt)
    if (opt === card.back) {
      setScore((s) => s + 1)
    }
  }

  return (
    <div className="min-h-screen w-full div-theme flex flex-col items-center gap-4 sm:gap-6 pt-4 sm:pt-10 pb-6 px-4">

      {/* Header */}
      <div className="rounded-md card-theme w-full md:w-[68%] flex items-center justify-between gap-3 px-4 sm:px-6 py-4 sm:py-6">
        <button
          type="button"
          aria-label="Close"
          className="flex-shrink-0"
          onClick={() => navigate(`/cards/${deckId}`)}
        >
          <X size={24} color="black" />
        </button>

        <h1 className="flex-1 min-w-0 text-base sm:text-xl font-bold text-center truncate">
          <img src="/mortarboard.png" alt="mortarboard" className="inline-block w-6 h-6 sm:w-8 sm:h-8" />{' '}
          {deck?.deckname}
        </h1>

        <div className="flex-shrink-0 flex flex-col gap-0.5 text-right">
          <p className="font-bold text-xs sm:text-base">
            Card: {index + 1} / {cards.length}
          </p>
          <p className="font-bold text-xs sm:text-base">Score: {score}</p>
        </div>
      </div>

      {/* pt-10 here = space between header and question card */}
      <form className="w-full md:w-[68%] flex flex-col gap-4 pt-10 sm:gap-6">

        {/* Question card */}
        <div className="w-full card-theme rounded-md flex flex-col items-center justify-center gap-4 sm:gap-6 min-h-[160px] sm:min-h-[200px] px-4 py-5">
          {card.front_image_url && (
            <img
              src={card.front_image_url}
              alt="front"
              className="w-full max-w-[13rem] sm:max-w-xs h-auto max-h-56 object-cover rounded-md"
            />
          )}

          <h1 className="text-lg sm:text-xl font-bold text-center break-words">{card.front}</h1>

          {selected ? (
            <h1 className="flex flex-row items-center gap-2 font-bold text-2xl sm:text-3xl text-center break-words text-green-600 capitalize">
              {card.back}
              <img
                src="https://img.icons8.com/?size=100&id=sz8cPVwzLrMP&format=png&color=000000"
                alt="correct"
                height={40}
                width={40}
              />
            </h1>
          ) : (
            <h1 className="font-bold text-md">_ _ _ _</h1>
          )}
        </div>

        {/* Answer choices */}
        <div className="w-full flex flex-col pb-2 pt-4 sm:flex-row items-stretch gap-3 sm:gap-4">
          {options.map((opt) => {
            const isPicked = selected === opt
            const isCorrect = opt === card.back

            let color = 'bg-[#8BBB92] hover:bg-[#a3cdaa]'
            if (selected) {
              if (isCorrect) color = 'bg-green-300'
              else if (isPicked) color = 'bg-red-300'
              else color = 'bg-[#8BBB92] opacity-60'
            }

            return (
              <button
                type="button"
                key={opt}
                disabled={selected !== null}
                onClick={() => handleAnswer(opt)}
                className={`w-full min-h-[3.5rem] sm:min-h-[4rem] capitalize rounded-md px-4 sm:px-6 py-2 text-center font-bold text-xs sm:text-base break-words transition ${color}`}
              >
                {opt}
              </button>
            )
          })}
        </div>

        {/* Next button: always takes up space, only visible after answering */}
        <button
          type="button"
          onClick={handleNext}
          disabled={!selected}
          tabIndex={selected ? 0 : -1}
          className={`w-full px-6 py-3 card-theme card-hover-theme rounded-md font-bold ${
            selected ? '' : 'invisible'
          }`}
        >
          Next
        </button>
      </form>
    </div>
  )
}

export default Study