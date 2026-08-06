import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const normalizePhone = (raw) => {
    const digits = raw.replace(/\D/g, '')
    if (digits.startsWith('63')) return digits.slice(2)
    if (digits.startsWith('0')) return digits.slice(1)
    return digits
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const loginEmail = `${normalizePhone(phone)}@laze.app`

    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password })
    if (error) setError(error.message)
    else navigate('/')
    setLoading(false)
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          prompt: 'select_account'
        }
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400 overflow-y-auto py-8">
      <div className="bg-gray-200 p-8 rounded-xl shadow-md w-full max-w-md">

        <div className="flex flex-col items-center gap-2 mb-6">
          <img src="/mortarboard.png" alt="Laze logo" className="w-16 h-16" />
          <p className="font-bold">Welcome to Laze</p>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back!</h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="tel"
            placeholder="Phone Number (e.g. 09171234567)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-1" />
          <span className="mx-3 text-gray-400 text-sm">or</span>
          <hr className="flex-1" />
        </div>

        <button
          onClick={handleGoogle}
          className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login