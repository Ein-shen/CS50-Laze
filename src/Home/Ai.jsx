import Greetings from "../components/Greetings"
import { useNavigate, useOutletContext } from "react-router-dom"

const Ai = () => {
  // data comes from Dashboard's <Outlet context={{ recentAttempts }} />
  const { recentAttempts } = useOutletContext()
  const navigate = useNavigate()

  return (
    <div className="w-[80%] h-[36rem] card-theme rounded-md flex flex-col px-10">

      <h1 className="font-bold text-2xl text-center pb-10 py-10">
        <Greetings /> Let's go study?
      </h1>

      <h1 className="font-bold text-2xl text-center pb-10">
        <img src="/mortarboard.png" alt="mortarboard" className="inline-block w-40 h-40" />
      </h1>

      <div className="flex justify-center">
        <div className="relative w-[80%]">
          <h1 className="font-bold text-lg">Recent:</h1>

          <div className="mt-2 flex flex-col gap-2">
            {recentAttempts.length === 0 && (
              <p className="text-gray-500">No quiz attempts yet.</p>
            )}

            {recentAttempts.map((attempt) => (
              <div
                key={attempt.id}
                onClick={() => navigate(`/cards/${attempt.deck_id}`)}
                className="flex justify-between card-hover-theme div-theme rounded-md px-4 py-2 shadow-sm hover:shadow-md transition cursor-pointer"
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