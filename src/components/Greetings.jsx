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

      // Only trust the cache if it belongs to THIS user
      const cachedUid = localStorage.getItem("username_uid")
      const cachedName = localStorage.getItem("username")

      if (cachedName && cachedUid === user?.id) {
        setUsername(cachedName)
        return
      }

      setNameFromUser(user)
    }

    getUser()

    // Keep it in sync when user logs in/out/switches
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setNameFromUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <div className={isHome ? "mt-16 flex-1" : "flex-1"}>
      {isHome && (
        <h1 className="font-bold text-2xl flex justify-center">
          Hello {username}!
        </h1>
      )}
    </div>
  )
}

export default Greetings;
