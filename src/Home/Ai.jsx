import React, { useState, useEffect } from 'react'
import { Upload } from "lucide-react"
import Greetings from "../components/Greetings"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"

const Ai = () => {
  const [recentAttempts, setRecentAttempts] = useState([])
  const navigate = useNavigate()

  const fetchRecentAttempts = async () => {
    const cached = localStorage.getItem('recent_attempts')
    if (cached && cached !== 'undefined') {
      try {
        setRecentAttempts(JSON.parse(cached))
      } catch {
        localStorage.removeItem('recent_attempts')
      }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('id, deck_id, score, total_questions, created_at, decks(deckname)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) {
      console.error('Error fetching recent attempts:', error)
      return
    }

    if (data) {
      setRecentAttempts(data)
      localStorage.setItem('recent_attempts', JSON.stringify(data))
    }
  }

  useEffect(() => {
    fetchRecentAttempts()
  }, [])

  return (
    <div className="w-[80%] h-[36rem] border-black border-2 rounded-md flex flex-col px-10">

      <h1 className="font-bold text-2xl text-center pb-10 py-10">
        <Greetings /> Let's go study?
      </h1>

      <h1 className="font-bold text-2xl text-center pb-10">
        <img src="/mortarboard.png" alt="mortarboard" className="inline-block w-40 h-40" />
      </h1>

      <div className="flex justify-center">
        <div className="relative w-[80%]">
          <h1 className='font-bold text-lg'>
            Recent:
          </h1>

          <div className="mt-2   flex flex-col gap-2">
            {recentAttempts.length === 0 && (
              <p className="text-gray-500">No quiz attempts yet.</p>
            )}

            {recentAttempts.map((attempt) => (
              <div
                key={attempt.id}
                onClick={() => navigate(`/cards/${attempt.deck_id}`)}
                className="flex justify-between border-2 border-black rounded-md px-4 py-2 bg-gray-300 shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <span className="font-semibold">{attempt.decks?.deckname ?? 'Unknown deck'}</span>
                <span>{attempt.score} / {attempt.total_questions}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  )
}

export default Ai