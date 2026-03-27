import React, { useState, useEffect, useRef } from 'react'
import { FolderPlus } from 'lucide-react'
import Createdeck from '../components/Createdeck'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'
import DeckDropDown from "../components/DeckDropDown"

const Decks = () => {
    const [showCreateDeck, setShowCreateDeck] = useState(false)
    const [decks, setDecks] = useState([])
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
        <div className="flex flex-col items-center h-screen">
            <div className="flex flex-col  w-full max-w-5xl h-full pb-10 px-10 pt-10">

                <h1 className="text-lg font-bold mb-8">Your Decks</h1>

                <button
                    className=" card-theme flex flex-row items-center hover:bg-gray-400 text-xs font-bold gap-2 border border-black/80 px-6 py-2 rounded-md w-fit mb-10"
                    onClick={() => setShowCreateDeck(true)}
                >
                    <img 
                    src="https://img.icons8.com/?size=100&id=DQ8rpgRkocmO&format=png&color=000000" 
                    alt="add"
                    width={24}
                    height={24} 

                    />
                    
                     Create deck
                </button>

                <div
                    ref={scrollRef}
                    className="flex flex-wrap justify-center gap-4 overflow-y-auto pb-6 w-full"
                    style={{ alignContent: 'flex-start' }}
                >
                    {decks.map((deck) => (
                        deck.id ? (
                            <div key={deck.id} className="card-theme border border-black/80 rounded-md">
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
                                    <div className="h-24 " />
                                    <div className="px-2 py-3">
                                        <p className="font-bold text-md capitalize items-center flex flex-row gap-1">
                                            <img src="https://img.icons8.com/?size=100&id=4I9RTdowfoBi&format=png&color=000000" alt="deck"
                                                  width={24} height={24} />
                                            {deck.deckname}
                                        </p>
                                        <p className="w-full text-right text-sm text-gray-500 flex flex-row items-center justify-end gap-1">
                                            {deck.cardCount}
                                            <img
                                                src="https://img.icons8.com/?size=100&id=gQhB1Tfi2cG2&format=png&color=000000"
                                                alt="cards"
                                                width={16}
                                                height={16}
                                                className="opacity-50"
                                            />
                                        </p>
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