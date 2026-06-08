
import Edit from '../components/Edit'
import { useRef, useState } from 'react'
import { supabase } from '../supabaseClient'
import Public from '../components/Public'
import Private from '../components/Private'
import AddFriendButton from '../components/AddFriendButton'
import { MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const compressImage = (file, maxSize = 512) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)

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
      canvas.width = Math.round(width)
      canvas.height = Math.round(height)

      const context = canvas.getContext('2d')

      if (!context) {
        URL.revokeObjectURL(objectUrl)
        reject(new Error('Unable to process image'))
        return
      }

      context.drawImage(img, 0, 0, canvas.width, canvas.height)

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl)

          if (!blob) {
            reject(new Error('Unable to compress image'))
            return
          }

          resolve(
            new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
              type: 'image/jpeg',
            })
          )
        },
        'image/jpeg',
        0.8
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Unable to load image'))
    }

    img.src = objectUrl
  })
}

const ProfileCard = ({
  user,
  profile,
  onEditClick,
  isOwnProfile,
  onImageUpdate,
}) => {
  const initials = profile.fullname?.charAt(0).toLowerCase() ?? '?'

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

    try {
      const compressedFile = await compressImage(file)
      const fileName = `${user.id}-${Date.now()}.jpg`

      const { error: uploadError } = await supabase.storage
        .from('profile-image')
        .upload(fileName, compressedFile)

      if (uploadError) {
        throw uploadError
      }

      const { data: publicUrlData } = supabase.storage
        .from('profile-image')
        .getPublicUrl(fileName)

      const newImageUrl = publicUrlData.publicUrl

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ profiles_image: newImageUrl })
        .eq('id', user.id)

      if (updateError) {
        throw updateError
      }

      onImageUpdate?.(newImageUrl)
    } catch (error) {
      console.error('Error updating profile image:', error.message)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="div-theme flex w-full flex-col items-center justify-center gap-4 pt-14">
      <div style={styles.card}>
        {/* Profile picture */}
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
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
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
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.4)',
                fontSize: '0.7rem',
                color: '#fff',
              }}
            >
              Uploading...
            </div>
          )}
        </div>

        {/* Name, username, and friend actions */}
       
        <div className="w-full min-w-0">
        {/* Name and username aligned with the photo's left edge */}
        <div className="flex w-full justify-center">
          <div className="w-full pl-[41px]">
            <div className="flex min-w-0 items-center justify-start gap-2">
              <h2 className="min-w-0 break-words" style={styles.name}>
                {profile.fullname}
              </h2>

              {onEditClick && (
                <div className="shrink-0">
                  <Edit onEdit={onEditClick} />
                </div>
              )}
            </div>

            <h2 className="min-w-0 text-left" style={styles.username}>
              @{profile.username}
            </h2>
          </div>
        </div>

          {/* Friend button and message icon */}
          {!isOwnProfile && (
            <div className="mt-2 flex w-full justify-center">
              <div className="grid w-[150px] grid-cols-[minmax(0,1fr)_40px] items-center gap-2">
                <div className="flex min-w-0 justify-start">
                  <AddFriendButton targetUserId={profile.id} />
                </div>

                <Link
                  to="/message"
                  className="flex h-10 w-10 items-center justify-center"
                  aria-label={`Message ${profile.fullname}`}
                >
                  <MessageCircle
                    className="text-black"
                    strokeWidth={3}
                    size={24}
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
        </div>

      {/* Public and private tabs */}
      <div className="flex h-10 w-full flex-row items-center justify-center gap-4 pr-1">
        <button
          className={`flex h-10 flex-row items-center gap-1 border-b-2 px-2 py-2 font-bold ${
            visibility === 'public'
              ? 'border-black'
              : 'border-transparent'
          }`}
          onClick={() => setVisibility('public')}
        >
          <img
            src="https://img.icons8.com/?size=100&id=paJ3yfLnNSCK&format=png&color=000000"
            alt=""
            height={18}
            width={18}
          />
          Public
        </button>

        {isOwnProfile && (
          <button
            className={`flex h-10 flex-row items-center gap-1 border-b-2 px-2 py-2 font-bold ${
              visibility === 'private'
                ? 'border-black'
                : 'border-transparent'
            }`}
            onClick={() => setVisibility('private')}
          >
            <img
              src="https://img.icons8.com/?size=100&id=LnUkDWKbslSu&format=png&color=000000"
              alt=""
              height={18}
              width={18}
            />
            Private
          </button>
        )}
      </div>

      {/* Profile content */}
      <div className="flex min-h-[calc(100vh-200px)] w-4/5 justify-center">
        {visibility === 'public' && <Public userId={profile.id} />}

        {visibility === 'private' && isOwnProfile && (
          <Private userId={profile.id} viewerId={user?.id} />
        )}
      </div>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: '#ACC5A6',
    borderRadius: '16px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '1rem',
    width: '280px',
    boxSizing: 'border-box',
    color: '#fff',
    minHeight: '260px',
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
    color: '#fff',
    flexShrink: 0,
    alignSelf: 'center',
  },

  name: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: '700',
    textAlign: 'left',
  },

  username: {
    margin: 0,
    fontSize: '0.9rem',
    color: 'black',
    textAlign: 'left',
  },
}

export default ProfileCard
