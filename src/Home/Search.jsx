import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { Search as SearchIcon } from 'lucide-react'

const Search = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  const [currentUserId, setCurrentUserId] = useState(null)
  const navigate = useNavigate()
  const debounceRef = useRef(null)
  const latestQueryRef = useRef("")
  const wrapperRef = useRef(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUserId(user?.id ?? null)
    })
  }, [])

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  useEffect(() => {
    return () => clearTimeout(debounceRef.current)
  }, [])

  const runSearch = async (value) => {
    latestQueryRef.current = value
    setLoading(true)
    setError(null)

    const safe = value.replace(/[,()%*\\]/g, " ").trim()
    if (!safe) {
      setResults([])
      setLoading(false)
      return
    }

    let qb = supabase
      .from('profiles')
      .select('id, fullname, username, profiles_image')
      .or(`fullname.ilike.%${safe}%,username.ilike.%${safe}%`)
      .limit(10)

    if (currentUserId) qb = qb.neq('id', currentUserId)

    const { data, error } = await qb

    // ignore stale responses
    if (latestQueryRef.current !== value) return

    if (error) {
      setError(error.message)
      setResults([])
    } else {
      setResults(data ?? [])
    }
    setLoading(false)
  }

  const handleSearch = (value) => {
    setQuery(value)
    setOpen(true)
    clearTimeout(debounceRef.current)

    const trimmed = value.trim()
    if (!trimmed) {
      latestQueryRef.current = ""
      setResults([])
      setError(null)
      setLoading(false)
      return
    }

    debounceRef.current = setTimeout(() => runSearch(trimmed), 300)
  }

  const goToUser = (username) => {
    setOpen(false)
    setQuery("")
    setResults([])
    navigate(`/stalk/${username}`)
  }

  return (
    <div ref={wrapperRef} className="relative w-40 sm:w-64">
      {/* Search input (original styling) */}
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={e => handleSearch(e.target.value)}
        onFocus={() => query && setOpen(true)}
        placeholder="Look for friends"
        className="h-9 w-full bg-transparent div-theme border border-black/80 rounded-lg pl-10 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Results dropdown (original card styling) */}
      {open && query.trim() && (
        <ul className="absolute left-0 top-full mt-2 w-72 max-h-80 overflow-y-auto z-50 space-y-2">
          {loading && <li className="rounded-md px-4 py-2 card-theme text-gray-500 text-sm"> ...</li>}
          {error && <li className="rounded-md px-4 py-2 card-theme text-red-400 text-sm">{error}</li>}
          {!loading && !error && results.length === 0 && (
            <li className="rounded-md px-4 py-2 card-theme text-gray-400 text-sm text-center">No users found.</li>
          )}

          {results.map(user => (
            <li
              key={user.id}
              onClick={() => goToUser(user.username)}
              className="flex items-center gap-3 rounded-md px-4 py-2 card-theme card-hover-theme shadow-sm hover:shadow-md transition cursor-pointer"
            >
              {user.profiles_image && (
                <img
                  src={user.profiles_image}
                  alt={user.fullname}
                  className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                />
              )}
              <div className="flex flex-col min-w-0">
                <span className="font-semibold truncate">{user.fullname}</span>
                <span className="text-sm text-gray-500 truncate">@{user.username}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Search