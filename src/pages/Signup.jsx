import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate, Link } from 'react-router-dom'

// Form only (no page layout). Used by the Signup page below
// and by the hero on the Landing page.
export function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match!')
      return
    }
    setLoading(true)
    setError(null)
    setMessage(null)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    })
    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setEmail('')
    setPassword('')
    setConfirmPassword('')

    if (data.session) {
      navigate('/') // same as your original redirect
    } else {
      // Email confirmation is on, so there is no session yet.
      setMessage('Check your email to confirm your account.')
    }
  }

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: { prompt: 'select_account' },
      },
    })
    if (error) setError(error.message)
  }

  const inputClass =
    'border rounded-lg px-4 py-2 div-theme focus:outline-none focus:ring-2 focus:ring-blue-400'

  return (
    <div>
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm" role="alert">
          ❌ {error}
        </div>
      )}
      {message && (
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg mb-4 text-sm" role="status">
          ✉️ {message}
        </div>
      )}

      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClass}
        />
        <input
          type="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="new-password"
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={inputClass}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          aria-label="Confirm password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={inputClass}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-60"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      <div className="flex items-center my-4">
        <hr className="flex-1" />
        <span className="mx-3 text-sm">or</span>
        <hr className="flex-1" />
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        className="w-full border py-2 rounded-lg card-theme card-hover-theme flex items-center justify-center gap-2"
      >
        <img src="https://www.google.com/favicon.ico" alt="" className="w-5 h-5" />
        Continue with Google
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}

const Signup = () => (
  <div className="min-h-screen flex items-center justify-center div-theme overflow-y-auto py-8">
    <div className="card-theme p-8 rounded-xl shadow-md w-full max-w-md">
      <div className="flex justify-center mb-8">
        <p className="font-bold flex items-center text-2xl">
          Welcome to&nbsp;L
          <img src="/mortarboard.png" alt="" className="w-8 h-8" />
          ze
        </p>
      </div>

      <h1 className="text-md font-bold mb-6 text-center">Create Account</h1>

      <SignupForm />
    </div>
  </div>
)

export default Signup