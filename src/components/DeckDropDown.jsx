import { useEffect, useRef, useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import Createdeck from "../components/Createdeck"
import { supabase } from '../supabaseClient'

const DeckDropDown = ({ deck, onNavigate, onUpdate, onDelete, children }) => {
    const [open, setOpen] = useState(false)
    const menuRef = useRef(null)
    const [isEditing, setIsEditing] = useState(false)
    const [deckname, setDeckname] = useState(deck?.deckname ?? '')

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])


   //Deleting an entire deck need to delete the others look below
   const handleDelete = async () => {
        // delete dependent quiz_attempts first
        const { error: attemptsError } = await supabase
            .from('quiz_attempts')
            .delete()
            .eq('deck_id', deck.id)

        if (attemptsError) {
            console.error('Error deleting quiz attempts:', attemptsError)
            return
        }

        // delete dependent cards
        const { error: cardsError } = await supabase
            .from('cards')
            .delete()
            .eq('deck_id', deck.id)

        if (cardsError) {
            console.error('Error deleting cards:', cardsError)
            return
        }

        // finally delete the deck itself
        const { error } = await supabase
            .from('decks')
            .delete()
            .eq('id', deck.id)

        if (error) {
            console.error('Error deleting deck:', error)
            return
        }

        onDelete?.(deck.id)
    }


    const handlePublic = async () => {


        const { data, error } = await supabase
        .from('decks')
        .update({is_public: !deck.is_public})
        .eq('id', deck.id)
        .select()
        .single()

    if (error) {
        console.error('Error updating deck visibility:', error)
        return

        }
        onUpdate?.(data)
        setOpen(false)
    }


    const handleCopyLink = async () => {

        const link = `${window.location.origin}/share/${deck.id}`
        try {
            await navigator.clipboard.writeText(link)
            // optional: show a toast/alert
            alert('Link copied!')
        } catch (err) {
            console.error('Failed to copy link:', err)
        }
        setOpen(false)
    }


    const handleUpdate = (updatedDeck) => {
        setDecks(prevDecks =>
            prevDecks.map(d => d.id === updatedDeck.id ? updatedDeck : d)
        )
    }

    return (
        <div
            className="rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow pl-3 pr-3 pt-3"
            style={{ width: '220px' }}
            onClick={onNavigate}
        >
            <div className="relative flex justify-end" ref={menuRef}>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpen((o) => !o)
                    }}
                    aria-haspopup="true"
                    aria-expanded={open}
                    
                    className="flex justify-end p-1  shadow-sm hover:shadow-md transition cursor-pointer"
                >
                    <MoreHorizontal />
                </button>

                {open && (
                    <div
                        role="menu"
                       className="border-black border-2 absolute right-0 top-6 w-36 rounded-lg border border-black bg-gray-300 shadow-md z-10 overflow-hidden"
                    >
                        <button
                            role="menuitem"
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsEditing(true)
                                setOpen(false)
                            }}
                            className=" border-b-2 border-black   font-bold block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                        >
                            Edit
                        </button>

                        <button
                            role="menuitem"
                            onClick={(e) => {
                                e.stopPropagation()
                                handleDelete()
                                setOpen(false)
                            }}
                       className="border-b-2 border-black font-bold block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                        >
                            Delete
                        </button>

                        <button role="menuitem"
                            onClick={(e) => { e.stopPropagation()
                            setOpen(false)
                            handlePublic()
                        }}
                            className="border-b-2 border-black   font-bold block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                            >

                            {deck.is_public ? 'Make Private' : 'Make Public'}
                            </button>

                        <button role="menuitem"
                            onClick={(e) => {
                            e.stopPropagation()
                            setOpen(false)
                            handleCopyLink()
                        }}
                            className=" rounded-md font-bold block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                            >
                            Copy link
                        </button>
                    </div>
                )}
            </div>

            {isEditing && (
                <Createdeck
                    deck={{ ...deck, deckname }}
                    onComplete={(updatedDeck) => {
                        setDeckname(updatedDeck.deckname)
                        setIsEditing(false)
                        onUpdate?.(updatedDeck)
                    }}
                    onCancel={() => setIsEditing(false)}
                />
            )}

            {children}
        </div>
    )
}

export default DeckDropDown
