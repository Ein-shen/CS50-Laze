import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import Return from "./Return"

const Notification = () => {
  const [requests, setRequests] = useState([])

  const fetchRequests = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('friends')
      .select('id, requester_id, profiles!friends_requester_id_fkey(fullname, username)')
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

    <div className="flex flex-col items-center pt-10 gap-4">

      <div className="flex flex-row items-center w-full">
          <Return to="/" className="top-0" />
          <h1 className="font-bold text-lg flex-1 text-center pr-16">Friend Requests</h1>
      </div>

      {requests.length === 0 && <p className="text-gray-400 pt-10">No pending requests.</p>}

      {requests.map(r => (
        <div key={r.id} className="border-2 border-black rounded-lg  w-80 flex justify-between items-center">
          <div>
            <p className="font-bold">{r.profiles.fullname}</p>
            <p className="text-sm text-gray-500">@{r.profiles.username}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => respond(r.id, true)} className="border-2 border-black rounded px-3 py-1 font-bold bg-green-200">Accept</button>
            <button onClick={() => respond(r.id, false)} className="border-2 border-black rounded px-3 py-1 font-bold bg-red-200">Decline</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Notification
