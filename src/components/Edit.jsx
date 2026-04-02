import { Pencil } from 'lucide-react'

const Edit = ({ onEdit }) => {
    return (
        <button onClick={(e) => {
            e.stopPropagation()  
            onEdit()
        }}>
             <img src="https://img.icons8.com/?size=100&id=9i9HlS0bGONj&format=png&color=000000" alt="edit" height={20} width={20}/>
                
        </button>
    )
}

export default Edit
