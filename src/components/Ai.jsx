import React from 'react'
import { Upload } from "lucide-react"

const Ai = () => {
  return (
    <div className="w-[80%] h-[28rem] border-black border-2  rounded-md flex flex-col  px-10 py-10 ">

      <h1 className="font-bold text-2xl text-center pb-10"> Let's go study?  </h1>

      <h1 className="font-bold text-2xl text-center pb-20"> <img src="/mortarboard.png" alt="mortarboard" className="inline-block w-32 h-32 " />  </h1>



      <div className="flex justify-center  ">

        <div className="relative w-[80%]">
          <input
            placeholder="Ai flashCards -- Coming soon."
            disabled
            className="w-full h-14 rounded-md text-center bg-gray-300 border-black border-2"
          />
          <Upload size={20} className="absolute right-5 top-1/2 -translate-y-1/2" />
        </div>

      </div>
      <button>

      </button>
    </div>
  )
}

export default Ai
