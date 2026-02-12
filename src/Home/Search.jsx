import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import Return from "../components/Return"
import { Search as SearchIcon } from 'lucide-react'

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
      .or(`fullname.ilike.%${value}%,username.ilike.%${value}%`)
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
      {/* Header */}
      <div className="flex items-center py-6 sm:py-10 px-4">
        <Return to="/" className="top-0" />
        <h1 className="text-base sm:text-lg font-bold flex flex-row justify-center gap-2 flex-1 text-center pr-10 sm:pr-16">
          <img
            src="https://img.icons8.com/?size=100&id=p3miLroKw4iR&format=png&color=000000"
            alt="Search"
            width={24}
            height={20}
          />
          Search
        </h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center pt-10 sm:pt-20 px-4">
        {/* Search card */}
        <div className="card-theme w-full max-w-md rounded-lg py-12 px-6">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={e => handleSearch(e.target.value)}
              placeholder="Look for friends"
              className="h-14 sm:h-16 w-full bg-transparent div-theme border border-black/80 rounded-lg pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {loading && <p className="mt-4 text-gray-500">Searching...</p>}
        {error && <p className="mt-4 text-red-400 text-center">{error}</p>}

        {/* Results */}
        <ul className="mt-8 w-full max-w-sm space-y-2">
          {results.length === 0 && query && !loading && !error && (
            <p className="text-gray-400 text-center">No users found.</p>
          )}

          {results.map(user => (
            <li
              key={user.id}
              onClick={() => navigate(`/stalk/${user.username}`)}
              className="flex items-center gap-3 rounded-md px-4 py-2 card-theme card-hover-theme shadow-sm hover:shadow-md transition cursor-pointer"
            >
              {user.profiles_image && (
                <img
                  src={user.profiles_image}
                  alt={user.fullname}
                  className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                />
              )}
              <div className="flex flex-col">
                <span className="font-semibold">{user.fullname}</span>
                <span className="text-sm text-gray-500">@{user.username}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Search