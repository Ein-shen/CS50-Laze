import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import Signout from '../pages/Signout'

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Overview', path: '/overview' },
    { label: 'Decks', path: '/decks' },
    { label: 'Profile', path: '/profile' },
]

const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)

    const handleNavigate = (path) => {
        navigate(path)
        setIsOpen(false)
    }

    return (
        <>
            {/* Menu button - mobile only, under the navbar. Hidden while the drawer is open */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    aria-label="Open menu"
                    className="md:hidden fixed left-4 top-[4.25rem] z-30 flex items-center rounded-lg border border-black/80 bg-gray-300 p-2"
                >
                    <Menu size={20} strokeWidth={3} />
                </button>
            )}

            {/* Overlay - mobile only, starts right below the navbar */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="md:hidden fixed inset-x-0 top-14 bottom-0 bg-black/40 z-30"
                />
            )}

            {/* Sidebar: always starts right below the navbar */}
            <div
                className={`fixed left-0 top-14 bottom-0 w-64 z-40 flex flex-col bg-gray-300 text-black
                    border-r border-black/80 overflow-y-auto transform transition-transform duration-300
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
                <div className="flex flex-col gap-3 px-6 pt-12 md:pt-6">
                    {navItems.map(({ label, path }) => {
                        const isActive =
                            path === '/'
                                ? location.pathname === '/'
                                : location.pathname === path ||
                                  location.pathname.startsWith(path + '/')

                        return (
                            <button
                                key={label}
                                onClick={() => handleNavigate(path)}
                                className={`w-full border border-black/80 font-bold text-left px-4 py-2 rounded-lg transition-colors hover:bg-gray-400/50 ${
                                    isActive ? 'bg-gray-400/60' : ''
                                }`}
                            >
                                {label}
                            </button>
                        )
                    })}
                </div>

                <div className="mt-auto px-6 pb-6">
                    <Signout />
                </div>
            </div>
        </>
    )
}

export default Sidebar