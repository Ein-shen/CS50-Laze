 
import { useEffect, useRef, useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import Createdeck from '../components/Createdeck'
import { supabase } from '../supabaseClient'

const DeckDropDown = ({
    deck,
    onNavigate,
    onUpdate,
    onDelete,
    children,
    className = '',
}) => {
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

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleDelete = async () => {
        const { error: attemptsError } = await supabase
            .from('quiz_attempts')
            .delete()
            .eq('deck_id', deck.id)

        if (attemptsError) {
            console.error('Error deleting quiz attempts:', attemptsError)
            return
        }

        const { error: cardsError } = await supabase
            .from('cards')
            .delete()
            .eq('deck_id', deck.id)

        if (cardsError) {
            console.error('Error deleting cards:', cardsError)
            return
        }

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
            .update({ is_public: !deck.is_public })
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
            alert('Link copied!')
        } catch (err) {
            console.error('Failed to copy link:', err)
        }

        setOpen(false)
    }

    return (
        <div
            className={`relative box-border w-full min-w-0 cursor-pointer rounded-md ${className}`}
            onClick={onNavigate}
        >
            <div
                className="absolute right-2 top-2 z-20"
                ref={menuRef}
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpen((o) => !o)
                    }}
                    aria-label="Deck options"
                    aria-haspopup="true"
                    aria-expanded={open}
                    className="flex cursor-pointer items-center justify-center rounded-md p-1"
                >
                    <MoreHorizontal size={20} />
                </button>

                {open && (
                    <div
                        role="menu"
                        className="absolute right-0 top-8 z-30 w-36 overflow-hidden rounded-lg border border-black bg-gray-300 shadow-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            role="menuitem"
                            onClick={() => {
                                setIsEditing(true)
                                setOpen(false)
                            }}
                            className="nav-theme card-hover-theme flex w-full items-center gap-1 border-b border-black/80 px-3 py-2 text-left text-xs font-bold"
                        >
                            <img
                                src="https://img.icons8.com/?size=100&id=dGDK6sDzQfsa&format=png&color=000000"
                                alt="edit"
                                height={16}
                                width={16}
                            />
                            Edit
                        </button>

                        <button
                            role="menuitem"
                            onClick={() => {
                                handleDelete()
                                setOpen(false)
                            }}
                            className="nav-theme card-hover-theme flex w-full items-center gap-1 border-b border-black/80 px-3 py-2 text-left text-xs font-bold"
                        >
                            <img
                                src="https://img.icons8.com/?size=100&id=A6KpvyL1Ezlb&format=png&color=000000"
                                alt="delete"
                                height={16}
                                width={16}
                            />
                            Delete
                        </button>

                        <button
                            role="menuitem"
                            onClick={handlePublic}
                            className="nav-theme card-hover-theme flex w-full items-center gap-1 border-b border-black/80 px-3 py-2 text-left text-xs font-bold"
                        >
                            <img
                                src="https://img.icons8.com/?size=100&id=w_qRMJOKoZGs&format=png&color=000000"
                                alt="public"
                                height={16}
                                width={16}
                            />
                            {deck.is_public ? 'Make Private' : 'Make Public'}
                        </button>

                        <button
                            role="menuitem"
                            onClick={handleCopyLink}
                            className="nav-theme card-hover-theme flex w-full items-center gap-1 px-3 py-2 text-left text-xs font-bold"
                        >
                            <img
                                src="https://img.icons8.com/?size=100&id=CYKLk4DosdHW&format=png&color=000000"
                                alt="link"
                                height={16}
                                width={16}
                            />
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
 