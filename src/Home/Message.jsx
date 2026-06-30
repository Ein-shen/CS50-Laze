import Return from "../components/Return"
import React from 'react'
import { supabase } from "../supabaseClient"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search as SearchIcon } from 'lucide-react'

const Message = () => {
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false

    const loadFriends = async () => {
      // 1. get the logged-in user so the cache key is per user
      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user

      if (!user) {
        setFriends([])
        setLoading(false)
        return
      }

      const cacheKey = `friends_${user.id}`

      // 2. show the saved copy instantly (if there is one)
      const cached = localStorage.getItem(cacheKey)
      if (cached && cached !== 'undefined') {
        try {
          if (!cancelled) {
            setFriends(JSON.parse(cached))
            setLoading(false)
          }
        } catch {
          localStorage.removeItem(cacheKey) // corrupted, throw it away
        }
      }

      // 3. fetch fresh data, then update the screen AND the saved copy
      const { data, error } = await supabase.from('my_friends').select('*')

      if (cancelled) return

      if (error) {
        console.error('Error fetching friends:', error)
        setLoading(false)
        return
      }

      setFriends(data || [])
      localStorage.setItem(cacheKey, JSON.stringify(data || []))
      setLoading(false)
    }

    loadFriends()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="flex flex-col h-screen min-h-0 items-center pt-6 sm:pt-10 pb-6 sm:pb-10 px-4 sm:px-10 md:px-20 gap-8">
      <div className="w-full h-screen flex flex-col gap-6 sm:gap-12">
        <div className="flex flex-row items-center w-full">
          <Return to="/" className="top-0" />
          <h1 className="text-base sm:text-lg flex flex-row gap-2 justify-center font-bold flex-1 text-center pr-10 sm:pr-16">
            <img
              src="https://img.icons8.com/?size=100&id=jOjH1Mt48Fp1&format=png&color=000000"
              alt="messenger"
              width={24}
              height={24}
            />
            Message
          </h1>
        </div>

        <div className="card-theme rounded-md w-full flex-1 px-4 sm:px-10 py-6 sm:py-10 flex flex-col items-center gap-2">
          <div className="relative w-full max-w-[200px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search to message"
              className="bg-gray-300 border border-black/80 div-theme rounded-md w-full h-10 pl-9"
            />
          </div>

          <div className="flex-1 overflow-y-auto min-h-0 px-2 sm:px-5 py-3 flex flex-col gap-4 pt-10 sm:pt-16 w-full sm:w-2/3 items-center">
            <div className="flex justify-start w-full sm:w-2/3 pl-2">
              <h1 className="left-0 text-md font-bold">Friends</h1>
            </div>

            {friends.map((friend) => (
              <div
                key={friend.friendship_id}
                className="div-theme card-hover-theme rounded-md p-3 sm:p-4 w-full sm:w-2/3 flex items-center gap-3 shadow-sm hover:shadow-md transition cursor-pointer"
                onClick={() =>
                  navigate(`/chat/${friend.friendship_id}`, {
                    state: { name: friend.fullname, imageUrl: friend.profiles_image },
                  })
                }
              >
                {friend.profiles_image && (
                  <img
                    src={friend.profiles_image}
                    alt={friend.fullname}
                    className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                  />
                )}

                <h2 className="font-bold text-l truncate">{friend.fullname}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message