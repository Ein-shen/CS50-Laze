// src/pages/Stalk.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import ProfileCard from '../profile/ProfileCard'

const Stalk = () => {
    const { username } = useParams()
    const [profile, setProfile] = useState(null)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('id, fullname, username, profiles_image')
                .eq('username', username)
                .single()

            if (error || !data) {
                setNotFound(true)
            } else {
                setProfile(data)
            }
        }

        fetchProfile()
    }, [username])

    if (notFound) return <p className="text-center mt-10">User not found.</p>
    if (!profile) return null

    return (
        <div className="bg-gray-300 w-full h-[40%] box-border flex flex-col items-center justify-start">
            <ProfileCard user={profile} profile={profile} />
        </div>
    )
}

export default Stalk
