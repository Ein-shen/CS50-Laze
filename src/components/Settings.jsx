import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Return from '../components/Return'

const settingsItems = [
  {
    label: 'Help and support',
    path: '/support',
    icon: 'https://img.icons8.com/?size=100&id=CKanVNIbMiJO&format=png&color=000000',
  },
  {
    label: 'Ask for help',
    path: '/help',
    icon: 'https://img.icons8.com/?size=100&id=wYfd7Y8cWmet&format=png&color=000000',
  },
  {
    label: 'About',
    path: '/about',
    icon: 'https://img.icons8.com/?size=100&id=PUULuXvUfB6u&format=png&color=000000',
  },
]

export const Settings = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-8 sm:gap-12 pt-6 sm:pt-10 px-4 sm:px-10 md:px-20">

      {/* Header */}
      <div className="flex flex-row items-center w-full">
        <Return to="/" className="top-0" />
        <h1 className="text-base sm:text-lg font-bold flex-1 text-center pr-10 sm:pr-16">
          Settings
        </h1>
      </div>

      {/* Settings list */}
      <div className="card-theme rounded-md w-full sm:w-[70%] mx-auto px-4 sm:px-6 py-2 flex flex-col">
        {settingsItems.map(({ label, path, icon }, i) => (
          <button
            key={label}
            type="button"
            onClick={() => navigate(path)}
            className={`w-full flex items-center justify-between gap-3 py-4 text-left font-bold text-sm sm:text-base transition-colors hover:opacity-80 ${
              i !== settingsItems.length - 1 ? 'border-b border-black/20' : ''
            }`}
          >
            <span className="flex flex-row items-center gap-3">
              <img src={icon} alt="" width={20} height={20} />
              {label}
            </span>
            <ChevronRight size={22} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default Settings