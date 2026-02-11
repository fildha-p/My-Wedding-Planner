// import React from 'react'

// import { Link } from "react-router-dom";
// function Navbar() {
//   return (
//     <div className="bg-pink-400 text-white p-10 flex items-center justify-center" >
//       <div className="flex space-x-5 font-light font-serif from-neutral-400">
//         <Link to={"/"}>
//         <p className="p-3 font-medium hover:text-slate-400 cursor-pointer">DASHBOARD</p>
//         </Link >
//         <Link to={"/about"}>
//         <p className="p-3 font-medium hover:text-slate-400 cursor-pointer">WEDDING FORM</p>
//         </Link>
//         <Link to={"/contact"}>
//         <p className="p-3 font-medium hover:text-slate-400 cursor-pointer">PROFILE</p>
//         </Link>
//       </div>
      

//     </div>
//   )
// }

// export default Navbar

import { Link , useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/authSlice";
import { useSelector } from "react-redux";
function Navbar() {
  const wedding = useSelector((state) => state.wedding.details);

let daysToGo = null;

if (wedding?.date) {
  const today = new Date();
  const weddingDate = new Date(wedding.date);

  today.setHours(0, 0, 0, 0);
  weddingDate.setHours(0, 0, 0, 0);

  const diffTime = weddingDate - today;
  daysToGo = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-white p-10 flex items-center justify-between shadow-md">
      {/* LEFT SIDE */}
{!wedding?.date ? (
  <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl shadow-md">
    <span className=" font-semibold tracking-wide text-white">
      Start Planning 💍
    </span>
  </div>
) : (
  daysToGo !== null && daysToGo >= 0 && (
    <div className="flex items-center gap-3 bg-white/20 backdrop-blur-lg px-6 py-3 rounded-2xl shadow-md">
      {/* <span className="text uppercase tracking-widest text-white/80">
        Wedding In
      </span> */}

      <span className="text-3xl font-extrabold text-white">
        {daysToGo}
      </span>
       <span className="text uppercase tracking-widest text-white/80">
        {
          daysToGo === 1 ? "DAY TO GO" : "DAYS TO GO"
        }
      </span>

      {/* <span className="text-sm font-semibold text-white">
        Days 💍
      </span> */}
    </div>
  )
)}
      <div className="flex gap-8 space-x-5 font-light font-sans from-neutral-400 tracking-wider">
        <Link to="/dashboard">
        <p className="p-3 font-medium hover:text-slate-400 cursor-pointer">PLANNER</p></Link>
        {/* <Link to="/wedding-form"><p className="p-3 font-medium hover:text-slate-400 cursor-pointer">WEDDING FORM</p></Link> */}
        {/* <Link to="/profile"><p className="p-3 font-medium hover:text-slate-400 cursor-pointer">PROFILE</p> </Link> */}
        <Link to="/timeline"><p className="p-3 font-medium hover:text-slate-400 cursor-pointer">EVENTS</p></Link>

      </div>
        <button
          onClick={handleLogout}
          className="
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
      "
        >
          LOGOUT
        </button>

    </div>
  );
}

export default Navbar;


