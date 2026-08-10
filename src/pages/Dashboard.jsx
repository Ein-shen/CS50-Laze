import { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Signout from "../pages/Signout"
import Upperbar from "../components/Upperbar"
import Popup from "../components/Popup"
import { supabase } from "../supabaseClient"
import AdminDashboard from "../admin/AdminDashboard"

const Dashboard = ({ session, role }) => {
  const [hasProfile, setHasProfile] = useState(true)
  const [profile, setProfile] = useState(null)

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
      .select('fullname, username')
      .eq('id', userId)
      .single()

    const complete = !!(data?.fullname && data?.username)

    setProfile(data)
    setHasProfile(complete)
    localStorage.setItem(`hasProfile_${userId}`, JSON.stringify(complete))
  }

  return (
    <div className="flex h-screen bg-gray-300 overflow-hidden">

      <Sidebar role={role} />

      <div className="md:ml-64 flex-1 flex flex-col overflow-y-auto">
        <Upperbar />
        {/* NEW: admins always see the admin panel here, no matter the URL */}
        {role === 'admin' ? <AdminDashboard /> : <Outlet />}
      </div>

      {/* NEW: skip the "complete your profile" popup for admins, they don't need one */}
      {role !== 'admin' && session?.user && !hasProfile && (
        <Popup
          user={session.user}
          profile={profile}
          onComplete={() => {
            setHasProfile(true)
            localStorage.setItem(`hasProfile_${session.user.id}`, JSON.stringify(true))
          }}
          onCancel={() => setHasProfile(true)}
        />
      )}

    </div>
  )
}

export default Dashboard