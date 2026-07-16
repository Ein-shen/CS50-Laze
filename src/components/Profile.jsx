import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import ProfileCard from '../components/ProfileCard'
import Popup from '../components/Popup'

const Profile = ({ user }) => {
    const [profile, setProfile] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        if (!user) return

        const fetchProfile = async () => {
            const cached = localStorage.getItem(`profile_${user.id}`)
            if (cached) setProfile(JSON.parse(cached))

            const { data, error } = await supabase
                .from('profiles')
                .select('id, fullname, username, profiles_image')
                .eq('id', user.id)
                .single()

            if (!error && data) {
                setProfile(data)
                localStorage.setItem(`profile_${user.id}`, JSON.stringify(data))
            }
        }

        fetchProfile()
    }, [user])

    const handleEditComplete = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('id, fullname, username, profiles_image')
            .eq('id', user.id)
            .single()

        if (!error && data) {
            setProfile(data)
            localStorage.setItem(`profile_${user.id}`, JSON.stringify(data))
        }
        setIsEditing(false)
    }

    const handleImageUpdate = (newImageUrl) => {
        const updated = { ...profile, profiles_image: newImageUrl }
        setProfile(updated)
        localStorage.setItem(`profile_${user.id}`, JSON.stringify(updated))
    }

    if (!user || !profile) return null

    return (
        <div className="bg-gray-300 w-full h-[40%] box-border flex flex-col items-center justify-start">
            <ProfileCard
                user={user}
                profile={profile}
                onEditClick={() => setIsEditing(true)}
                isOwnProfile={true}
                onImageUpdate={handleImageUpdate}
            />
            {isEditing && (
                <Popup
                    user={user}
                    profile={profile}
                    onComplete={handleEditComplete}
                    onCancel={() => setIsEditing(false)}
                />
            )}
        </div>
    )
}

export default Profile
