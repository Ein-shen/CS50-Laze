import { useState } from 'react'
import { ChevronRight, Mail, Heart, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Return from '../components/Return'

// ===== EDIT THESE =====
const DEVELOPER_NAME = 'Shen Sarsale'
const DEVELOPER_EMAIL = 'email@lazeu.com'
const SUPPORT_PATH = '/support'   // where "Support Lazeu" goes
// ======================

const RATING_KEY = 'lazeu_rating'

export const Help = () => {
  const navigate = useNavigate()

  // saved rating (0 = not rated yet)
  const [rating, setRating] = useState(() => {
    try {
      return Number(localStorage.getItem(RATING_KEY)) || 0
    } catch {
      return 0
    }
  })
  const [hover, setHover] = useState(0)

  const handleContact = () => {
    window.location.href = `mailto:${DEVELOPER_EMAIL}?subject=${encodeURIComponent('Lazeu help')}`
  }

  const handleRate = (value) => {
    setRating(value)
    try {
      localStorage.setItem(RATING_KEY, String(value))
    } catch {
      // ignore storage errors
    }
    // TODO (optional): save to Supabase here
  }

  const shown = hover || rating

  return (
    <div className="flex flex-col gap-8 sm:gap-12 pt-6 sm:pt-10 px-4 sm:px-10 md:px-20">

      {/* Header */}
      <div className="flex flex-row items-center w-full">
        <Return to="/" className="top-0" />
        <h1 className="text-base sm:text-lg font-bold flex-1 text-center pr-10 sm:pr-16">
          Help
        </h1>
      </div>

      {/* Help list */}
      <div className="card-theme rounded-md w-full sm:w-[70%] mx-auto px-4 sm:px-6 py-2 flex flex-col">

        {/* 1. Contact developer */}
        <button
          type="button"
          onClick={handleContact}
          className="w-full flex items-center justify-between gap-3 py-4 text-left font-bold text-sm sm:text-base transition-colors hover:opacity-80 border-b border-black/20"
        >
          <span className="flex flex-row items-center gap-3 min-w-0">
            <Mail size={20} className="flex-shrink-0" />
            <span className="flex flex-col min-w-0">
              <span>Contact developer</span>
              <span className="text-xs font-normal text-gray-600 truncate">
                {DEVELOPER_NAME} · {DEVELOPER_EMAIL}
              </span>
            </span>
          </span>
          <ChevronRight size={22} className="flex-shrink-0" />
        </button>

        {/* 2. Support Lazeu */}
        <button
          type="button"
          onClick={() => navigate(SUPPORT_PATH)}
          className="w-full flex items-center justify-between gap-3 py-4 text-left font-bold text-sm sm:text-base transition-colors hover:opacity-80 border-b border-black/20"
        >
          <span className="flex flex-row items-center gap-3">
            <Heart size={20} className="flex-shrink-0" />
            Support Lazeu
          </span>
          <ChevronRight size={22} className="flex-shrink-0" />
        </button>

        {/* 3. Rate Lazeu */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 py-4 font-bold text-sm sm:text-base">
          <span className="flex flex-row items-center gap-3">
            <Star size={20} className="flex-shrink-0" />
            Rate Lazeu
          </span>

          <div
            className="flex flex-row items-center gap-1"
            onMouseLeave={() => setHover(0)}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                aria-label={`Rate ${value} star${value > 1 ? 's' : ''}`}
                onClick={() => handleRate(value)}
                onMouseEnter={() => setHover(value)}
                className="p-0.5 transition-transform hover:scale-110"
              >
                <Star
                  size={24}
                  className={value <= shown ? 'text-yellow-500' : 'text-gray-500'}
                  fill={value <= shown ? 'currentColor' : 'none'}
                />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Help