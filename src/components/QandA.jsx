import { useState, useEffect, useRef } from 'react'
import { supabase } from "../supabaseClient"
import { X, Upload } from 'lucide-react'

// Shared responsive class strings (mobile-first, scale up at sm:)
const fieldInput =
  "w-full min-h-[3.5rem] sm:min-h-[6rem] border-black border-2 bg-gray-300 " +
  "rounded-2xl sm:rounded-full px-4 sm:px-10 py-3 text-base sm:text-lg " +
  "focus:outline-none focus:ring-2 focus:ring-black/40"

const fieldLabel = "block font-bold px-1 sm:pl-10 pb-1 text-base sm:text-lg"

const pillBtn =
  "font-bold min-h-[3rem] sm:min-h-[3.5rem] w-full sm:w-auto sm:flex-1 " +
  "border-black border-2 rounded-full px-5 text-sm sm:text-base " +
  "disabled:opacity-60"

const smallBtn =
  "font-bold border-black border-2 rounded-md px-4 py-2 text-sm sm:text-base"

const QandA = ({ deckId, onComplete, showForm, setShowForm, triggerAddNew }) => {

  const [choices, setChoices] = useState([])
  const [cardsList, setCardsList] = useState([])
  const scrollRef = useRef(null)
  const [editingId, setEditingId] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  // Fetch all cards for this deck
  useEffect(() => {
    if (!deckId) return

    const cached = localStorage.getItem(`cards_${deckId}`)
    if (cached && cached !== 'undefined') {
      try {
        setCardsList(JSON.parse(cached))
      } catch {
        localStorage.removeItem(`cards_${deckId}`)
      }
    }

    const fetchCards = async () => {
      const { data, error } = await supabase
        .from('cards')
        .select('id, front, back, option1, option2, option3, create_at, front_image_url')
        .eq('deck_id', deckId)
        .order('create_at', { ascending: false })

      if (!error && data) {
        setCardsList(data)
        localStorage.setItem(`cards_${deckId}`, JSON.stringify(data))

        data.forEach(c => {
          localStorage.setItem(`card_${c.id}`, JSON.stringify(c))
        })
        const ids = data.map(c => c.id)
        localStorage.setItem(`cardIds_${deckId}`, JSON.stringify(ids))
      }
    }

    fetchCards()
  }, [deckId])

  // Restore scroll position
  useEffect(() => {
    if (cardsList.length === 0) return
    const scroll = localStorage.getItem('deckScroll')
    if (scroll && scrollRef.current) {
      scrollRef.current.scrollTop = parseInt(scroll)
      localStorage.removeItem('deckScroll')
    }
  }, [cardsList])

  useEffect(() => {
    if (triggerAddNew) {
      handleAddNew()
    }
  }, [triggerAddNew])

  const [formCard, setFormCard] = useState({
    front: '',
    back: '',
    option1: '',
    option2: '',
    option3: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormCard({ ...formCard, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    let frontImageUrl = editingId
      ? cardsList.find((c) => c.id === editingId)?.front_image_url ?? null
      : null

    // user removed the preview while editing -> clear the image
    if (editingId && !imagePreview && !imageFile) frontImageUrl = null

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${deckId}-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('card-image')
        .upload(fileName, imageFile)

      if (uploadError) {
        setError(uploadError.message)
        setLoading(false)
        return
      }

      const { data: publicUrlData } = supabase.storage
        .from('card-image')
        .getPublicUrl(fileName)

      frontImageUrl = publicUrlData.publicUrl
    }

    const payload = editingId
      ? { id: editingId, deck_id: deckId, ...formCard, front_image_url: frontImageUrl }
      : { deck_id: deckId, ...formCard, front_image_url: frontImageUrl }

    const { data, error } = await supabase
      .from('cards')
      .upsert([payload], { onConflict: 'id' })
      .select()

    if (error) {
      setError(error.message)
    } else {
      if (data && data[0]) {
        setCardsList((prev) => {
          const exists = prev.some((c) => c.id === data[0].id)
          return exists
            ? prev.map((c) => (c.id === data[0].id ? data[0] : c))
            : [data[0], ...prev]
        })
      }

      setFormCard({ front: '', back: '', option1: '', option2: '', option3: '' })
      setImageFile(null)
      setImagePreview(null)
      setChoices([])
      setEditingId(null)
      setShowForm(false)
      if (onComplete) onComplete()
    }

    setLoading(false)
  }

  const handleDelete = async (cardId) => {
    const { error } = await supabase.from('cards').delete().eq('id', cardId)

    if (!error) {
      setCardsList((prev) => prev.filter((c) => c.id !== cardId))
    } else {
      setError(error.message)
    }
  }

  const handleEdit = (c) => {
    setEditingId(c.id)
    setFormCard({
      front: c.front,
      back: c.back,
      option1: c.option1 ?? '',
      option2: c.option2 ?? '',
      option3: c.option3 ?? '',
    })
    setImagePreview(c.front_image_url ?? null)
    setImageFile(null)
    const filledOptions = [c.option1, c.option2, c.option3].filter(Boolean)
    setChoices(filledOptions.map(() => ''))
    setShowForm(true)
  }

  const handleAddNew = () => {
    setEditingId(null)
    setFormCard({ front: '', back: '', option1: '', option2: '', option3: '' })
    setImageFile(null)
    setImagePreview(null)
    setChoices([])
    setShowForm(true)
  }

  const addChoice = () => {
    if (choices.length >= 3) return
    setChoices([...choices, ''])
  }

  return (
    <div
      ref={scrollRef}
      className="flex flex-col items-center w-full max-w-3xl mx-auto mt-3 sm:mt-5 px-3 sm:px-4 pb-6"
    >
      {showForm ? (
        <>
          {/* Form card */}
          <div className="flex flex-col w-full border-2 border-black/80 rounded-xl">
            <button
              type="button"
              aria-label="Close form"
              onClick={() => { setShowForm(false); setEditingId(null) }}
              className="self-end m-2 sm:mr-4 sm:mt-3 p-2"
            >
              <X size={24} />
            </button>

            <form
              id="card-form"
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-4 sm:gap-5 px-3 sm:px-6 pb-6 sm:pb-10 pt-1 sm:pt-3"
            >
              {/* Front */}
              <div className="w-full pb-2 sm:pb-3">
                <label htmlFor="front" className={fieldLabel}>Front</label>

                <div className="flex flex-col gap-3">
                  {imagePreview && (
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 mt-2 self-start ml-1 sm:ml-10">
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        aria-label="Remove image"
                        onClick={() => {
                          setImageFile(null)
                          setImagePreview(null)
                        }}
                        className="absolute -top-2 -right-2 border border-black/80 bg-white text-black rounded-full w-7 h-7 flex items-center justify-center"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  <div className="relative w-full">
                    <input
                      id="front"
                      className={`${fieldInput} pr-14 sm:pr-20`}
                      placeholder="Add Question"
                      name="front"
                      value={formCard.front}
                      onChange={handleChange}
                      required
                    />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      id="frontImageInput"
                      className="hidden"
                    />

                    <label
                      htmlFor="frontImageInput"
                      aria-label="Upload image"
                      className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 cursor-pointer p-2"
                    >
                      <Upload size={20} />
                    </label>
                  </div>
                </div>
              </div>

              <hr className="w-full border-black" />

              {/* Back */}
              <div className="w-full">
                <label htmlFor="back" className={fieldLabel}>Back</label>
                <input
                  id="back"
                  className={fieldInput}
                  name="back"
                  placeholder="Add Answer"
                  value={formCard.back}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Options */}
              {choices.map((choice, index) => {
                const fieldName = `option${index + 1}`
                return (
                  <div key={index} className="w-full">
                    <label htmlFor={fieldName} className={fieldLabel}>Option {index + 1}</label>
                    <input
                      id={fieldName}
                      name={fieldName}
                      className={fieldInput}
                      placeholder="Add choices"
                      value={formCard[fieldName]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )
              })}

              {error && (
                <p className="text-red-600 font-bold w-full text-sm sm:text-base break-words">
                  {error}
                </p>
              )}
            </form>
          </div>

          {/* Action bar: stacked on mobile, row on sm+ */}
          <div className="w-full mt-3 border border-black/80 rounded-xl px-3 sm:px-8 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch gap-3">
              {choices.length > 0 && (
                <button
                  type="button"
                  className={pillBtn}
                  onClick={() => setChoices(choices.slice(0, -1))}
                >
                  Delete choice
                </button>
              )}

              {choices.length < 3 && (
                <button type="button" className={pillBtn} onClick={addChoice}>
                  Add choices
                </button>
              )}

              <button
                className={pillBtn}
                type="submit"
                form="card-form"
                disabled={loading}
              >
                {loading ? 'Saving...' : editingId ? 'Save Changes' : 'Save'}
              </button>
            </div>
          </div>
        </>

      ) : cardsList.length > 0 ? (
        <div className="w-full flex flex-col gap-4">
          {cardsList.map((c) => (
            <div
              key={c.id}
              className="border border-black/80 rounded-xl p-3 sm:p-6 bg-gray-300 flex flex-col gap-2 min-w-0"
            >
              <h2 className="text-gray-600 text-lg sm:text-2xl px-1 sm:pl-2 pb-2 sm:pb-4">Front</h2>

              {c.front_image_url && (
                <img
                  src={c.front_image_url}
                  alt="front"
                  className="w-24 h-24 sm:w-32 sm:h-32 max-w-full object-cover rounded-md ml-1 sm:ml-5"
                />
              )}

              <p className="font-bold border-b border-black/80 pb-3 sm:pb-5 pt-3 sm:pt-4 px-1 sm:pl-5 text-base sm:text-lg break-words">
                {c.front}
              </p>

              <h2 className="text-gray-600 text-lg sm:text-2xl pt-3 sm:pt-5 px-1 sm:pl-2">Back</h2>
              <p className="font-bold border-b  border-black/80 pb-3 sm:pb-5 pt-2 sm:pt-5 px-1 sm:pl-5 text-base sm:text-lg break-words">
                {c.back}
              </p>

              {(c.option1 || c.option2 || c.option3) && (
                <div className="flex flex-col gap-2 pt-2 border-b  border-black/80 pb-5 sm:pb-8">
                  <h2 className="text-gray-600 text-lg sm:text-2xl pt-2 sm:pt-5 px-1 sm:pl-2">Choices</h2>
                  {[c.option1, c.option2, c.option3].filter(Boolean).map((opt, i) => (
                    <span key={i} className="font-bold px-1 sm:pl-5 text-base sm:text-lg break-words">
                      {opt}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap justify-end gap-3 mt-4 sm:mt-8">
                <button onClick={() => handleEdit(c)} className={smallBtn}>
                  Edit
                </button>
                <button onClick={() => handleDelete(c.id)} className={smallBtn}>
                  Delete
                </button>
              </div>
            </div>
          ))}

          <button
            className="font-bold border border-black/80 px-6 py-2.5 rounded-full w-full sm:w-fit self-center mt-2 text-sm sm:text-base"
            onClick={handleAddNew}
          >
            Add cards
          </button>
        </div>
      ) : (
        <div className="py-16 sm:py-32 flex flex-col items-center justify-center gap-4 text-center px-4 w-full">
          <h1 className="font-bold text-lg sm:text-xl">No Activity yet</h1>
          <p className="text-sm sm:text-base">Add your activity to start study.</p>

          <button
            className="font-bold border-[3px] border-black px-6 py-2.5 rounded-full w-full max-w-xs sm:w-fit text-sm sm:text-base"
            onClick={handleAddNew}
          >
            Add cards
          </button>
        </div>
      )}
    </div>
  )
}

export default QandA