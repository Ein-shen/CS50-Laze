import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const AddFriendButton = ({ targetUserId }) => {
  const [status, setStatus] = useState('loading') // loading | none | pending_sent | pending_received | friends
  const [requestId, setRequestId] = useState(null)
  const [currentUserId, setCurrentUserId] = useState(null)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || !targetUserId) return
      setCurrentUserId(user.id)

      const { data } = await supabase
        .from('friends')
        .select('*')
        .or(`and(requester_id.eq.${user.id},receiver_id.eq.${targetUserId}),and(requester_id.eq.${targetUserId},receiver_id.eq.${user.id})`)
        .maybeSingle()

      if (!data) {
        setStatus('none')
      } else if (data.status === 'accepted') {
        setStatus('friends')
        setRequestId(data.id)
      } else if (data.status === 'pending' && data.requester_id === user.id) {
        setStatus('pending_sent')
        setRequestId(data.id)
      } else if (data.status === 'pending' && data.receiver_id === user.id) {
        setStatus('pending_received')
        setRequestId(data.id)
      }
    }
    init()
  }, [targetUserId])

  const sendRequest = async () => {
    const { data, error } = await supabase
      .from('friends')
      .insert({ requester_id: currentUserId, receiver_id: targetUserId, status: 'pending' })
      .select()
      .single()

    if (!error && data) {
      setStatus('pending_sent')
      setRequestId(data.id)
    }
  }

  const cancelRequest = async () => {
    if (!requestId) return
    await supabase.from('friends').delete().eq('id', requestId)
    setStatus('none')
    setRequestId(null)
  }

  const acceptRequest = async () => {
    if (!requestId) return
    const { error } = await supabase
      .from('friends')
      .update({ status: 'accepted' })
      .eq('id', requestId)

    if (!error) setStatus('friends')
  }

  if (status === 'loading' || !targetUserId || targetUserId === currentUserId) return null

  if (status === 'none') {
    return (
      <button
        onClick={sendRequest}
        className="border-2 border-black rounded-lg px-4 py-1 font-bold hover:bg-gray-100 transition"
      >
        Add Friend
      </button>
    )
  }

  if (status === 'pending_sent') {
    return (
      <button
        onClick={cancelRequest}
        className="border-2 border-black rounded-lg px-4 py-1 font-bold hover:bg-gray-300 transition"
      >
        Requested
      </button>
    )
  }

  if (status === 'pending_received') {
    return (
      <button
        onClick={acceptRequest}
        className="border-2 border-black rounded-lg px-4 py-1 font-bold bg-green-200 hover:bg-green-300 transition"
      >
        Accept Request
      </button>
    )
  }

  if (status === 'friends') {
    return (
      <span className="border-2 border-black rounded-lg px-4 py-1 font-bold ">
        Friends
      </span>
    )
  }

  return null
}

export default AddFriendButton
