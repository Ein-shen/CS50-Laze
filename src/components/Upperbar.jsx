import { Link,  } from 'react-router-dom'
import Search from '../Home/Search'

const Upperbar = () => {
    

    return (
        <div className="flex flex-row items-center gap-4   text-black">
            <div className='flex flex-row items-center gap-2'>
               

                <Search />
            

            </div>
            
           

            <Link to="/notification">
                <img
                 src="https://img.icons8.com/?size=100&id=nY7Q73ERmlBS&format=png&color=000000"
                 alt="Notification"
                 width={24}
                 height={24}
                 />
            </Link>

            <Link to="/message">
                <img src="https://img.icons8.com/?size=100&id=jOjH1Mt48Fp1&format=png&color=000000" 
                     alt=" messenger"
                     width={24}
                     height={24} />
            </Link>
        </div>
    )
}

export default Upperbar