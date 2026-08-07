import React from 'react'
import Return from "../components/Return"
import { useParams, useNavigate, useLocation,  } from 'react-router-dom'
import  { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'

const Chat = () => {


  const  { deckId } = useParams()
  const location = useLocation()
  const name = location.state?.name ?? 'Unknown' // this is the one who use to connect the passed name in the chat to continue


  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [user, setUser] = useState(null)


  const isFirstLoad = useRef(true)
  const bottomRef = useRef(null) // reloads the latest chat by using useRef patnered by useeffect under
  const imageUrl = location.state?.imageUrl ?? null



  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: isFirstLoad.current ? 'auto' : 'smooth' //this relaod the latest chat
    })
    isFirstLoad.current = false
  }, [messages])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  useEffect(() => {
    let isSubscribed = false

    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('room_id', deckId)
        .order('created_at', { ascending: true })
      setMessages(data || [])
    }
    fetchMessages()


   const channel = supabase
    .channel(`room:${deckId}`)          // creates/joins a unique channel for this specific chat room
    .on(
      'postgres_changes',                // listens for database changes
      { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_id=eq.${deckId}` },
      // only fires for INSERTs on the `messages` table where room_id matches this chat
      (payload) => setMessages((prev) => [...prev, payload.new])
      // when a match happens, grab the new row and append it to your messages state
    )
    .subscribe()                         // actually starts listening



    return () => {
      supabase.removeChannel(channel)
    }
  }, [deckId])

    const sendMessage = async (e) => {
      e.preventDefault()
      if (!newMessage.trim()) return

      const { data: { user } } = await supabase.auth.getUser()
      console.log('my user id:', user?.id)
      console.log('room/friendship id (deckId):', deckId)

      const { error } = await supabase.from('messages').insert({
        room_id: deckId,
        sender_id: user.id,
        content: newMessage,
      })

      console.log('insert error:', error)

      setNewMessage('')
    }



  return (

          <div className="flex flex-col h-screen min-h-0 items-center pt-10 pb-10 pl-20 pr-20 gap-8">

          <div className="border-2 border-black rounded-md w-full flex-1 flex flex-col min-h-0">

            <div className="flex flex-row items-center gap-10 border-b-2 border-black py-5">
              <div>
                <Return to={`/message/${deckId}`} />
              </div>
              <div className='flex flex-row items-center gap-2'>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                )}
                <h1 className="font-bold text-lg">{name}</h1>
              </div>
              
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 px-5 py-3 flex flex-col gap-4">
              {messages.map((message) => {
                const isMine = message.sender_id === user?.id
                return (
                  <div key={message.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div className="bg-gray-200 rounded-md px-3 py-2 w-fit">
                      <span className="font-bold">
                        {isMine ? 'You' : name}
                      </span>
                      :  {message.content}
                    </div>
                  </div>
                )
              })}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={sendMessage} className="items-center gap-2 flex flex-row mt-auto py-5 px-5">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="border-2 border-black flex-1 h-12 px-2 rounded-md bg-gray-300"
                placeholder="Type a message"
              />
              <button type="submit" className="border-2 border-black w-20 h-12 rounded-md font-bold">
                Send
              </button>
            </form>

          </div>
        </div>


  )
}

export default Chat
