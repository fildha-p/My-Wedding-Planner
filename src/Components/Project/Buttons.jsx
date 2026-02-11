import React from 'react'

import { Link } from 'react-router-dom';
function Buttons() {
    
  return (
    <div className="flex space-x-5">
      <Link to={"/login"}>
        <button className="
        px-10 py-3
        rounded-full
        bg-white/90
        text-pink-500
        font-semibold
        tracking-wide
        shadow-xl
        hover:bg-white
        hover:shadow-2xl
        hover:scale-105
        active:scale-95
        transition-all
        duration-300
      ">
          CLICK TO LOGIN</button>
          </Link>
    
      </div>
  )
}

export default Buttons