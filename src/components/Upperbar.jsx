import { Link, useLocation } from 'react-router-dom'
import { Bell, MessageCircle, Search } from 'lucide-react'

const Upperbar = () => {
    const location = useLocation()
    const isHome = location.pathname === "/"

    if (!isHome) return null

    return (
        <div className="flex flex-row items-center gap-6 text-black">
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
    )
}

export default Upperbar