import { Pencil } from 'lucide-react'

const Edit = ({ onEdit }) => {
    return (
        <button onClick={(e) => {
            e.stopPropagation()  
            onEdit()
        }}>
            <Pencil size={20} />
        </button>
    )
}

export default Edit
