import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../supabaseClient'
import { Search, ShieldCheck, ShieldOff, Ban, CheckCircle2 } from 'lucide-react'

const AdminDashboard = () => {
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')
    const [busyId, setBusyId] = useState(null) // which row is mid-click, so we can disable its buttons

    useEffect(() => {
        fetchActivity()
    }, [])

    const fetchActivity = async () => {
        setLoading(true)

        // 1. Everyone's name tag (now includes status too)
        const { data: profiles } = await supabase
            .from('profiles')
            .select('id, fullname, username, role, status, profiles_image')

        // 2. Every deck anyone has made
        const { data: decks } = await supabase
            .from('decks')
            .select('id, user_id, created_at')

        // 3. Every quiz anyone has taken
        const { data: attempts } = await supabase
            .from('quiz_attempts')
            .select('user_id, score, total_questions, created_at')

        const combined = (profiles || []).map((p) => {
            const userDecks = (decks || []).filter((d) => d.user_id === p.id)
            const userAttempts = (attempts || []).filter((a) => a.user_id === p.id)

            const avgScore = userAttempts.length
                ? Math.round(
                    (userAttempts.reduce(
                        (sum, a) => sum + (a.score / (a.total_questions || 1)) * 100,
                        0
                    ) / userAttempts.length)
                )
                : null

            const lastDates = [
                ...userDecks.map((d) => d.created_at),
                ...userAttempts.map((a) => a.created_at),
            ].filter(Boolean)

            const lastActive = lastDates.length
                ? new Date(Math.max(...lastDates.map((d) => new Date(d)))).toLocaleString()
                : 'No activity yet'

            return {
                ...p,
                status: p.status || 'active',
                deckCount: userDecks.length,
                quizCount: userAttempts.length,
                avgScore,
                lastActive,
            }
        })

        setRows(combined)
        setLoading(false)
    }

    // Flip a user's role between 'user' and 'admin'
    const handleTogglePromote = async (row) => {
        setBusyId(row.id)
        const newRole = row.role === 'admin' ? 'user' : 'admin'

        const { error } = await supabase
            .from('profiles')
            .update({ role: newRole })
            .eq('id', row.id)

        if (!error) {
            setRows((prev) =>
                prev.map((r) => (r.id === row.id ? { ...r, role: newRole } : r))
            )
        } else {
            alert('Could not update role: ' + error.message)
        }
        setBusyId(null)
    }

    // Flip a user's status between 'active' and 'banned'
    const handleToggleBan = async (row) => {
        setBusyId(row.id)
        const newStatus = row.status === 'banned' ? 'active' : 'banned'

        const { error } = await supabase
            .from('profiles')
            .update({ status: newStatus })
            .eq('id', row.id)

        if (!error) {
            setRows((prev) =>
                prev.map((r) => (r.id === row.id ? { ...r, status: newStatus } : r))
            )
        } else {
            alert('Could not update status: ' + error.message)
        }
        setBusyId(null)
    }

    const filtered = useMemo(() => {
        if (!query.trim()) return rows
        const q = query.toLowerCase()
        return rows.filter(
            (r) =>
                r.username?.toLowerCase().includes(q) ||
                r.fullname?.toLowerCase().includes(q)
        )
    }, [rows, query])

    return (
        <div className="flex flex-col h-screen px-10 pt-24 pl-10">
            <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={28} />
                <h1 className="text-2xl font-bold">Manage Users</h1>
            </div>
            <p className="text-gray-600 mb-6">See activity, promote admins, or ban users.</p>

            <div className="flex items-center gap-2 border-2 border-black rounded-md px-3 py-2 w-fit mb-6 bg-gray-200">
                <Search size={18} />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name or username..."
                    className="bg-transparent outline-none"
                />
            </div>

            {loading ? (
                <p className="text-gray-500">Loading activity...</p>
            ) : (
                <div className="overflow-y-auto pb-10">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left border-b-2 border-black">
                                <th className="py-2 pr-4">User</th>
                                <th className="py-2 pr-4">Role</th>
                                <th className="py-2 pr-4">Status</th>
                                <th className="py-2 pr-4">Decks</th>
                                <th className="py-2 pr-4">Quizzes</th>
                                <th className="py-2 pr-4">Avg score</th>
                                <th className="py-2 pr-4">Last active</th>
                                <th className="py-2 pr-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((r) => (
                                <tr key={r.id} className="border-b border-gray-400">
                                    <td className="py-3 pr-4 flex items-center gap-2">
                                        <img
                                            src={r.profiles_image || '/mortarboard.png'}
                                            alt=""
                                            className="w-8 h-8 rounded-full object-cover border border-black"
                                        />
                                        <div>
                                            <p className="font-bold leading-tight">{r.fullname || 'Unnamed'}</p>
                                            <p className="text-xs text-gray-600">@{r.username || 'no-username'}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 pr-4">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-bold ${
                                                r.role === 'admin'
                                                    ? 'bg-black text-white'
                                                    : 'bg-gray-300 border border-black'
                                            }`}
                                        >
                                            {r.role || 'user'}
                                        </span>
                                    </td>
                                    <td className="py-3 pr-4">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-bold ${
                                                r.status === 'banned'
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-green-200 border border-black'
                                            }`}
                                        >
                                            {r.status}
                                        </span>
                                    </td>
                                    <td className="py-3 pr-4">{r.deckCount}</td>
                                    <td className="py-3 pr-4">{r.quizCount}</td>
                                    <td className="py-3 pr-4">{r.avgScore !== null ? `${r.avgScore}%` : '—'}</td>
                                    <td className="py-3 pr-4 text-sm text-gray-600">{r.lastActive}</td>
                                    <td className="py-3 pr-4">
                                        <div className="flex gap-2">
                                            <button
                                                disabled={busyId === r.id}
                                                onClick={() => handleTogglePromote(r)}
                                                title={r.role === 'admin' ? 'Remove admin' : 'Make admin'}
                                                className="p-2 border-2 border-black rounded-md disabled:opacity-40"
                                            >
                                                {r.role === 'admin' ? <ShieldOff size={16} /> : <ShieldCheck size={16} />}
                                            </button>
                                            <button
                                                disabled={busyId === r.id}
                                                onClick={() => handleToggleBan(r)}
                                                title={r.status === 'banned' ? 'Unban' : 'Ban'}
                                                className="p-2 border-2 border-black rounded-md disabled:opacity-40"
                                            >
                                                {r.status === 'banned' ? <CheckCircle2 size={16} /> : <Ban size={16} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <p className="text-gray-500 mt-4">No users match that search.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default AdminDashboard