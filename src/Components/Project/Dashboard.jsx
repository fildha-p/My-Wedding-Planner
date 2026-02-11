import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  
  const navigate = useNavigate();
  const wedding = useSelector(state => state.wedding.details);

  const totalSpent =
  Number(wedding?.venueFee || 0) +
  Number(wedding?.eventAmount || 0) +
  Number(wedding?.dressAmount || 0) +
  Number(wedding?.makeupFee || 0) +
  Number(wedding?.jewelleryAmount || 0);

  const rawRemaining =
  Number(wedding?.totalBudget || 0) - totalSpent;

const remainingAmount = Math.max(rawRemaining, 0);
const isOverBudget = rawRemaining < 0;



  if (!wedding) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
      <div className="font-sans text-pink-600 text-2xl font-bold mb-4">
        <p>No wedding details added yet.</p></div>
        <Link to="/wedding-form" className="text-pink-500 underline">
          Add Wedding Details
        </Link>
      
      </div>
    );
  }

  return (

<div className="min-h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-rose-200 flex flex-col items-center px-4 py-8">
  <h1 className="text-4xl font-extrabold text-pink-900 tracking-widest drop-shadow-md mb-6">
    WEDDING OVERVIEW 💍
  </h1>
  
<div className="w-full max-w-2xl bg-white/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-4 border border-white/30">

    <div>
      
    {/* <p className="uppercase tracking-wider text-2xl">Wedding Overview</p></div> */}
    <div className="space-y-3 text-xl text-pink-900 text-center" >
    <p>📅 <b>Date:</b> {wedding.date}</p>
    <p>📍 <b>Venue:</b> {wedding.venueArea || "Not decided"}</p>
    <p>🎉 <b>Event:</b> {wedding.event === "yes" ? wedding.eventname : "Not decided"}</p>
    <p>👗 <b>Dress:</b> {wedding.dressSelected === "yes" ? wedding.dressFrom : "Not selected"}</p>
    <p>💄 <b>Makeup:</b> {wedding.makeupBooked === "yes" ? wedding.makeupArtist : "Not booked"}</p>
    <p>💍 <b>Jewellery:</b> {wedding.jewelleryReady === "yes" ? wedding.jewelleryFrom : "Not Ready"}</p>
    <div className="mt-6 rounded-xl bg-white/70 px-6 py-4 text-center shadow-inner">
        <p className="text-sm text-gray-600 uppercase tracking-wider">Amount Left to Pay</p>

  {!isOverBudget ? (
    <span className="inline-block mt-2 px-5 py-2 rounded-full bg-green-100 text-green-700 font-bold">
      Remaining Budget: ₹ {remainingAmount}
    </span>
  ) : (
    <span className="inline-block mt-2 px-5 py-2 rounded-full bg-red-100 text-red-700 font-bold">
      ⚠️ Not enough budget
    </span>
  )}
      </div>
    </div>
  
 </div>
 

 <div className="text-center">
 <button
  onClick={() => navigate("/wedding-form")}
  className="
    mt-6
    px-8 py-2
    rounded-full
    bg-gradient-to-r from-pink-500 to-rose-500
    text-white
    font-medium
    tracking-wide
    shadow-lg
    hover:scale-105
    transition-transform
  "
>
  Edit Details
</button>

</div>
  
</div>

</div>

  );
}

export default Dashboard;
