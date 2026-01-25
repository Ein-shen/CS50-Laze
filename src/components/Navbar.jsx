import React from 'react'
import Upperbar from './Upperbar'
import { ChevronDown } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate()
  return (
    <header
      className="fixed top-0 nav-theme left-0 w-full h-14 z-50 bg-gray-300  flex items-center justify-between pr-4"
    >
      <div className="flex items-center pl-5 md:pl-0 md:w-64 md:justify-center">
        <h1 className="font-bold text-2xl text-gray-200 leading-none">
          L<img src="/mortarboard.png" alt="" className="w-6 h-7 inline pb-1" />zeu
        </h1>
      </div>

      

      <div className='flex flex-row items-center gap-6'>
        <div>
           <Upperbar />

        </div>
       
      

      {/* Profile gateway */}
       <div className='flex flex-row items-center gap-1'>
        <button 
          onClick={() => navigate('/profile')}
          className='border border-black/80  rounded-full p-4'>

        </button>

        <ChevronDown />

       </div>
        

      </div>
    </header>
  )
}