import { supabase } from '../supabaseClient'

const Signout = () => {

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()  // ← actually sign out
    if (error) {
      console.log("Error signing out:", error)
    }
  }

  return (
    <button
        onClick={handleSignOut}
        className="text-center  flex flex-row gap-2 hover:bg-gray-400 items-center w-full text-xs border border-black/80 font-bold text-left px-4 py-2 rounded-lg"
        >
          <img src="https://img.icons8.com/?size=100&id=mFtP0gepGplg&format=png&color=000000" 
               alt=" logout"
               width={24}
               height={24} 
               />
        Sign Out
    </button>
  )
}

export default Signout

