import { Link } from 'react-router-dom'
import Footer from "../components/Footer"
// =====================================================
// Flip card used in the hero — literally demonstrates
// the core deck/quiz mechanic instead of a screenshot.
// =====================================================
function FlipCard({ rotate, front, back }) {
  return (
    <div
      className="group [perspective:1000px] w-36 h-48 sm:w-40 sm:h-52 shrink-0"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-lg bg-gray-200 border-2 border-black p-4 flex flex-col">
          <span className="text-[10px] tracking-wide uppercase text-gray-500 font-bold mb-2">Q</span>
          <p className="text-black text-sm font-bold leading-snug">
            {front}
          </p>
          <span className="mt-auto text-[11px] text-gray-500 font-semibold">flip me →</span>
        </div>
        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-lg bg-[#2C4A5E] border-2 border-black p-4 flex flex-col">
          <span className="text-[10px] tracking-wide uppercase text-yellow-300 font-bold mb-2">Answer</span>
          <p className="text-white text-sm font-bold leading-snug">
            {back}
          </p>
        </div>
      </div>
    </div>
  )
}

// =====================================================
// Simple bordered card, matching the dashboard's look
// =====================================================
function InfoCard({ title, body }) {
  return (
    <div className="bg-gray-200 border-2 border-black rounded-lg p-6">
      <h3 className="text-lg font-bold text-black mb-2">{title}</h3>
      <p className="text-sm text-gray-700 leading-relaxed">{body}</p>
    </div>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-300 font-sans">

      {/* =====================================================
          NAV
      ===================================================== */}
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <img src="/mortarboard.png" alt="" className="w-8 h-8" />
          <span className="font-bold text-xl text-black">Laze</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-bold text-black px-4 py-2 rounded-lg border-2 border-transparent hover:border-black transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="text-sm font-bold bg-[#2C4A5E] text-white px-4 py-2 rounded-lg border-2 border-black hover:bg-[#233a4a] transition-colors"
          >
            Sign up free
          </Link>
        </div>
      </nav>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-black leading-tight mb-4">
            Turn your notes into decks.<br />Turn decks into study nights.
          </h1>
          <p className="text-gray-700 text-base leading-relaxed mb-6 max-w-md">
            Build multiple-choice decks in minutes, quiz yourself solo, or invite friends
            to chat and study side by side. One place for the whole habit.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/signup"
              className="bg-gray-400 text-black font-bold text-sm px-6 py-3 rounded-lg border-2 border-black hover:bg-gray-300 transition-colors"
            >
              Create your first deck
            </Link>
            <Link
              to="/login"
              className="bg-gray-200 text-black font-bold text-sm px-6 py-3 rounded-lg border-2 border-black hover:bg-gray-100 transition-colors"
            >
              I have an account
            </Link>
          </div>
        </div>

        <div className="flex justify-center gap-3 md:gap-4">
          <FlipCard rotate={-6} front="What's the powerhouse of the cell?" back="Mitochondria" />
          <FlipCard rotate={4} front="Capital of France?" back="Paris" />
          <FlipCard rotate={-2} front="H2O is also known as..." back="Water" />
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-black mb-8">
          Everything you need to make studying stick.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <InfoCard
            title="Create a deck"
            body="Write multiple-choice questions, add four options, mark the answer. As simple as it should be."
          />
          <InfoCard
            title="Study solo"
            body="Work through your deck one question at a time and watch your score add up as you go."
          />
          <InfoCard
            title="Add friends"
            body="Send a request, get accepted, and you've got a study partner ready to chat in real time."
          />
          <InfoCard
            title="Go public"
            body="Publish a deck so anyone can practice from it, and see how others are doing too."
          />
        </div>
      </section>

      {/* =====================================================
          FEATURE SPOTLIGHT — chat mockup
      ===================================================== */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h2 className="text-2xl font-bold text-black mb-4">
            Studying is easier with someone next to you.
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6 max-w-md">
            Laze pairs every friendship with real-time chat, so quizzing a friend
            on their deck — or just complaining about finals together — happens
            without leaving the app.
          </p>
         
        </div>

        <div className="bg-gray-200 border-2 border-black rounded-lg p-5 max-w-sm mx-auto w-full">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b-2 border-black">
            <div className="w-8 h-8 rounded-full bg-[#2C4A5E] border-2 border-black" />
            <div>
              <p className="text-sm font-bold text-black">Maya</p>
              <p className="text-[11px] text-gray-600">studying Bio 101</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="bg-gray-100 text-black text-sm rounded-lg px-3 py-2 max-w-[80%] border border-black">
              quiz me on chapter 4?
            </div>
            <div className="bg-[#2C4A5E] text-white text-sm rounded-lg px-3 py-2 max-w-[80%] ml-auto border border-black">
              sent you my deck, go
            </div>
            <div className="bg-gray-100 text-black text-sm rounded-lg px-3 py-2 max-w-[80%] border border-black">
              got 8/10, not bad!
            </div>
          </div>
        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="max-w-4xl mx-auto px-6 py-12 md:py-16 text-center">
        <div className="bg-gray-200 border-2 border-black rounded-lg p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6">
            Ready to stop studying alone?
          </h2>
          <Link
            to="/signup"
            className="inline-block bg-gray-400 text-black font-bold text-sm px-8 py-3 rounded-lg border-2 border-black hover:bg-gray-300 transition-colors"
          >
            Create your account
          </Link>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/mortarboard.png" alt="" className="w-5 h-5" /><span className="font-bold text-sm text-black"><Footer /></span>
         
        </div>
        <p className="text-xs text-gray-600"></p>
      </footer>

    </div>
  )
}