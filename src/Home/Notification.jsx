import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import Return from "../components/Return"

const Notification = () => {
  const [requests, setRequests] = useState([])

  const fetchRequests = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('friends')
      .select('id, requester_id, profiles!friends_requester_id_fkey(fullname, username, profiles_image)')
      .eq('receiver_id', user.id)
      .eq('status', 'pending')

    setRequests(data || [])
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const respond = async (id, accept) => {
    if (accept) {
      await supabase.from('friends').update({ status: 'accepted' }).eq('id', id)
    } else {
      await supabase.from('friends').delete().eq('id', id)
    }
    setRequests(prev => prev.filter(r => r.id !== id))
  }

  return (
    <div className="flex flex-col h-screen min-h-0 items-center pt-6 sm:pt-10 pb-6 sm:pb-10 px-4 sm:px-10 md:px-20 gap-8">
      <div className="w-full h-screen flex flex-col gap-6 sm:gap-12">

        {/* Header */}
        <div className="flex flex-row items-center w-full">
          <Return to="/" className="top-0" />
          <h1 className="text-base sm:text-lg flex flex-row gap-2 justify-center font-bold flex-1 text-center pr-10 sm:pr-16">
            <img
              src="https://img.icons8.com/?size=100&id=nY7Q73ERmlBS&format=png&color=000000"
              alt="Notification"
              width={24}
              height={24}
            />
            Notification
          </h1>
        </div>

        {/* Panel */}
        <div className="card-theme rounded-md w-full flex-1 px-4 sm:px-10 py-6 sm:py-10 flex flex-col items-center gap-2">
          <div className="flex-1 overflow-y-auto min-h-0 px-2 sm:px-5 py-3 flex flex-col gap-4 pt-4 sm:pt-6 w-full sm:w-2/3 items-center">

           

            {requests.length === 0 && (
              <p className="text-gray-700 pt-10">No Notifications.</p>
            )}

            {requests.map(r => (
              <div
                key={r.id}
                className="div-theme card-hover-theme rounded-md p-3 sm:p-4 w-full sm:w-2/3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {r.profiles.profiles_image && (
                    <img
                      src={r.profiles.profiles_image}
                      alt={r.profiles.fullname}
                      className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <h2 className="font-bold text-l truncate">{r.profiles.fullname}</h2>
                    <p className="text-sm text-gray-500 truncate">@{r.profiles.username}</p>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => respond(r.id, true)}
                    className="border border-black/80 rounded-md px-3 py-1 text-sm font-bold bg-green-200 text-black"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => respond(r.id, false)}
                    className="border border-black/80 rounded-md px-3 py-1 text-sm font-bold bg-red-200 text-black"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification