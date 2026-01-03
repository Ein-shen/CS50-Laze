import { useState } from 'react'
import { ChevronRight, Mail, Heart, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Return from '../components/Return'

// ===== EDIT THESE =====
const DEVELOPER_NAME = 'Shen Sarsale'
const DEVELOPER_EMAIL = 'email@lazeu.com'
const SUPPORT_PATH = ''   // e.g. '/support'. Leave empty until the page exists
// ======================

const RATING_KEY = 'lazeu_rating'

// action: 'contact' opens the email app, otherwise `path` is used.
// Rows with no path and no action do nothing when clicked.
const settingsItems = [
  {
    label: 'Help and support',
    path: '',   // e.g. '/support'
    icon: 'https://img.icons8.com/?size=100&id=30379&format=png&color=000000',
  },
  {
    label: 'Ask for help',
    action: 'contact',
    icon: 'https://img.icons8.com/?size=100&id=3I5w44gHhXXv&format=png&color=000000',
  },
  {
    label: 'About',
    path: '',   // e.g. '/about'
    icon: 'https://img.icons8.com/?size=100&id=3439&format=png&color=000000',
  },
]

export const Settings = () => {
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
  }

  const goTo = (path) => {
    if (path && path.trim()) navigate(path.trim())
  }

  const handleItemClick = ({ action, path }) => {
    if (action === 'contact') handleContact()
    else goTo(path)
  }

  const shown = hover || rating

  const rowClass =
    'w-full flex items-center justify-between gap-3 py-4 text-left font-bold text-sm sm:text-base transition-colors hover:opacity-80 border-b border-black/20'

  return (
    <div className="flex flex-col gap-8 sm:gap-12 pt-6 sm:pt-10 px-4 sm:px-10 md:px-20">

      {/* Header */}
      <div className="flex flex-row items-center w-full">
        <Return to="/" className="top-0" />
        <h1 className="text-base sm:text-lg font-bold flex-1 text-center pr-10 sm:pr-16">
          Settings
        </h1>
      </div>

      {/* Settings list: same width and inset as the Message panel */}
      <div className="card-theme rounded-md w-full px-4 sm:px-10 py-2 flex flex-col">

        {/* Original settings rows */}
        {settingsItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => handleItemClick(item)}
            className={rowClass}
          >
            <span className="flex flex-row items-center gap-3">
              <img src={item.icon} alt="" width={24} height={24} />
              {item.label}
            </span>
            <ChevronRight size={22} />
          </button>
        ))}

        {/* Contact developer */}
        <button type="button" onClick={handleContact} className={rowClass}>
          <span className="flex flex-row items-center gap-3 min-w-0">
            <Mail size={24} className="flex-shrink-0" />
            <span className="flex flex-col min-w-0">
              <span>Contact developer</span>
              <span className="text-xs font-normal text-gray-600 truncate">
                {DEVELOPER_NAME} · {DEVELOPER_EMAIL}
              </span>
            </span>
          </span>
          <ChevronRight size={22} className="flex-shrink-0" />
        </button>

        {/* Support Lazeu */}
        <button type="button" onClick={() => goTo(SUPPORT_PATH)} className={rowClass}>
          <span className="flex flex-row items-center gap-3">
            <Heart size={24} className="flex-shrink-0" />
            Support Lazeu
          </span>
          <ChevronRight size={22} className="flex-shrink-0" />
        </button>

        {/* Rate Lazeu (last row, no divider) */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 py-4 font-bold text-sm sm:text-base">
          <span className="flex flex-row items-center gap-3">
            <Star size={24} className="flex-shrink-0" />
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

export default Settings$env:GIT_AUTHOR_DATE="2026-1-3  2:12:00"
$env:GIT_COMMITTER_DATE="2026-1-3 3:21:00"