import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import { useLocation } from "react-router-dom"

const Greetings = () => {
  const location = useLocation();
  const isHome = location.pathname === "/"

  const [username, setUsername] = useState(() => {
    const cached = localStorage.getItem("username")
    return cached && cached !== 'undefined' ? cached : ""
  })

  useEffect(() => {
    const setNameFromProfile = async (user) => {
      if (!user) {
        setUsername("")
        localStorage.removeItem("username")
        localStorage.removeItem("username_uid")
        return
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("fullname")
        .eq("id", user.id)
        .single()

      if (error || !profile?.fullname) {
        setUsername("")
        return
      }

      const firstName = profile.fullname.split(" ")[0]

      setUsername(firstName)
      localStorage.setItem("username", firstName)
      localStorage.setItem("username_uid", user.id)
    }

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const cachedUid = localStorage.getItem("username_uid")
      const cachedName = localStorage.getItem("username")

      // already showing cached name for this user — just verify quietly in background
      if (cachedName && cachedUid === user?.id) {
        setNameFromProfile(user)
        return
      }

      setNameFromProfile(user)
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setNameFromProfile(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  if (!isHome) return null

  return <>Hello {username}!</>
}

export default Greetings;