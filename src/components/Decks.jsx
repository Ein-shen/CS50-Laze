import React, { useState, useEffect, useRef } from 'react'
import { FolderPlus } from 'lucide-react'
import Createdeck from '../components/Createdeck'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import DeckDropDown from "../components/DeckDropDown"

const Decks = () => {
    const [showCreateDeck, setShowCreateDeck] = useState(false)
    const [decks, setDecks] = useState([])
    const [cards, setCards] = useState([])
    const navigate = useNavigate()
    const scrollRef = useRef(null)

    const fetchDecks = async () => {
        const cached = localStorage.getItem('decks')
        if (cached && cached !== 'undefined') {
            try {
                setDecks(JSON.parse(cached))
            } catch {
                localStorage.removeItem('decks')
            }
        }

        const { data: { user } } = await supabase.auth.getUser()
        const { data } = await supabase
            .from('decks')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        if (data) {
            const decksWithCounts = await Promise.all(
                data.map(async (deck) => {
                    const { count } = await supabase
                        .from('cards')
                        .select('*', { count: 'exact', head: true })
                        .eq('deck_id', deck.id)

                    return { ...deck, cardCount: count }
                })
            )

            setDecks(decksWithCounts)
            localStorage.setItem('decks', JSON.stringify(decksWithCounts))
        }
    }




    useEffect(() => {
        fetchDecks()
    }, [])



    useEffect(() => {
        if (decks.length === 0) return
        const scroll = localStorage.getItem('decksScroll')
        if (scroll && scrollRef.current) {
            scrollRef.current.scrollTop = parseInt(scroll)
            localStorage.removeItem('decksScroll')
        }
    }, [decks])

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-col h-full px-10 pt-24 pl-10 p">

                <h1 className="text-2xl font-bold mb-8">Your Deck</h1>

                <button
                    className="flex items-center font-bold gap-2 border-[3px] border-black px-6 py-2 rounded-md w-fit mb-10"
                    onClick={() => setShowCreateDeck(true)}>
                    <FolderPlus size={24} /> Create deck
                </button>

                <div ref={scrollRef} className=" flex flex-wrap gap-4  overflow-y-auto pb-6" style={{ alignContent: 'flex-start' }}>
                    {decks.map((deck) => (
                        deck.id ? (
                            <div key={deck.id} className="border-black border-2 rounded-md  ">
                                <DeckDropDown
                                    deck={deck}

                                    onNavigate={() => {
                                        localStorage.setItem('decksScroll', scrollRef.current?.scrollTop || 0)
                                        navigate(`/cards/${deck.id}`)
                                    }}
                                    onUpdate={(updatedDeck) => {
                                        setDecks(prev => {
                                            const updated = prev.map(d =>
                                                d.id === updatedDeck.id ? { ...d, ...updatedDeck } : d
                                            )
                                            localStorage.setItem('decks', JSON.stringify(updated))
                                            return updated
                                        })
                                    }}
                                    onDelete={(deletedId) => {
                                        setDecks(prev => {
                                            const updated = prev.filter(d => d.id !== deletedId)
                                            localStorage.setItem('decks', JSON.stringify(updated))
                                            return updated
                                        })
                                    }}

                                >
                                    <div className="h-24 bg-gray-300 " />
                                    <div className="px-4 py-3">
                                        <p className="font-bold text-lg">{deck.deckname}</p>
                                        <p className="text-sm text-gray-500">{deck.cardCount} Cards</p>
                                    </div>
                                </DeckDropDown>
                            </div>
                        ) : null
                    ))}
                </div>

            </div>

            {showCreateDeck && (
                <Createdeck onComplete={(newDeck) => {
                    setShowCreateDeck(false)
                    const plainDeck = {
                        id: newDeck.id,
                        deckname: newDeck.deckname,
                        user_id: newDeck.user_id,
                        created_at: newDeck.created_at,
                    }
                    setDecks(prev => {
                        const updated = [plainDeck, ...prev]
                        localStorage.setItem('decks', JSON.stringify(updated))
                        return updated
                    })
                }} />
            )}
        </div>
    )
}

export default Decks
