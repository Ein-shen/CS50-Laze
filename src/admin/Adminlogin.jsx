import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true) // checking an existing/incoming session on load
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Runs once when the page loads, AND again right after a Google redirect comes back.
  // This is where we check "ok, they're logged in now — but are they actually an admin?"
  useEffect(() => {
    const checkSession = async (session) => {
      if (!session?.user) {
        setChecking(false)
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (profile?.role === 'admin') {
        navigate('/admin')
      } else {
        // Signed in, but not an admin — kick them back out
        await supabase.auth.signOut()
        setError('This account is not authorized as an admin.')
        setChecking(false)
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => checkSession(session))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      checkSession(session)
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setEmail('')
    setPassword('')
    // no need to navigate here — the onAuthStateChange listener above
    // will fire, check the role, and redirect if they're an admin
    setLoading(false)
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/admin-login`,
        queryParams: {
          prompt: 'select_account'
        }
      }
    })
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-400">
        <p className="text-gray-600 text-lg">Checking session...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400 overflow-y-auto py-8">
      <div className="bg-gray-200 p-8 rounded-xl shadow-md w-full max-w-md">

        <div className="flex flex-col items-center gap-2 mb-6">
          <img src="/mortarboard.png" alt="Laze logo" className="w-16 h-16" />
          <p className="font-bold">Laze Admin</p>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">Admin Sign In</h1>

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
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

       
        
      </div>
    </div>
  )
}

export default AdminLogin