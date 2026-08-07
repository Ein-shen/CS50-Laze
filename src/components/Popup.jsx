import { useState } from 'react'
import { supabase } from '../supabaseClient'

const Popup = ({ user, profile, onComplete, onCancel }) => {
    const [form, setForm] = useState({
      fullname: profile?.fullname ?? '',
      username: profile?.username ?? ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      setError('')

      const { error } = await supabase
        .from('profiles')
        .upsert([{ id: user.id, ...form }], { onConflict: 'id' })

      if (error) {
        setError(error.message)
      } else {
        onComplete()
      }

      setLoading(false)
    }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 className='font-bold'>Edit Profile</h2>
        <p className='font-bold'>Update your details below.</p>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            name="fullname"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          {error && <p style={{ color: 'red' }}>{error}</p>}

         <button
              type="submit"
              disabled={loading}
              className='border-2 border-black bg-gray-400 rounded-md px-4 py-2 font-semibold w-full'
          >
              {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
              type="button"
              onClick={onCancel}
              className='border-2 border-black bg-gray-200 rounded-md px-4 py-2 font-semibold w-full mt-2'
          >
              Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  cancelButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: 'transparent',
    color: '#4f46e5',
    border: '1px solid #4f46e5',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
  }
}

export default Popup
