import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { X } from 'lucide-react'
import DeckDropDown from "../components/DeckDropDown"

const Createdeck = ({ deck = {}, onComplete, onCancel }) => {
    const [form, setForm] = useState({ deckname: deck.deckname ?? '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const isEditing = !!deck.id   // 👈 true if we were handed an existing deck, false if creating new

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            setError('Not logged in')
            setLoading(false)
            return
        }

        let result

        if (isEditing) {
            // updating an existing deck's name
            result = await supabase
                .from('decks')
                .update({ deckname: form.deckname })
                .eq('id', deck.id)
                .select()
        } else {
            // creating a brand new deck
            result = await supabase
                .from('decks')
                .insert([{ user_id: user.id, deckname: form.deckname, is_public: false }])
                .select()
            }

        const { data, error } = result

        if (error) {
            setError(error.message)
        } else {
            onComplete(data[0])
        }

        setLoading(false)
    }

    return (
        <div style={Deck_style.overlay} onClick={(e) => e.stopPropagation()}>
            <div style={Deck_style.modal}>

                <button
                    style={Deck_style.X}
                    onClick={onCancel ?? onComplete}

                    >
                    <X size={24} />
                </button>

                <h1>{isEditing ? 'Edit your deck' : 'Add your deck'}</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        style={Deck_style.input}
                        name="deckname"
                        placeholder="Input your deck name"
                        value={form.deckname}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        style={Deck_style.button}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Deck'}
                    </button>
                </form>
            </div>
        </div>
    )
}

const Deck_style = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modal: {
        position: 'relative',
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        marginBottom: '0.75rem',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    button: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#4f46e5',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    X: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
    }
}

export default Createdeck
