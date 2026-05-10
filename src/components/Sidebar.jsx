import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Signout from '../pages/Signout'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* mobile hamburger toggle (sits inside the navbar) */}
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden border fixed top-2 left-3 z-[60] p-2 border-x border-black/80 rounded-lg bg-gray-300 flex items-center"
            >
                <Menu size={24} strokeWidth={3} />
            </button>

            {/* mobile overlay backdrop (starts below the navbar) */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="md:hidden fixed inset-0 top-14 bg-black/40 z-30"
                />
            )}

            {/* sidebar */}
            <div
                className={`flex flex-col w-64 text-black p-6 fixed top-14 bottom-0 left-0 border-x border-black/80 z-40 bg-gray-300 transition-transform duration-200 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                

                <div className="flex flex-col gap-3">
                    <Link to="/" className="w-full" onClick={() => setIsOpen(false)}>
                        <button className="w-full border border-black/80 font-bold text-left px-4 py-2 rounded-lg">
                            Home
                        </button>
                    </Link>

                    <Link to="/decks" className="w-full" onClick={() => setIsOpen(false)}>
                        <button className="w-full border border-black/80 font-bold text-left px-4 py-2 rounded-lg">
                            Decks
                        </button>
                    </Link>

                    <Link to="/profile" className="w-full" onClick={() => setIsOpen(false)}>
                        <button className="w-full border border-black/80 font-bold text-left px-4 py-2 rounded-lg">
                            Profile
                        </button>
                    </Link>
                </div>

                <div className="mt-auto">
                    <Signout />
                </div>
            </div>
        </>
    )
}
export default Sidebar