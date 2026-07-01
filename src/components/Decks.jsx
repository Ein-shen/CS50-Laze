 
import React, { useState, useEffect, useRef } from 'react'
import Createdeck from '../components/Createdeck'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'
import DeckDropDown from '../components/DeckDropDown'

const Decks = () => {
    const [showCreateDeck, setShowCreateDeck] = useState(false)
    const [decks, setDecks] = useState([])
    const navigate = useNavigate()
    const scrollRef = useRef(null)
    const userIdRef = useRef(null)

    // Save decks locally for the current user.
    const saveCache = (list, userId = userIdRef.current) => {
        if (!userId) return

        try {
            localStorage.setItem(
                `decks:${userId}`,
                JSON.stringify(list)
            )
        } catch (error) {
            console.error('Error saving decks locally:', error)
        }
    }

    const fetchDecks = async () => {
        try {
            const {
                data: { user },
                error: authError,
            } = await supabase.auth.getUser()

            if (authError) throw authError

            if (!user) {
                userIdRef.current = null
                setDecks([])
                return
            }

            userIdRef.current = user.id

            const cacheKey = `decks:${user.id}`
            const cached = localStorage.getItem(cacheKey)

            // Show cached decks immediately while fetching fresh data.
            if (cached && cached !== 'undefined') {
                try {
                    const parsed = JSON.parse(cached)

                    if (Array.isArray(parsed)) {
                        setDecks(parsed)
                    }
                } catch (error) {
                    console.error('Invalid local deck cache:', error)
                    localStorage.removeItem(cacheKey)
                }
            }

            // Fetch the permanent deck records from Supabase.
            const { data, error } = await supabase
                .from('decks')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (error) throw error

            const decksWithCounts = await Promise.all(
                (data ?? []).map(async (deck) => {
                    const { count, error: countError } = await supabase
                        .from('cards')
                        .select('*', {
                            count: 'exact',
                            head: true,
                        })
                        .eq('deck_id', deck.id)

                    if (countError) {
                        console.error(
                            `Error fetching card count for deck ${deck.id}:`,
                            countError
                        )
                    }

                    return {
                        ...deck,
                        cardCount: count ?? 0,
                    }
                })
            )

            setDecks(decksWithCounts)
            saveCache(decksWithCounts, user.id)
        } catch (error) {
            console.error('Error fetching decks:', error)
        }
    }

    useEffect(() => {
        fetchDecks()
    }, [])

    // Restore the previous scroll position.
    useEffect(() => {
        if (decks.length === 0) return

        const scroll = localStorage.getItem('decksScroll')

        if (scroll !== null && scrollRef.current) {
            scrollRef.current.scrollTop = parseInt(scroll, 10) || 0
            localStorage.removeItem('decksScroll')
        }
    }, [decks])

    // Handle a newly created deck.
    const handleDeckCreated = async (newDeck) => {
        setShowCreateDeck(false)

        if (!newDeck?.id) {
            console.error(
                'Createdeck did not return a valid deck:',
                newDeck
            )

            // Reload from Supabase in case the insert succeeded.
            await fetchDecks()
            return
        }

        const plainDeck = {
            ...newDeck,
            cardCount: newDeck.cardCount ?? 0,
        }

        setDecks((prev) => {
            const updated = [
                plainDeck,
                ...prev.filter((deck) => deck.id !== plainDeck.id),
            ]

            saveCache(updated)
            return updated
        })
    }

    // Handle a deck update.
    const handleDeckUpdated = (updatedDeck) => {
        setDecks((prev) => {
            const updated = prev.map((deck) =>
                deck.id === updatedDeck.id
                    ? { ...deck, ...updatedDeck }
                    : deck
            )

            saveCache(updated)
            return updated
        })
    }

    // Handle a deck deletion.
    const handleDeckDeleted = (deletedId) => {
        setDecks((prev) => {
            const updated = prev.filter(
                (deck) => deck.id !== deletedId
            )

            saveCache(updated)
            return updated
        })
    }

    return (
        <div className="flex h-screen w-full min-w-0 flex-col items-center overflow-hidden">
            <div className="flex h-full min-h-0 w-full max-w-5xl flex-col px-4 pt-6 pb-6 sm:px-6 md:px-10 md:pt-10">

                <h1 className="mb-5 shrink-0 text-lg font-bold text-light-theme md:mb-6">
                    Your Decks
                </h1>

                <button
                    className="card-hover-theme card-theme mb-5 flex w-fit shrink-0 flex-row items-center gap-2 rounded-md px-5 py-2 text-xs font-bold text-light-theme md:mb-6 md:px-6"
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
                    className="flex min-h-0 w-full flex-1 flex-col items-center gap-3 overflow-y-auto pb-6 md:flex-row md:flex-wrap md:items-start md:justify-start md:gap-4"
                    style={{ alignContent: 'flex-start' }}
                >
                    {decks.map((deck) =>
                        deck.id ? (
                            <div
                                key={deck.id}
                                className="card-theme card-hover-theme w-full min-w-0 shrink-0 rounded-md md:w-56"
                            >
                                <DeckDropDown
                                    deck={deck}
                                    className="w-full"
                                    onNavigate={() => {
                                        localStorage.setItem(
                                            'decksScroll',
                                            String(
                                                scrollRef.current?.scrollTop || 0
                                            )
                                        )

                                        navigate(`/cards/${deck.id}`)
                                    }}
                                    onUpdate={handleDeckUpdated}
                                    onDelete={handleDeckDeleted}
                                >
                                    <div className="flex h-[72px] w-full min-w-0 items-end px-2 pb-2 md:h-32">
                                        <div className="flex w-full min-w-0 items-end justify-between gap-2 py-2">

                                            {/* Deck name */}
                                            <p className="flex min-w-0 items-center gap-1 text-sm font-bold capitalize md:text-md">
                                                <img
                                                    src="https://img.icons8.com/?size=100&id=Mz7SNHv9HVjx&format=png&color=000000"
                                                    alt="deck"
                                                    width={20}
                                                    height={20}
                                                    className="shrink-0 md:h-6 md:w-6"
                                                />

                                                <span className="min-w-0 truncate">
                                                    {deck.deckname}
                                                </span>
                                            </p>

                                            {/* Card count */}
                                            <p className="flex shrink-0 items-center justify-end gap-1 text-right text-xs text-gray-500 md:text-sm">
                                                {deck.cardCount ?? 0}

                                                <img
                                                    src="https://img.icons8.com/?size=100&id=gQhB1Tfi2cG2&format=png&color=000000"
                                                    alt="cards"
                                                    width={16}
                                                    height={16}
                                                    className="shrink-0 opacity-50"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </DeckDropDown>
                            </div>
                        ) : null
                    )}
                </div>
            </div>

            {showCreateDeck && (
                <Createdeck
                    onComplete={handleDeckCreated}
                />
            )}
        </div>
    )
}

export default Decks
 