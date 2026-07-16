 import { useParams, useNavigate } from 'react-router-dom'
import Return from "../components/Return"
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import QandA from "../components/QandA"

const Cards = ({children}) => {
  const { deckId } = useParams()
  const [deck, setDeck] = useState(null)
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [cards, setCards] = useState([])
  const [addNewTrigger, setAddNewTrigger] = useState(0)


  // ---- fetch deck info ----
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
      }
    }

    fetchDeck()
  }, [deckId])

  // ---- fetch cards (standalone function, reusable) ----
  const fetchCards = async () => {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('deck_id', deckId)

    if (!error && data) setCards(data)
    else if (error) console.error("Error fetching cards:", error)
  }

  // ---- run fetchCards on load ----
  useEffect(() => {
    if (!deckId) return
    fetchCards()
  }, [deckId])

  return (
    <>
      <div className="flex px-10 py-10 w-full h-[200px] ">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-4">
            <Return to="/decks" />
            <h1 className="pl-5 font-bold text-xl">{deck?.deckname} </h1>
          </div>
          <div className="ml-40 flex flex-row gap-2 pl-10 mt-auto mb-[-12px]">

            <button className=" border-black border-2 flex items-center font-bold gap-2 border-[3px] px-6 py-2 rounded-full w-fit"
              onClick={() => navigate(`/study/${deckId}`)}
              disabled={cards.length === 0}
            >
              Start study
            </button>


            <button className="border-black border-2 flex items-center font-bold gap-2 border-[3px] px-6 py-2 rounded-full w-fit" // The upper Add Card button that exist
              onClick={() => setAddNewTrigger((n) => n + 1)}
            >
              Add cards
            </button>

          </div>
        </div>
      </div>

      <div className="h-[calc(100vh-200px)]">
        <QandA
          deckId={deckId}
          showForm={showForm}
          setShowForm={setShowForm}
          onComplete={fetchCards}
          triggerAddNew={addNewTrigger}
        />
      </div>
    </>
  )
}

export default Cards
