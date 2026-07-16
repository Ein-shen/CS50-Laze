import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import Return from "./Return"

const Search = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentUserId, setCurrentUserId] = useState(null)
  const navigate = useNavigate()
  const debounceRef = useRef(null)
  const latestQueryRef = useRef("")

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUserId(user?.id ?? null)
    }
    getUser()
  }, [])

  const runSearch = async (value) => {
    latestQueryRef.current = value
    setLoading(true)
    setError(null)

    let queryBuilder = supabase
      .from('profiles')
      .select('id, fullname, username, profiles_image')
      .limit(10)

    if (currentUserId) {
      queryBuilder = queryBuilder.neq('id', currentUserId)
    }

    const { data, error } = await queryBuilder

    // ignore stale responses from an earlier keystroke
    if (latestQueryRef.current !== value) return

    if (error) {
      setError(error.message)
    } else {
      setResults(data)
    }
    setLoading(false)
  }

  const handleSearch = (value) => {
    setQuery(value)

    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!value.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    debounceRef.current = setTimeout(() => runSearch(value.trim()), 300)
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <div>
      <div className="flex items-center py-10 ">
        <Return to="/" className="top-0" />
        <h1 className=" text-lg font-bold flex-1 text-center pr-16">Search</h1>
      </div>

      <div className="flex flex-col items-center pt-20 ">
        <input
          type="text"
          value={query}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Look for friends"
          className=" bg-gray-300 h-16 w-[40%] border-2 border-black rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {loading && <p className="mt-4 text-gray-500">Searching...</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}

        <ul className="mt-8 w-80 space-y-2">
          {results.length === 0 && query && !loading && !error && (
            <p className="text-gray-400 text-center">No users found.</p>
          )}

          {results.map(user => (
            <li
              key={user.id}
              onClick={() => navigate(`/stalk/${user.username}`)}
              className="  border-2 border-black rounded-lg p-3 flex flex-col cursor-pointer hover:bg-gray-50 transition"
            >
              <span className="font-semibold">{user.fullname}</span>
              <span className="text-sm text-gray-500">@{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Search
