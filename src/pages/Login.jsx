import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      setEmail('')
      setPassword('')
      navigate('/')
    }
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
    <div className="min-h-screen flex items-center justify-center div-theme overflow-y-auto py-8">
      <div className="card-theme p-8 rounded-xl shadow-md w-full max-w-md">

        <div className="flex flex-col items-center gap-2 mb-10">
          
          <p className="font-bold flex flex-row items-center text-2xl">Welcome to 
             L <img src="/mortarboard.png" alt="Laze logo" className="w-8 h-8" />zeu</p>
        </div>
        
         <h1 className="text-md font-bold mb-6 text-center">Login now</h1>

       

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded-lg px-4 py-2 div-theme focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded-lg px-4 py-2 div-theme focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          <span className="mx-3 text-black-400 text-sm">or</span>
          <hr className="flex-1" />
        </div>

        <button
          onClick={handleGoogle}
          className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 card-hover-theme  card-theme"
        >
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5 " />
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