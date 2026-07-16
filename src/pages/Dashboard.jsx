import { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Signout from "../pages/Signout"
import Upperbar from "../components/Upperbar"
import Popup from "../components/Popup"
import { supabase } from "../supabaseClient"

const Dashboard = ({ session }) => {
  const [hasProfile, setHasProfile] = useState(true)

  useEffect(() => {
    if (session?.user) {
      checkProfile(session.user.id)
    }
  }, [session])

  const checkProfile = async (userId) => {
    const cached = localStorage.getItem(`hasProfile_${userId}`)
    if (cached && cached !== 'undefined') {
      try {
        setHasProfile(JSON.parse(cached))
      } catch {
        localStorage.removeItem(`hasProfile_${userId}`)
      }
    }

    const { data } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single()

    setHasProfile(!!data)
    localStorage.setItem(`hasProfile_${userId}`, JSON.stringify(!!data))
  }

  return (
    <div className="flex h-screen bg-gray-300 overflow-hidden">

      <Sidebar />

      <div className="fixed bottom-0 left-0 w-64 px-6 pb-6">
        <Signout />
      </div>

      <div className="ml-64 flex-1 flex flex-col overflow-y-auto">
        <Upperbar />
        <Outlet />
      </div>

      {session?.user && !hasProfile && (
        <Popup
          user={session.user}
          onComplete={() => setHasProfile(true)}
        />
      )}

    </div>
  )
}

export default Dashboard
