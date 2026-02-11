
import Buttons from './Buttons'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/slice/authSlice'
import { useNavigate } from 'react-router-dom'

function Home() {
  const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    const handleLogin = () => {
      dispatch(login({ email, password }))
      navigate("/dashboard")
    }

  return(
    
    <div className="min-h-screen w-full flex items-center justify-center 
                    bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500
                    text-white relative overflow-hidden">

      {/* Soft background decoration */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-white/10 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="z-10 flex flex-col items-center text-center gap-8 px-4">

        <h1 className="text-5xl md:text-6xl font-serif font-light tracking-wide">
          My Wedding Planner
        </h1>

        <p className="text-white/80 max-w-md">
          Plan your special day effortlessly — venues, events, budget & more.
        </p>

        <Buttons />
      </div>
    </div>
  
  )
}

export default Home