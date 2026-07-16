import Edit from './Edit'
import { useRef, useState } from 'react'
import { supabase } from '../supabaseClient'
import Public from "./Public"
import Private from "./Private"
import Stats from "./Stats"
import AddFriendButton from "./AddFriendButton"
import { MessageCircle } from 'lucide-react'
import { Link } from "react-router-dom"

const compressImage = (file, maxSize = 512) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      let { width, height } = img

      if (width > height && width > maxSize) {
        height = (height * maxSize) / width
        width = maxSize
      } else if (height > maxSize) {
        width = (width * maxSize) / height
        height = maxSize
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => resolve(new File([blob], file.name, { type: 'image/jpeg' })),
        'image/jpeg',
        0.8
      )
      URL.revokeObjectURL(img.src)
    }
    img.src = URL.createObjectURL(file)
  })
}

const ProfileCard = ({ user, profile, onEditClick, isOwnProfile, onImageUpdate }) => {
  const initials = profile.fullname?.charAt(0).toLowerCase() ?? '?'

  const [isActive, setIsActive] = useState(false)
  const [visibility, setVisibility] = useState('public')
  const [uploading, setUploading] = useState(false)

  const fileInputRef = useRef(null)

  const handleAvatarClick = () => {
    if (!isOwnProfile) return
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    const compressedFile = await compressImage(file)

    const fileName = `${user.id}-${Date.now()}.jpg`

    const { error: uploadError } = await supabase.storage
      .from('profile-image')
      .upload(fileName, compressedFile)

    if (uploadError) {
      console.error(uploadError.message)
      setUploading(false)
      e.target.value = ''
      return
    }

    const { data: publicUrlData } = supabase.storage
      .from('profile-image')
      .getPublicUrl(fileName)

    const newImageUrl = publicUrlData.publicUrl

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ profiles_image: newImageUrl })
      .eq('id', user.id)

    if (!updateError) {
      onImageUpdate?.(newImageUrl)
    } else {
      console.error(updateError.message)
    }

    setUploading(false)
    e.target.value = ''
  }

  return (

        <div className="flex justify-center items-center pt-14 flex-col gap-4 w-full">
          <div>
              <div style={styles.card}>
                <div
                  style={{
                    ...styles.avatar,
                    flexShrink: 0,
                    alignSelf: 'center',
                    overflow: 'hidden',
                    cursor: isOwnProfile ? 'pointer' : 'default',
                    position: 'relative',
                  }}
                  onClick={handleAvatarClick}
                >
                  {profile.profiles_image ? (
                    <img
                      src={profile.profiles_image}
                      alt={profile.fullname}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    initials
                  )}

                  {isOwnProfile && (
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  )}

                  {uploading && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: 'rgba(0,0,0,0.4)', fontSize: '0.7rem', color: '#fff'
                    }}>
                      ...
                    </div>
                  )}
                </div>
                <div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h2 style={styles.name}>{profile.fullname}</h2>
                    {onEditClick && <Edit onEdit={onEditClick} />}
                  </div>
                  <h2 className="pb-5" style={styles.username}>@{profile.username}</h2>


                {!isOwnProfile && (
                  <div className="flex justify-center items-center gap-5">
                    <AddFriendButton targetUserId={profile.id} />

                    <Link to="/message">
                      <MessageCircle className="text-black" strokeWidth={3} size={24} />
                    </Link>
                  </div>
                )}



                </div>
                <div style={styles.actions}></div>
              </div>

            </div>

            <div className="flex flex-row  justify-center items-center gap-4 w-[100%] h-10 pr-1">

              <button
                  className={`h-10 py-2 px-2 font-bold ${
                    visibility === 'public' ? 'border-b-4 border-black' : 'border-2 border-transparent'
                  }`}

                    onClick={() =>
                      setVisibility('public')

                    }
                >
                  Public
                </button>

                {isOwnProfile && (

                  <button
                    className={`h-10 py-2 px-2 font-bold ${
                      visibility === 'private' ? 'border-b-4 border-black' : 'border-2 border-transparent'
                    }`}
                    onClick={() => setVisibility('private')}
                  >
                    Private
                  </button>
                )}

              <button
                  className={`h-10 py-2 px-2 font-bold  ${
                    visibility === 'stats' ? 'border-b-4 border-black' : 'border-2 border-transparent'
                  }`}
                 onClick={() =>
                    setVisibility('stats')

                  }

                >
                  Stats
              </button>
             </div>


            <div className="h-[calc(100vh-200px)] flex justify-center overflow-y-auto w-4/5 ">

              {(() => {
                if (visibility === 'public') return <Public userId={profile.id} />
                if (visibility === 'private' && isOwnProfile) return <Private userId={profile.id} viewerId={user?.id} />
                if (visibility === 'stats') return <Stats />
                return null
              })()}


            </div>








    </div>
  )
}






const styles = {
  card: {
    backgroundColor: 'gray',
    borderRadius: '16px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '210px',
    color: '#fff',
    maxHeight: '360px',
  },
  avatar: {
    width: '150px',
    height: '120px',
    borderRadius: '5%',
    backgroundColor: '#2ab4a0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: '600',
    color: ' ',
    flexShrink: 0,
    alignSelf: 'center',
  },
  name: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: '700',

  },
  username: {
    margin: 0,
    fontSize: '0.9rem',
    color: 'black',

  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  },
  iconBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: '1px solid #555',
    backgroundColor: 'transparent',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
  },
}

export default ProfileCard
