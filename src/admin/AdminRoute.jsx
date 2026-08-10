import { Navigate } from 'react-router-dom'

// Only lets admins through. Everyone else gets sent back home.
const AdminRoute = ({ role, children }) => {
    if (role !== 'admin') {
        return <Navigate to="/" replace />
    }
    return children
}

export default AdminRoute