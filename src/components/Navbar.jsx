import React from 'react'
import Upperbar from './Upperbar'

export const Navbar = () => {
  return (
    <header
      className="fixed top-0 left-0 w-full h-14 z-50 bg-gray-300 border-b border-black/80 flex items-center justify-between pr-4"
    >
      <div className="flex items-center pl-5 md:pl-0 md:w-64 md:justify-center">
        <h1 className="font-bold text-2xl leading-none">
          L<img src="/mortarboard.png" alt="" className="w-6 h-7 inline pb-1" />zeu
        </h1>
      </div>

      <Upperbar />
    </header>
  )
}