import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
 
import Ai from '../Home/Ai'
const navItems = [
    {
        label: 'Overview',
        path: '/',
        icon: 'https://img.icons8.com/?size=100&id=tNcJ7GGjHsUq&format=png&color=000000',
    },
    { label: 'Decks', path: '/decks', icon: 'https://img.icons8.com/?size=100&id=Mz7SNHv9HVjx&format=png&color=000000' },
]

// recentAttempts comes from Dashboard. "= []" prevents a crash if it's missing.
const Sidebar = ({ recentAttempts = [] }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)

    const handleNavigate = (path) => {
        navigate(path)
        setIsOpen(false)
    }

    return (
        <>
            {/* Menu button - mobile only */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    aria-label="Open menu"
                    className="md:hidden fixed left-4 top-[4.25rem] z-30 flex items-center rounded-lg     p-2"
                >
                    <Menu size={20} strokeWidth={3} />
                </button>
            )}

            {/* Overlay - mobile only */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="md:hidden fixed inset-x-0 top-14 bottom-0 bg-black/40  z-30"
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed left-0 card-theme top-14 bottom-0 w-64 z-40 flex flex-col text-black
                overflow-y-auto transform transition-transform duration-300
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                {/* Close button - mobile only */}
                <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="md:hidden absolute top-2 right-2 p-1"
                >
                    <X size={22} strokeWidth={3} />
                </button>

                {/* Main navigation */}
                <div className="flex flex-col gap-3 px-6 pt-16 md:pt-10 pb-16">
                    {navItems.map(({ label, path, icon }) => {
                        const isActive =
                            path === '/'
                                ? location.pathname === '/'
                                : location.pathname === path ||
                                location.pathname.startsWith(path + '/')

                        return (
                            <button
                                key={label}
                                onClick={() => handleNavigate(path)}
                                className={`w-full flex items-center gap-3 div-theme font-bold text-left text-xs px-4 py-3 rounded-lg transition-colors hover:bg-black/5 ${
                                    isActive ? 'card-theme' : 'bg-[#A8B99F]'
                                }`}
                            >
                                {icon && <img src={icon} alt="" width={20} height={20} />}
                                <span>{label}</span>
                            </button>
                        )
                    })}
                </div>

               
                  <div className=" ">
                    <Ai onNavigate={() => setIsOpen(false)} />
                </div>
            
                  
                </div>
            
        </>
    )
}

export default Sidebar