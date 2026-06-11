import React from 'react'

export const Navbar = () => {
  return (
    <header
      style={{ backgroundColor: '#e5e7eb' }} // same color as bg-gray-200
      className="fixed top-0 left-0 w-full h-14 z-50 border-b-2 border-black flex items-center pl-16 pr-4 md:pl-6"
    >
      <h1 className="font-bold text-2xl leading-none">
        L<img src="/mortarboard.png" alt="" className="w-6 h-7 inline pb-1" />zeu
      </h1>
    </header>

    
  )
}