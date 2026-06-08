
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const AddFriendButton = ({ targetUserId }) => {
  const [status, setStatus] = useState('loading')
  const [requestId, setRequestId] = useState(null)
  const [currentUserId, setCurrentUserId] = useState(null)

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user || !targetUserId) return

      setCurrentUserId(user.id)

      const { data, error } = await supabase
        .from('friends')
        .select('*')
        .or(
          `and(requester_id.eq.${user.id},receiver_id.eq.${targetUserId}),and(requester_id.eq.${targetUserId},receiver_id.eq.${user.id})`
        )
        .maybeSingle()

      if (error) {
        console.error('Error fetching friend request:', error.message)
        setStatus('none')
        return
      }

      if (!data) {
        setStatus('none')
      } else if (data.status === 'accepted') {
        setStatus('friends')
        setRequestId(data.id)
      } else if (
        data.status === 'pending' &&
        data.requester_id === user.id
      ) {
        setStatus('pending_sent')
        setRequestId(data.id)
      } else if (
        data.status === 'pending' &&
        data.receiver_id === user.id
      ) {
        setStatus('pending_received')
        setRequestId(data.id)
      }
    }

    init()
  }, [targetUserId])

  const sendRequest = async () => {
    if (!currentUserId) return

    const { data, error } = await supabase
      .from('friends')
      .insert({
        requester_id: currentUserId,
        receiver_id: targetUserId,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('Error sending friend request:', error.message)
      return
    }

    if (data) {
      setStatus('pending_sent')
      setRequestId(data.id)
    }
  }

  const cancelRequest = async () => {
    if (!requestId) return

    const { error } = await supabase
      .from('friends')
      .delete()
      .eq('id', requestId)

    if (error) {
      console.error('Error cancelling friend request:', error.message)
      return
    }

    setStatus('none')
    setRequestId(null)
  }

  const acceptRequest = async () => {
    if (!requestId) return

    const { error } = await supabase
      .from('friends')
      .update({ status: 'accepted' })
      .eq('id', requestId)

    if (error) {
      console.error('Error accepting friend request:', error.message)
      return
    }

    setStatus('friends')
  }

  const buttonClass =
    'w-full min-h-10 px-3 py-2 border-2 border-black rounded-lg font-bold text-center leading-tight transition-colors'

  if (
    status === 'loading' ||
    !targetUserId ||
    targetUserId === currentUserId
  ) {
    return null
  }

  if (status === 'none') {
    return (
      <button
        onClick={sendRequest}
        className={`${buttonClass} bg-[#B8F5CE] hover:bg-[#9BE9B8] text-white`}
      >
        Add Friend
      </button>
    )
  }

  if (status === 'pending_sent') {
    return (
      <button
        onClick={cancelRequest}
        className={`${buttonClass} bg-gray-100 hover:bg-gray-200 text-black`}
      >
        Requested
      </button>
    )
  }

  if (status === 'pending_received') {
    return (
      <button
        onClick={acceptRequest}
        className={`${buttonClass} bg-[#B8F5CE] hover:bg-[#9BE9B8] text-white`}
      >
        Accept Request
      </button>
    )
  }

  if (status === 'friends') {
    return (
      <span
        className={`${buttonClass} flex items-center justify-center bg-transparent text-black`}
      >
        Friends
      </span>
    )
  }

  return null
}

export default AddFriendButton
