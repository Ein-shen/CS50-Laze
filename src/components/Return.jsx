import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'

const Return = ({ to = "/", className = "" }) => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => (to === "back" ? navigate(-1) : navigate(to))}
      className={`left-0 pl-10 ${className}`}
    >
      <ArrowLeft size={24} color="black" />
    </button>
  )
}
export default Return
