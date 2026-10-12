import { Link, useLocation } from 'react-router-dom'


const Upperbar = () => {
    const location = useLocation()
    const isHome = location.pathname === "/"

    if (!isHome) return null

    return (
        <div className="flex flex-row items-center gap-4 text-black">
            <Link to="/search">
                <img
                    src="https://img.icons8.com/?size=100&id=p3miLroKw4iR&format=png&color=000000"
                    alt="Search"
                    width={24}
                    height={24}
                />
            </Link>

            <Link to="/notification">
                <img
                 src="https://img.icons8.com/?size=100&id=F5WMYjiT3vpJ&format=png&color=000000"
                 alt="Notification"
                 width={24}
                 height={24}
                 />
            </Link>

            <Link to="/message">
                <img src="https://img.icons8.com/?size=100&id=7xKps2PngOP0&format=png&color=000000" 
                     alt=" messenger"
                     width={24}
                     height={24} />
            </Link>
        </div>
    )
}

export default Upperbar