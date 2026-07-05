import Footer from '../components/Footer'
import { SignupForm } from './Signup'

// Flip card used in the spotlight section — demonstrates the core
// deck/quiz mechanic instead of a screenshot.
function FlipCard({ rotate, front, back }) {
  return (
    <div
      className="group [perspective:1000px] w-28 h-40 sm:w-36 sm:h-48 md:w-40 md:h-52 shrink-0"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-lg inner-theme p-2.5 sm:p-4 flex flex-col justify-between">
          <div>
            <span className="text-[9px] sm:text-[10px] tracking-wide uppercase text-gray-500 font-bold block mb-1">Q</span>
            <p className="text-black text-xs sm:text-sm font-bold leading-tight sm:leading-snug">{front}</p>
          </div>
          <span className="text-[10px] sm:text-[11px] text-gray-500 font-semibold">flip me →</span>
        </div>
        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-lg card-theme p-2.5 sm:p-4 flex flex-col justify-between">
          <div>
            <span className="text-[9px] sm:text-[10px] tracking-wide uppercase text-yellow-300 font-bold block mb-1">Answer</span>
            <p className="text-white text-xs sm:text-sm font-bold leading-tight sm:leading-snug">{back}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const buttonClass =
  'card-theme card-hover-theme text-black font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-black/80 transition-colors text-center w-full sm:w-auto'

export default function Landing() {
  return (
    <div className="min-h-screen div-theme font-sans overflow-x-hidden">

      {/* NAV + HERO (shared background) */}
      <section className="relative">
        {/* background image that fades out at the bottom */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/bg.png')",
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          }}
        >
          {/* dark overlay, fades out together with the image */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative">
          {/* NAV */}
          <div className="bg-black/30 backdrop-blur-[2px]">
            <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3">
              <div className="flex items-center font-bold text-xl sm:text-2xl text-white">
                <span>L</span>
                <img src="/mortarboard.png" alt="Laze Logo" className="w-6 h-6 sm:w-8 sm:h-8" />
                <span>zeu</span>
              </div>

              <a
                href="/login"
                className="text-xs sm:text-sm font-bold card-theme card-hover-theme border border-black/80 text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors"
              >
                Login
              </a>
            </nav>
          </div>

          {/* HERO */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16 md:pb-28 grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            <div className="text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                Turn your notes into decks.<br className="hidden sm:inline" /> Turn decks into study sessions.
              </h1>
              <p className="text-gray-100 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                Build multiple-choice decks in minutes, quiz yourself solo, or invite friends
                to chat and study side by side. One place for the whole habit.
              </p>
              <div className="flex flex-row justify-center md:justify-start items-center gap-3 max-w-xs sm:max-w-none mx-auto md:mx-0">
                  <a href="/signup" className={buttonClass}>Sign up free</a>
                  <a href="#how-it-works" className={buttonClass}>Learn more</a>
              </div>
            </div>

            <div
              id="signup"
              className="card-theme rounded-xl p-5 sm:p-6 w-full max-w-md mx-auto scroll-mt-6 shadow-xl"
            >
              <h2 className="text-base sm:text-lg font-bold mb-4 text-center">Create your account</h2>
              <SignupForm />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16 scroll-mt-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-6 sm:mb-8 text-center md:text-left">
          Everything you need to make studying stick.
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <figure className="nav-theme border-2 border-black rounded-lg p-3 sm:p-4 flex flex-col gap-3">
            <img
              src="/quiz.png"
              alt="Deck page with cards, Start study and Add cards buttons"
              className="w-full aspect-[16/10] object-cover object-top rounded-md border border-black/80"
              loading="lazy"
            />
            <figcaption className="text-xs sm:text-sm font-bold text-black text-center">
              Build your decks
            </figcaption>
          </figure>

          <figure className="nav-theme border-2 border-black rounded-lg p-3 sm:p-4 flex flex-col gap-3">
            <img
              src="/qa.png"
              alt="Study screen with multiple-choice answers and score"
              className="w-full aspect-[16/10] object-cover object-top rounded-md border border-black/80"
              loading="lazy"
            />
            <figcaption className="text-xs sm:text-sm font-bold text-black text-center">
              Quiz yourself
            </figcaption>
          </figure>
        </div>
      </section>

      {/* FEATURE SPOTLIGHT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-6 sm:gap-8">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-3 sm:mb-4">
              Studying is easier with someone next to you.
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-md">
              Laze pairs every friendship with real-time chat, so quizzing a friend
              on their deck — or just complaining about finals together — happens
              without leaving the app.
            </p>
          </div>

          <div className="inner-theme border-2 border-black rounded-lg p-4 sm:p-5 max-w-sm w-full mx-auto md:mx-0">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b-2 border-black">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full div-theme border-2 border-black" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-black">Maya</p>
                <p className="text-[10px] sm:text-[11px] text-gray-600">studying</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="div-theme text-black text-xs sm:text-sm rounded-lg px-3 py-2 max-w-[85%] border border-black">
                quiz me on chapter 4?
              </div>
              <div className="nav-theme text-white text-xs sm:text-sm rounded-lg px-3 py-2 max-w-[85%] ml-auto border border-black">
                sent you my deck, go
              </div>
              <div className="div-theme text-black text-xs sm:text-sm rounded-lg px-3 py-2 max-w-[85%] border border-black">
                got 8/10, not bad!
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-4 pt-2">
          <FlipCard rotate={-6} front="What's the powerhouse of the cell?" back="Mitochondria" />
          <FlipCard rotate={4} front="Capital of France?" back="Paris" />
          <FlipCard rotate={-2} front="H2O is also known as..." back="Water" />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16 text-center">
        <div className="card-theme border-2 border-black rounded-lg p-6 sm:p-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">
            Ready to stop studying alone?
          </h2>
          <a
            href="#signup"
            className="inline-block div-theme card-hover-theme text-black font-bold text-xs sm:text-sm px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg border border-black/80 transition-colors w-full sm:w-auto"
          >
            Create your account
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex items-center justify-center gap-2 text-xs sm:text-sm">
        <img src="/mortarboard.png" alt="Laze logo" className="w-4 h-4 sm:w-5 sm:h-5" />
        <Footer />
      </div>
    </div>
  )
}