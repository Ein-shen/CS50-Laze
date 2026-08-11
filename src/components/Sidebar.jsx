import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Signout from '../pages/Signout'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* mobile hamburger toggle */}
            <div className='pt-10'>
                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden fixed top-4 left-4 z-30 p-2 border-2 border-black rounded-lg bg-gray-300  flex items-start"
                >
                    <Menu size={24} strokeWidth={3} />
                </button>

            </div>

            {/* mobile overlay backdrop */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="md:hidden fixed inset-0 bg-black/40 z-30"
                />
            )}

            {/* sidebar */}
            <div
                className={`flex flex-col h-screen w-64 text-black p-6 fixed top-0 left-0 border-x-2 border-black z-40 bg-gray-300 transition-transform duration-200 
                ${isOpen ? 'translate-x-0 ' : '-translate-x-full '} md:translate-x-0`}
            >
                <div className="relative flex items-center justify-center mb-8">
                    <h1 className="text-center font-bold text-2xl">
                        L<img src="/mortarboard.png" className="w-6 h-7 inline pb-1" />zeu
                    </h1>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="md:hidden absolute right-0 p-1"
                    >
                        <X size={22} strokeWidth={3} />
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    <Link to="/" className="w-full" onClick={() => setIsOpen(false)}>
                        <button className="w-full border-2 border-black font-bold text-left px-4 py-2 rounded-lg">
                            Home
                        </button>
                    </Link>

                    <Link to="/decks" className="w-full" onClick={() => setIsOpen(false)}>
                        <button className="w-full border-2 border-black font-bold text-left px-4 py-2 rounded-lg">
                            Decks
                        </button>
                    </Link>

                    <Link to="/profile" className="w-full" onClick={() => setIsOpen(false)}>
                        <button className="w-full border-2 border-black font-bold text-left px-4 py-2 rounded-lg">
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