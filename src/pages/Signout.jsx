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
        className="text-center w-full border-2 border-black font-bold text-left px-4 py-2 rounded-lg">
        Sign Out
    </button>
  )
}

export default Signout

