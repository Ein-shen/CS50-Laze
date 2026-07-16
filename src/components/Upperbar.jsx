import { Link, useLocation } from 'react-router-dom'
import { Bell, MessageCircle, Search } from 'lucide-react'
import { useState } from 'react'

const Upperbar = () => {
    const location = useLocation()
    const isHome = location.pathname === "/"

    const [active, setActive] = useState(null)

    if (!isHome) return null

    return (
       <div className="flex flex-row h-16 w-full text-black px-6 fixed top-0 left-0 right-0 border-gray-400 items-center z-10">

             <div className="ml-auto flex flex-row gap-6 items-center">

                <Link to="/search">
                   <Search strokeWidth={3} size={24} />
                </Link>

                <Link to="/notification">
                   <Bell strokeWidth={3} size={24} />
                </Link>

                <Link to="/message">
                   <MessageCircle strokeWidth={3} size={24} />
                </Link>

            </div>
        </div>
    )
}

export default Upperbar
