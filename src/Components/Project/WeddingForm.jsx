// import { useDispatch } from "react-redux";
// import { addWedding } from "../../redux/slice/WeddingSlice";
// import { useState } from "react";

// function WeddingForm() {
//   const dispatch = useDispatch();
//   // const weddings = useSelector(state => state.wedding.details);

//   const [form, setForm] = useState({
//   bride: "",
//   groom: "",
//   date: "",
//   venue: "",
//   budget: "",
//   event: "",
//   dresstype: "",
//   makeup: "",
//   skincare: ""
// });

//   const [saved, setSaved] = useState(false);

//   const handleSubmit = () => {
//     dispatch(addWedding(form));
//     setSaved(true);
//   };

  
//   return (
//     <div className="p-6 flex flex-col items-center justify-center bg-pink-200 h-full w-full gap-5">
//       <h2 className="text-pink-500 font-sans font-semibold text-2xl mb-4">Enter Your Wedding Details</h2>

//       <input className="bg-slate-200 rounded-md p-2 " placeholder="Bride Name" onChange={e => setForm({...form, bride: e.target.value})} />
//       <input className="bg-slate-200 rounded-md p-2 " placeholder="Groom Name" onChange={e => setForm({...form, groom: e.target.value})} />
//       <input className="bg-slate-200 rounded-md p-2 " type="date" onChange={e => setForm({...form, date: e.target.value})} />
//       <input className="bg-slate-200 rounded-md p-2 " placeholder="Venue" onChange={e => setForm({...form, venue: e.target.value})} />
//       <input className="bg-slate-200 rounded-md p-2 " placeholder="Budget" onChange={e => setForm({...form, budget: e.target.value})} />
//       <input className="bg-slate-200 rounded-md p-2 " placeholder="Event team" onChange={e => setForm({...form, event: e.target.value})} />
//       <input className="bg-slate-200 rounded-md p-2 " placeholder="Dress type" onChange={e => setForm({...form, dresstype: e.target.value})} />
//       <input className="bg-slate-200 rounded-md p-2 " placeholder="Makeup artist" onChange={e => setForm({...form, makeup: e.target.value})} />
//       <textarea className="bg-slate-200 rounded-md p-2 " placeholder="Skin Care details" name="paragraph_text" cols="50" rows="5" onChange={e => setForm({...form, skincare: e.target.value})}></textarea>
//       <button onClick={handleSubmit} className="bg-slate-400 px-6 py-2 rounded">
//         SAVE
//       </button>
//       {saved && (
//   <p className="text-green-700 font-medium mt-3">
//     Wedding details saved successfully!
//   </p>
// )}

//     </div>
//   );
// }

// export default WeddingForm;


import { useDispatch , useSelector} from "react-redux";
import { addWedding , updateWedding , deleteWedding} from "../../redux/slice/WeddingSlice";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const initialForm = {
    date: "",

    venueSelected: "no",
    venueArea : "",
    venueFee : "",

    totalBudget: "",

    event: "no",
    eventname: "",
    eventAmount: "",

    dressSelected: "no",
    dressType: "",
    dressFrom: "",
    dressAmount: "",

    makeupBooked: "no",
    makeupArtist: "",
    makeupFee: "",

    jewelleryReady: "no",
    jewelleryFrom: "",
    jewelleryAmount: "",

    selfCareNotes: ""
}

function WeddingForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const existingWedding = useSelector(
    (state) => state.wedding.details
  );
  
const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState(initialForm);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
  if (existingWedding && existingWedding.date) {
    const storedDate = new Date(existingWedding.date);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (storedDate < todayDate) {
      setForm(initialForm);
    } else {
      setForm(existingWedding);
    }
  } else {
    setForm(initialForm);
  }
}, [existingWedding]);


//   const handleChange = (e) => {
//   const { name, value, type } = e.target;

//   // Allow numbers directly
//   if (type === "number") {
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

    
//     return;
//   }

//   // Text fields → remove extra spaces
//   setForm((prev) => ({
//     ...prev,
//     [name]: value.replace(/\s+/g, " "),
//   }));
// };

  const handleSubmit = () => {

    const selectedDate = new Date(form.date);
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  if (selectedDate < todayDate) {
    alert("Please select a valid date ❗");
    return;
  }

    if (!form.totalBudget || Number(form.totalBudget) <= 0) {
    alert("Please enter a valid total budget ❗");
    return;
  }

  if (form.venueSelected === "yes"){
    if (!form.venueArea.trim() || Number(form.venueFee) <= 0){
      alert("Please enter valid venue details");
      return;
    }
  }

// 🔴 EVENT VALIDATION
  if (form.event === "yes") {
    if (!form.eventname.trim() || Number(form.eventAmount) <= 0) {
      alert("Please enter valid event details");
      return;
    }
  }

  // 🔴 DRESS VALIDATION
  if (form.dressSelected === "yes") {
    if (
      !form.dressType.trim() ||
      !form.dressFrom.trim() ||
      Number(form.dressAmount) <= 0
    ) {
      alert("Please enter valid dress details");
      return;
    }
  }

// 🔴 MAKEUP VALIDATION
  if (form.makeupBooked === "yes") {
    if (!form.makeupArtist.trim() || Number(form.makeupFee) <= 0) {
      alert("Please enter valid makeup details");
      return;
    }
  }

  // 🔴 JEWELLERY VALIDATION
  if (form.jewelleryReady === "yes") {
    if (!form.jewelleryFrom.trim() || Number(form.jewelleryAmount) <= 0) {
      alert("Please enter valid jewellery details");
      return;
    }
  }

  const trimmedForm = {
    ...form,
    venueArea: form.venueArea.trim(),
    eventname: form.eventname.trim(),
    dressType: form.dressType.trim(),
    dressFrom: form.dressFrom.trim(),
    makeupArtist: form.makeupArtist.trim(),
    jewelleryFrom: form.jewelleryFrom.trim(),
    selfCareNotes: form.selfCareNotes.trim(),
  };

  if (existingWedding && existingWedding.date) {
    dispatch(updateWedding(trimmedForm));
    setIsUpdate(true);
  } else {
    dispatch(addWedding(trimmedForm));
    setIsUpdate(false);
  }

  setSaved(true);

  setTimeout(() => {
    navigate("/dashboard");
  }, 1500);
};


  const [isUpdate, setIsUpdate] = useState(false);

  
  const totalSpent =
  Number(form.venueFee || 0) +
  Number(form.eventAmount || 0) +
  Number(form.dressAmount || 0) +
  Number(form.makeupFee || 0) +
  Number(form.jewelleryAmount || 0);
  
const rawRemaining =
  Number(form.totalBudget || 0) - totalSpent;

const remainingAmount = Math.max(rawRemaining, 0);
const isOverBudget = rawRemaining < 0;

const isBudgetInvalid =
  !form.totalBudget || Number(form.totalBudget) <= 0 || isOverBudget;

const handleReset = () => {
  const confirmReset = window.confirm("Are you sure you want to reset all details?");
  if (!confirmReset) return;

  // 1️⃣ Clear Redux state
  dispatch(deleteWedding());

  // 2️⃣ Reset local form state
  setForm(initialForm);

  // 3️⃣ Reset flags
  setSaved(false);
  setIsUpdate(false);

  // 4️⃣ Auto redirect after short delay
  setTimeout(() => {
    navigate("/dashboard");
  }, 800);
};


  return (
    <>
    <div className="bg-pink-200 min-h-screen flex justify-center p-6 ">
    <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8 space-y-6 font-sans">
      {/* <div className="p-6 flex flex-col items-center justify-center bg-pink-200 min-h-screen gap-4"> */}
      <h2 className="text-4xl font-extrabold text-pink-900 tracking-widest drop-shadow-md mb-6 text-center">
        MY WEDDING PLANNER 💍
      </h2>
<div className="bg-pink-50 font-semibold p-4 rounded-xl space-y-2 text-center">
      {/* BASIC DETAILS */}
      <label className="font-semibold text-pink-600">Date : </label>
      <input className=" bg-slate-100 rounded-md p-2 text-pink-700  text-center" type="date" value={form.date}
      min={today}
        onChange={e => setForm({ ...form, date: e.target.value })} />
        </div>
              {/* BUDGET */}
              <div className="bg-pink-50 p-4 rounded-xl space-y-2 text-center font-semibold">
<h3 className="font-semibold text-pink-600">
  BUDGET DETAILS
</h3>

<input
value={form.totalBudget}
  className="bg-slate-200 rounded-md p-2 text-pink-700 text-center"
  placeholder="Total Budget"
  type="number"
  min="1"
  onChange={e => setForm({ ...form, totalBudget: e.target.value })}
/>
{form.totalBudget !== "" && Number(form.totalBudget) <= 0 && (
  <p className="text-red-600 text-sm text-center">
    Budget must be greater than 0 ❗
  </p>
)}
</div>
<div className="flex justify-center items-center bg-pink-50 p-4 rounded-xl">
      {/* VENUE DETAILS */}
      <label className="font-semibold  text-pink-600 "> Venue Confirmed ?  </label>
      <select value={form.venueSelected} className="bg-slate-100 rounded-md p-2"
        onChange={e => {
    const value = e.target.value;
    setForm({
      ...form,
      venueSelected: value,
      ...(value === "no" && {
        venueArea: "",
        venueFee: ""
      })
    });
  }}>
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select> </div>
      {form.venueSelected === "yes" && (
  <div className="bg-white border rounded-lg p-4 space-y-2">

    {/* Venue Area */}
    <input
      name="venueArea"
      value={form.venueArea}
      placeholder="Venue Area"
      className="w-full bg-slate-100 rounded-md p-2 text-center"
      onChange={e =>
        setForm({ ...form, venueArea: e.target.value })
      }
    />

    {form.venueArea !== "" && !form.venueArea.trim() && (
      <p className="text-red-600 text-sm text-center">
        Enter valid venue detail ❗
      </p>
    )}

    {/* Venue Fee */}
    <input
      value={form.venueFee}
      placeholder="Venue Amount"
      type="number"
      min="1"
      className="w-full bg-slate-100 rounded-md p-2 text-center"
      onChange={e =>
        setForm({ ...form, venueFee: e.target.value })
      }
    />

    {form.venueFee !== "" && Number(form.venueFee) <= 0 && (
      <p className="text-red-600 text-sm text-center">
        Amount must be greater than 0 ❗
      </p>
    )}

  </div>
)}


      {/* EVENT */} <div className="flex justify-center items-center bg-pink-50 p-4 rounded-xl">
      <label className="font-semibold  text-pink-600 "> Event & Decoration Arranged ? </label>
      <select value={form.event} className="bg-slate-200 rounded-md p-2"
        onChange={e => {
  const value = e.target.value;
  setForm({
    ...form,
    event: value,
    ...(value === "no" && {
      eventname: "",
      eventAmount: ""
    })
  });
}}
>
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select></div>
      {form.event === "yes" && (
        <div className="bg-white border rounded-lg p-4 space-y-2 ">
          <input name="eventname" value={form.eventname} className="w-full bg-slate-100 rounded-md p-2 text-center" placeholder="Event team"
            onChange={e => setForm({ ...form, eventname: e.target.value })} />
          <input value={form.eventAmount} className="w-full bg-slate-100 rounded-md p-2 text-center" placeholder="Event Fees"
            type="number" min="1" onChange={e => setForm({ ...form, eventAmount: e.target.value })} />
            {form.eventAmount !== "" && Number(form.eventAmount) <= 0 && (
  <p className="text-red-600 text-sm text-center">
    Budget must be greater than 0 ❗
  </p>
)}
        </div>
      )}
      
      {/* DRESS */} <div className="flex justify-center items-center bg-pink-50 p-4 rounded-xl">
      <label className="font-semibold  text-pink-600"> Wedding Dress Selected ? </label>
      <select value={form.dressSelected} className="bg-slate-200 rounded-md p-2"
       onChange={e => {
  const value = e.target.value;
  setForm({
    ...form,
    dressSelected: value,
    ...(value === "no" && {
      dressType: "",
      dressFrom: "",
      dressAmount: ""
    })
  });
}}
>
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select> </div>

      {form.dressSelected === "yes" && (
        <div className="bg-white border rounded-lg p-4 space-y-2 text-center flex  flex-col ">
          <input name="dressType" value={form.dressType} className=" bg-slate-100 rounded-md p-2 text-center" placeholder="Dress Type"
            onChange={e => setForm({ ...form, dressType: e.target.value })} />
          <input name="dressFrom" value={form.dressFrom} className=" bg-slate-100 rounded-md p-2 text-center" placeholder="Dress From"
            onChange={e => setForm({ ...form, dressFrom: e.target.value })} />
          <input value={form.dressAmount} className=" bg-slate-100 rounded-md p-2 text-center" placeholder="Dress Amount"
           type="number" min="1" onChange={e => setForm({ ...form, dressAmount: e.target.value })} />
           {form.dressAmount !== "" && Number(form.dressAmount) <= 0 && (
  <p className="text-red-600 text-sm text-center">
    Budget must be greater than 0 ❗
  </p>
)}
        </div>
      )}

      {/* MAKEUP */} <div className="flex justify-center items-center bg-pink-50 p-4 rounded-xl">
      <label className="font-semibold  text-pink-600"> Makeup Artist Booked ? </label>
      <select value={form.makeupBooked} className="bg-slate-200 rounded-md p-2"
        onChange={e => {
  const value = e.target.value;
  setForm({
    ...form,
    makeupBooked: value,
    ...(value === "no" && {
      makeupArtist: "",
      makeupFee: ""
    })
  });
}}
>
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select></div>

      {form.makeupBooked === "yes" && (
        <div className="bg-white border rounded-lg p-4 space-y-2  flex  flex-col ">
          <input name="makeupArtist" value={form.makeupArtist} className="bg-slate-200 rounded-md p-2 text-center" placeholder="Makeup Artist Name"
            onChange={e => setForm({ ...form, makeupArtist: e.target.value })} />
          <input value={form.makeupFee} className="bg-slate-200 rounded-md p-2 text-center" type="number" min="1" placeholder="Makeup Fees"
            onChange={e => setForm({ ...form, makeupFee: e.target.value })} />
            {form.makeupFee !== "" && Number(form.makeupFee) <= 0 && (
  <p className="text-red-600 text-sm text-center">
    Budget must be greater than 0 ❗
  </p>
)}
        </div>
      )}

      {/* JEWELLERY */} <div className="flex justify-center items-center bg-pink-50 p-4 rounded-xl">
      <label className="font-semibold  text-pink-600 "> Jewellery Arranged ? </label>
      <select value={form.jewelleryReady} className="bg-slate-200 rounded-md p-2"
        onChange={e => setForm({ ...form, jewelleryReady: e.target.value })}>
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select></div>

      {form.jewelleryReady === "yes" && (
  <div className="bg-white border rounded-lg p-4 space-y-2 flex flex-col">
    
    <input
      name="jewelleryFrom"
      value={form.jewelleryFrom}
      className="bg-slate-200 rounded-md p-2 text-center"
      placeholder="Jewellery From"
      onChange={e =>
        setForm({
          ...form,
          jewelleryFrom: e.target.value
        })
      }
    />

    <input
      value={form.jewelleryAmount}
      className="bg-slate-200 rounded-md p-2 text-center"
      type="number" min="1"
      placeholder="Jewellery Amount"
      onChange={e =>
        setForm({
          ...form,
          jewelleryAmount: e.target.value
        })
      }
    />
    {form.jewelleryAmount !== "" && Number(form.jewelleryAmount) <= 0 && (
  <p className="text-red-600 text-sm text-center">
    Budget must be greater than 0 ❗
  </p>
)}

  </div>
)}


      {/* SELF CARE */}
      <div className="flex justify-center items-center bg-pink-50 p-4 rounded-xl">
      <textarea name="selfCareNotes"
      value={form.selfCareNotes}
        className="bg-slate-200 rounded-md p-2 text-center"
        placeholder="Self-care / Skin-care notes"
        rows="5" cols='50'
        onChange={e => setForm({ ...form, selfCareNotes: e.target.value })}
      /></div>

<div className="bg-pink-50 p-4 rounded-xl space-y-2 text-center font-semibold">
<h3 className="font-semibold text-pink-600">AMOUNT SPENT</h3>
<input
  value={totalSpent}
  readOnly
 className="bg-slate-200 rounded-md p-2 text-pink-700 text-center"
  type="number"
/></div>

{/* AUTO CALCULATED */}
<div className="bg-white rounded-md p-3 text-center shadow">
  <p className="text-gray-600 text-sm">Amount Left to Pay</p>

  {!isOverBudget ? (
    <p className="text-xl font-bold text-green-600">
      Remaining Budget: ₹ {remainingAmount}
    </p>
  ) : (
    <p className="text-xl font-bold text-red-600">
      ⚠️ Not enough budget
    </p>
  )}
</div>

{!form.date && (
  <p className="text-red-600 text-sm text-center">
    Date is required ❗
  </p>
)}
<div className="flex flex-col items-center justify-center">
      <button
      disabled={!form.date || isBudgetInvalid}
      onClick={handleSubmit}
        className="
    px-8 py-2
    rounded-full
    bg-gradient-to-r from-pink-500 to-rose-500
    text-white
    font-medium
    tracking-wide
    shadow-lg
    hover:scale-105
    transition-transform"
      >


        {existingWedding?.date ? "UPDATE DETAILS" : "SAVE DETAILS"}
      </button>
{isOverBudget && (
  <p className="text-red-600 text-sm text-center mt-2">
    Budget exceeded. Please adjust expenses ❗
  </p>
)}
      <button 
      type="button"
      onClick={handleReset} className="mt-5
    px-8 py-2
    rounded-full
    bg-gradient-to-r from-pink-500 to-rose-500
    text-white
    font-medium
    tracking-wide
    shadow-lg
    hover:scale-105
    transition-transform">
        RESET
      </button></div>

      {saved && (
        <p className="text-green-700 font-medium text-center">
          {isUpdate? "Wedding details updated successfully ✅"
            : "Wedding details saved successfully ✅"}
        </p>
      )}
      
      </div>
    
    </div>
   

    </>
  )
}

export default WeddingForm;
{/* 
// import { useDispatch , useSelector} from "react-redux";
// import { addWedding , updateWedding , deleteWedding} from "../../redux/slice/WeddingSlice";
// import { useState } from "react";
// import { useEffect } from "react";


// function WeddingForm() { */}
{/* //   const [functionType, setFunctionType] = useState("wedding");
//   const dispatch = useDispatch();
//   const existingWedding = useSelector(
//     (state) => state.wedding.functions?.[functionType]
//   );
//   const [form, setForm] = useState({ */}
  
//     date: "",
//     time: "",

//     venueSelected: "no",
//     venueArea : "",
//     venueFee : "",

//     totalBudget: "",
//     spentAmount: "",

//     event: "no",
//     eventname: "",
//     eventAmount: "",

//     dressSelected: "no",
//     dressType: "",
//     dressFrom: "",
//     dressAmount: "",

//     makeupBooked: "no",
//     makeupArtist: "",
//     makeupFee: "",

//     jewelleryReady: "no",
//     jewelleryFrom: "",
//     jewelleryAmount: "",

//     selfCareNotes: ""
//   });

//   const [saved, setSaved] = useState(false);

//   useEffect(() => {
//   if (existingWedding && existingWedding.date) {
//     setForm(existingWedding);
//   } else {
//     setForm({
//       date: "",
//       time: "",
//       venueSelected: "no",
//       venueArea: "",
//       venueFee: "",
//       totalBudget: "",
//       spentAmount: "",
//       event: "no",
//       eventname: "",
//       eventAmount: "",
//       dressSelected: "no",
//       dressType: "",
//       dressFrom: "",
//       dressAmount: "",
//       makeupBooked: "no",
//       makeupArtist: "",
//       makeupFee: "",
//       jewelleryReady: "no",
//       jewelleryFrom: "",
//       jewelleryAmount: "",
//       selfCareNotes: ""
//     });
//   }
//   setSaved(false);
// }, [existingWedding, functionType]);

//   const handleSubmit = () => {
//     if (existingWedding && existingWedding.date) {
//   dispatch(updateWedding({
//     functionType,
//     data: form
//   }));
//   setIsUpdate(true);
// } else {
//   dispatch(addWedding({
//     functionType,
//     data: form
//   }));
//   setIsUpdate(false);
// } setSaved(true)
//   }

//   const [isUpdate, setIsUpdate] = useState(false);

  
//   const totalSpent =
//   Number(form.venueFee || 0) +
//   Number(form.eventAmount || 0) +
//   Number(form.dressAmount || 0) +
//   Number(form.makeupFee || 0) +
//   Number(form.jewelleryAmount || 0);
  
// const remainingAmount =   Number(form.totalBudget || 0) - totalSpent;

// const handleReset = () => {
//   dispatch(deleteWedding(functionType));
//   setForm(
//     {
//     date: "",
//     time: "",

//     venueSelected: "no",
//     venueArea : "",
//     venueFee : "",

//     totalBudget: "",
//     spentAmount: "",

//     event: "no",
//     eventname: "",
//     eventAmount: "",

//     dressSelected: "no",
//     dressType: "",
//     dressFrom: "",
//     dressAmount: "",

//     makeupBooked: "no",
//     makeupArtist: "",
//     makeupFee: "",

//     jewelleryReady: "no",
//     jewelleryFrom: "",
//     jewelleryAmount: "",

//     selfCareNotes: ""
//     }
//   )
//   setSaved(false)
// }


//   return (
//     <div className="p-6 flex flex-col items-center justify-center bg-pink-200 min-h-screen gap-4">
//       <h2 className="font-sans text-pink-600 text-2xl font-bold mb-4">
//         MY WEDDING PLANNER 💍
//       </h2>
//       <select
//   value={functionType}
//   onChange={(e) => setFunctionType(e.target.value)}
//   className="bg-slate-200 rounded-md p-2"
// >
//   <option value="wedding">Wedding Day</option>
//   <option value="mehendi">Mehendi Night</option>
//   <option value="haldi">Haldi</option>
// </select>

// <div>
//       {/* BASIC DETAILS */}
//       <label className="font-semibold text-lg text-pink-600 mt-4">Date : </label>
//       <input className="bg-slate-200 rounded-md p-2" type="date" value={form.date}
//         onChange={e => setForm({ ...form, date: e.target.value })} />
//         </div>
//               {/* BUDGET */}
              
// <h3 className="font-semibold text-lg text-pink-600 mt-4">
//   BUDGET DETAILS
// </h3>

// <input
// value={form.totalBudget}
//   className="bg-slate-200 rounded-md p-2"
//   placeholder="Total Budget"
//   type="number"
//   onChange={e => setForm({ ...form, totalBudget: e.target.value })}
// />
// <div>
//       {/* VENUE DETAILS */}
//       <label className="font-semibold text-lg text-pink-600 mt-4"> Venue Confirmed ? </label>
//       <select value={form.venueSelected} className="bg-slate-200 rounded-md p-2"
//         onChange={e => setForm({ ...form, venueSelected: e.target.value })}>
//         <option value="no">No</option>
//         <option value="yes">Yes</option>
//       </select> </div>
//       {form.venueSelected === "yes" && (
//         <>
//           <input value={form.venueArea} className="bg-slate-200 rounded-md p-2" placeholder="Venue Area" 
//             onChange={e => setForm({ ...form, venueArea: e.target.value })} />
//           <input value={form.venueFee} className="bg-slate-200 rounded-md p-2" placeholder="Venue Amount"
//             onChange={e => setForm({ ...form, venueFee: e.target.value })} />
//         </>
//       )}


//       {/* EVENT */} <div>
//       <label className="font-semibold text-lg text-pink-600 mt-4"> Event & Decoration Arranged ? </label>
//       <select value={form.event} className="bg-slate-200 rounded-md p-2"
//         onChange={e => setForm({ ...form, event: e.target.value })}>
//         <option value="no">No</option>
//         <option value="yes">Yes</option>
//       </select></div>
//       {form.event === "yes" && (
//         <>
//           <input value={form.eventname} className="bg-slate-200 rounded-md p-2" placeholder="Event team"
//             onChange={e => setForm({ ...form, eventname: e.target.value })} />
//           <input value={form.eventAmount} className="bg-slate-200 rounded-md p-2" placeholder="Event Fees"
//             onChange={e => setForm({ ...form, eventAmount: e.target.value })} />
//         </>
//       )}
      
//       {/* DRESS */} <div>
//       <label className="font-semibold text-lg text-pink-600 mt-4"> Wedding Dress Selected ? </label>
//       <select value={form.dressSelected} className="bg-slate-200 rounded-md p-2"
//         onChange={e => setForm({ ...form, dressSelected: e.target.value })}>
//         <option value="no">No</option>
//         <option value="yes">Yes</option>
//       </select> </div>

//       {form.dressSelected === "yes" && (
//         <>
//           <input value={form.dressType} className="bg-slate-200 rounded-md p-2" placeholder="Dress Type"
//             onChange={e => setForm({ ...form, dressType: e.target.value })} />
//           <input value={form.dressFrom} className="bg-slate-200 rounded-md p-2" placeholder="Dress From"
//             onChange={e => setForm({ ...form, dressFrom: e.target.value })} />
//           <input value={form.dressAmount} className="bg-slate-200 rounded-md p-2" placeholder="Dress Amount"
//             onChange={e => setForm({ ...form, dressAmount: e.target.value })} />
//         </>
//       )}

//       {/* MAKEUP */} <div>
//       <label className="font-semibold text-lg text-pink-600 mt-4"> Makeup Artist Booked ? </label>
//       <select value={form.makeupBooked} className="bg-slate-200 rounded-md p-2"
//         onChange={e => setForm({ ...form, makeupBooked: e.target.value })}>
//         <option value="no">No</option>
//         <option value="yes">Yes</option>
//       </select></div>

//       {form.makeupBooked === "yes" && (
//         <>
//           <input value={form.makeupArtist} className="bg-slate-200 rounded-md p-2" placeholder="Makeup Artist Name"
//             onChange={e => setForm({ ...form, makeupArtist: e.target.value })} />
//           <input value={form.makeupFee} className="bg-slate-200 rounded-md p-2" placeholder="Makeup Fees"
//             onChange={e => setForm({ ...form, makeupFee: e.target.value })} />
//         </>
//       )}

//       {/* JEWELLERY */} <div>
//       <label className="font-semibold text-lg text-pink-600 mt-4"> Jewellery Arranged ? </label>
//       <select value={form.jewelleryReady} className="bg-slate-200 rounded-md p-2"
//         onChange={e => setForm({ ...form, jewelleryReady: e.target.value })}>
//         <option value="no">No</option>
//         <option value="yes">Yes</option>
//       </select></div>

//       {form.jewelleryReady === "yes" && (
//         <>
//         <input value={form.jewelleryFrom} className="bg-slate-200 rounded-md p-2" placeholder="Jewellery From"
//           onChange={e => setForm({ ...form, jewelleryFrom: e.target.value })} />
//         <input value={form.jewelleryAmount} className="bg-slate-200 rounded-md p-2" placeholder="Jewellery Amount"
//             onChange={e => setForm({ ...form, jewelleryAmount: e.target.value })} />
//         </>
//       )}

//       {/* SELF CARE */}
//       <textarea
//       value={form.selfCareNotes}
//         className="bg-slate-200 rounded-md p-2"
//         placeholder="Self-care / Skin-care notes"
//         rows="5" cols='50'
//         onChange={e => setForm({ ...form, selfCareNotes: e.target.value })}
//       />
//       {/* BUDGET */}
// {/* <h3 className="font-semibold text-lg text-pink-600 mt-4">
//   Budget Details
// </h3>

// <input
// value={form.totalBudget}
//   className="bg-slate-200 rounded-md p-2"
//   placeholder="Total Budget"
//   type="number"
//   onChange={e => setForm({ ...form, totalBudget: e.target.value })}
// /> */}
// <label className="font-semibold text-lg text-pink-600 mt-4">AMOUNT SPENT</label>
// <input
//   value={totalSpent}
//   readOnly
//   className="bg-slate-200 rounded-md p-2"
//   type="number"
// />

// {/* AUTO CALCULATED */}
// <div className="bg-white rounded-md p-3 text-center shadow">
//   <p className="text-gray-600 text-sm">Amount Left to Pay</p>
//   <p className="text-xl font-bold text-green-600">
//       Remaining Budget: ₹ {remainingAmount}
//   </p>
// </div>

// {!form.date && (
//   <p className="text-red-600 text-sm">
//     Date is required ❗
//   </p>
// )}
//       <button
//       disabled={!form.date}
//       onClick={handleSubmit}
//         className="bg-pink-500 text-white px-6 py-2 rounded mt-3 hover:bg-pink-600"
//       >
//         {existingWedding?.date ? "UPDATE DETAILS" : "SAVE DETAILS"}
//       </button>

//       <button onClick={handleReset} className="bg-pink-500 text-white px-6 py-2 rounded mt-3 hover:bg-pink-600">
//         RESET
//       </button>

//       {saved && (
//         <p className="text-green-700 font-medium">
//           {isUpdate? "Wedding details updated successfully ✅"
//             : "Wedding details saved successfully ✅"}
//         </p>
//       )}
      
//     </div>
//   );
// }

// export default WeddingForm;