import { Link } from 'react-router-dom'

const Sidebar = () => {

    return(

        <>

       <div className="flex flex-col h-screen w-64 text-black p-6 fixed top-0 left-0 border-x-2 border-black border-black">
            <h1 className="text-center font-bold text-2xl mb-8">L<img src="/mortarboard.png" className="w-6 h-7 inline pb-1"/>ze</h1>

            <div className="flex flex-col gap-3">
                <Link to="/" className="w-full">
                    <button className="w-full border-2 border-black font-bold text-left px-4 py-2 rounded-lg">
                        Home
                    </button>
                </Link>

                <Link to="/decks" className="w-full">
                    <button className="w-full border-2 border-black font-bold text-left px-4 py-2 rounded-lg">
                        Decks
                    </button>
                </Link>

                <Link to="/profile" className="w-full">
                    <button className="w-full border-2 border-black font-bold text-left px-4 py-2 rounded-lg">
                        Profile
                    </button>
                </Link>
            </div>
        </div>
        
        </>


    )
}
export default Sidebar
