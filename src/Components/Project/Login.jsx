// import React, { useState } from 'react'
// import { useSelector,useDispatch } from 'react-redux'
// import { login } from '../../redux/slice/authSlice'
// import { useNavigate } from 'react-router-dom'
// function Login() {
//     const error = useSelector(state => state.auth.error)
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const [email,setEmail] = useState ("")
//     const [password,setPassword] = useState ("")
//     const handleLogin = () =>{
//         dispatch(login({ email, password }))
//         navigate("/dashboard")
//     }
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-pink-400">
//       <h2 className="text-white text-2xl mb-4">LOGIN</h2>

//       <input
//         type="email"
//         placeholder="Email"
//         className="mb-3 p-2 rounded"
//         onChange={e => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         className="mb-3 p-2 rounded"
//         onChange={e => setPassword(e.target.value)}
//       />

//       <button
//         className="bg-slate-500 px-6 py-2 rounded text-white"
//         onClick={handleLogin}
//       >
//         LOGIN
//       </button>

//       {error && <p className="text-red-700 mt-2">{error}</p>}
//     </div>
//   )
// }

// export default Login
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../redux/slice/authSlice";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const error = useSelector(state => state.auth.error);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     dispatch(login({ email, password }));
//     navigate("/dashboard");
//   };

//   return (
//     <div className="min-h-screen bg-pink-400 flex flex-col items-center justify-center">
//       <h2 className="text-white text-2xl mb-4">LOGIN</h2>

//       <input
//         type="email"
//         placeholder="Email"
//         className="mb-3 p-2 rounded"
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         className="mb-3 p-2 rounded"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button
//         onClick={handleLogin}
//         className="
//         px-10 py-3
//         rounded-full
//         bg-white/90
//         text-pink-500
//         font-semibold
//         tracking-wide
//         shadow-xl
//         hover:bg-white
//         hover:shadow-2xl
//         hover:scale-105
//         active:scale-95
//         transition-all
//         duration-300
//       "
//       >
//         LOGIN
//       </button>

//       {error && <p className="text-red-700 mt-2">{error}</p>}
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(login({ email, password }));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-pink-300 via-pink-400 to-rose-400">

      {/* Login Card */}
      <div className="bg-white/30 backdrop-blur-lg
                      rounded-3xl shadow-2xl
                      px-10 py-12 w-[360px]
                      flex flex-col items-center">

        <h2 className="text-white text-3xl font-serif tracking-widest mb-8">
          LOGIN
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="
            w-full mb-4 px-4 py-3
            rounded-xl
            bg-white/90
            text-gray-700
            placeholder-gray-400
            focus:outline-none
            focus:ring-2 focus:ring-pink-300
          "
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="
            w-full mb-6 px-4 py-3
            rounded-xl
            bg-white/90
            text-gray-700
            placeholder-gray-400
            focus:outline-none
            focus:ring-2 focus:ring-pink-300
          "
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="
            w-full py-3
            rounded-full
            bg-white
            text-pink-500
            font-semibold
            tracking-wide
            shadow-xl
            hover:shadow-2xl
            hover:scale-105
            active:scale-95
            transition-all
            duration-300
          "
        >
          LOGIN
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm mt-4 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;