import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import { useLocation } from "react-router-dom"

const Greetings = () => {
  const location = useLocation();
  const isHome = location.pathname === "/"

  const [username, setUsername] = useState("")

  useEffect(() => {
    const setNameFromUser = (user) => {
      if (!user) {
        setUsername("")
        localStorage.removeItem("username")
        return
      }

      const fullName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email;

      const firstName = fullName.split(" ")[0]

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

      if (cachedName && cachedUid === user?.id) {
        setUsername(cachedName)
        return
      }

      setNameFromUser(user)
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setNameFromUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  if (!isHome) return null

  return <>Hello {username}!</>
}

export default Greetings;