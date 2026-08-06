import { useState, useEffect, useRef } from 'react'
import { supabase } from "../supabaseClient"
import { X } from 'lucide-react'
import { Upload } from "lucide-react"


const QandA = ({ deckId, onComplete, showForm, setShowForm, triggerAddNew }) => {

  const [choices, setChoices] = useState([])
  const [cardsList, setCardsList] = useState([])
  const scrollRef = useRef(null)
  const [editingId, setEditingId] = useState(null)   // tracks which card is being edited (null = adding new)
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
    setImagePreview(URL.createObjectURL(file))  // local preview before uploading
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // start with existing image url if editing, otherwise null
    let frontImageUrl = editingId
      ? cardsList.find((c) => c.id === editingId)?.front_image_url ?? null
      : null

    // upload new image if one was selected
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

      setFormCard({
        front: '',
        back: '',
        option1: '',
        option2: '',
        option3: '',
      })
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

    const { error } = await supabase
    .from('cards')
    .delete()
    .eq('id', cardId)

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
    <div ref={scrollRef} className="flex flex-col items-center h-auto rounded-xl pt-1 max-w-3xl w-full mx-auto mt-5 px-3 sm:px-0">
      {showForm ? (
        <>
          <div className="flex flex-col h-auto border-black rounded-xl border-2 pt-1 max-w-3xl w-full mx-auto mt-5">
            <button
                type="button"
                onClick={() => { setShowForm(false); setEditingId(null) }}
                className="self-end mr-4 mt-2"
            >
              <X size={24} />
            </button>
            <form className="w-full h-auto pb-10 pt-5 items-center flex flex-col gap-4 px-4 sm:px-6"
              id="card-form"
              onSubmit={handleSubmit}>

              <div className="w-full pb-3">
                <h1 className="font-bold pl-2 sm:pl-10 pb-1 text-base sm:text-lg">Front</h1>

                <div className="flex flex-col items-center gap-4">

                  {imagePreview && (
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 mt-2 self-start ml-2 sm:ml-10">
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null)
                          setImagePreview(null)
                        }}
                        className="absolute -top-2 -right-2 border-black border-2 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  <div className="relative w-full">
                    <input
                      className="w-full h-20 sm:h-24 border-2 border-black rounded-2xl sm:rounded-full px-4 sm:px-10 pr-12 sm:pr-16 bg-gray-300 text-sm sm:text-base"
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
                      className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      <Upload size={20} />
                    </label>
                  </div>
                </div>
              </div>

              <hr className="w-full border-black border-1" />

              <div className="w-full">
                <h1 className="font-bold pl-2 sm:pl-10 pb-1 text-base sm:text-lg">Back</h1>
                <input
                  className="w-full h-20 sm:h-24 border-black border-2 rounded-2xl sm:rounded-full px-4 sm:px-10 bg-gray-300 text-sm sm:text-base"
                  name="back"
                  placeholder="Add Answer"
                  value={formCard.back}
                  onChange={handleChange}
                  required
                />
              </div>

              {choices.map((choice, index) => {
                const fieldName = `option${index + 1}`
                return (
                  <div key={index} className="w-full">
                    <h1 className="font-bold pl-2 sm:pl-10 pb-1 text-base sm:text-lg">Option {index + 1}</h1>
                    <input
                      name={fieldName}
                      className="w-full h-20 sm:h-24 border-black border-2 rounded-2xl sm:rounded-full px-4 sm:px-10 bg-gray-300 text-sm sm:text-base"
                      placeholder="Add choices"
                      value={formCard[fieldName]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )
              })}

              {error && <p className="text-red-600 font-bold w-full text-sm sm:text-base">{error}</p>}
            </form>
          </div>

          <div className="max-w-3xl w-full mx-auto mb-5 mt-1 h-auto border-black border-2 rounded-xl px-4 sm:px-10 py-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                {choices.length > 0 && (
                  <button
                    type="button"
                    className="font-bold h-12 sm:h-14 w-full sm:w-2/4 border-black border-2 rounded-full px-5 text-sm sm:text-base"
                    onClick={() => setChoices(choices.slice(0, -1))}>
                    Delete choice
                  </button>
                )}

                <button
                  type="button"
                  className="font-bold h-12 sm:h-14 w-full sm:w-2/4 border-black border-2 rounded-full px-5 text-sm sm:text-base"
                  onClick={addChoice}>
                  Add choices
                </button>

                <button
                  className="font-bold h-12 sm:h-14 w-full sm:w-2/4 border-black border-2 rounded-full px-5 text-sm sm:text-base"
                  type="submit"
                  form="card-form"
                  disabled={loading}>
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
              className="border-black border-2 rounded-xl p-4 sm:p-6 bg-gray-300 flex flex-col gap-2"
            >
              <h1 className="text-gray-600 text-lg sm:text-2xl pl-1 sm:pl-2 pb-3 sm:pb-5"> Front</h1>
              {c.front_image_url && (
                <img
                  src={c.front_image_url}
                  alt="front"
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md ml-2 sm:ml-5"
                />
              )}
              <p className="font-bold border-b-2 border-black pb-3 sm:pb-5 pt-4 pl-2 sm:pl-5 text-base sm:text-lg break-words">{c.front} </p>
              <h1 className="text-gray-600 text-lg sm:text-2xl pt-3 sm:pt-5 pl-1 sm:pl-2"> Back </h1>
              <p className="font-bold border-b-2 border-black pb-3 sm:pb-5 pt-3 sm:pt-5 pl-2 sm:pl-5 text-base sm:text-lg break-words">{c.back}</p>

              {(c.option1 || c.option2 || c.option3) && (
                  <div className="flex flex-col gap-2 pt-3 border-b-2 border-black pb-6 sm:pb-8">
                    <div className="text-gray-600 text-lg sm:text-2xl pt-3 sm:pt-5 pl-1 sm:pl-2"> Choices </div>
                    {c.option1 && <span className="font-bold pl-2 sm:pl-5 pt-3 sm:pt-5 text-base sm:text-lg break-words">{c.option1}</span>}
                    {c.option2 && <span className="font-bold pl-2 sm:pl-5 text-base sm:text-lg break-words">{c.option2}</span>}
                    {c.option3 && <span className="font-bold pl-2 sm:pl-5 text-base sm:text-lg break-words">{c.option3}</span>}
                  </div>
              )}

              <div className="flex justify-end gap-3 mt-6 sm:mt-10">
                <button
                  onClick={() => handleEdit(c)}
                  className="font-bold border-black border-2 rounded-md px-3 sm:px-4 py-1 text-sm sm:text-base"
                >
                  Edit
                </button>

                <button
                  className="font-bold border-black border-2 rounded-md px-3 sm:px-4 py-1 text-sm sm:text-base"
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <button
            className="flex items-center font-bold gap-2 border-[3px] border-black px-5 sm:px-6 py-2 rounded-full w-fit self-center mt-2 text-sm sm:text-base"
            onClick={handleAddNew}
          >
            Add cards
          </button>
        </div>
      ) : (
        <div className="pt-20 sm:pt-36 flex flex-col items-center justify-center gap-4 pb-20 sm:pb-36 text-center px-4">
          <h1 className="font-bold text-lg sm:text-xl">No Activity yet</h1>
          <p className="text-sm sm:text-base">Add your activity to start study.</p>

          {/* The bottom Add card button */}
          <button
            className="flex items-center font-bold gap-2 border-[3px] border-black px-5 sm:px-6 py-2 rounded-full w-fit text-sm sm:text-base"
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