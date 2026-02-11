import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addEvent,deleteEvent } from '../../redux/slice/timelineSlice'
import { useState } from 'react'
function Timeline() {
    const dispatch = useDispatch()
    const events = useSelector((state) => state.timeline.events)
    const [event,setEvent] = useState({
        name : "",
        date : "",
        venue : "",
        time : "",
        note : ""
    })

    const handleAdd = () => {
  // Trim values to avoid spaces-only input
  const name = event.name.trim();
  const venue = event.venue.trim();
  const note = event.note.trim();

  // 1️⃣ Event name validation
  if (!name) {
    alert("Event name is required");
    return;
  }

  if (name.length < 3) {
    alert("Event name must be at least 3 characters");
    return;
  }

  // 2️⃣ Date validation
  if (!event.date) {
    alert("Event date is required");
    return;
  }

  const selectedDate = new Date(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    alert("Event date cannot be in the past");
    return;
  }

  // 3️⃣ Venue validation (optional)
  if (venue && venue.length < 3) {
    alert("Venue name must be at least 3 characters");
    return;
  }

  // 4️⃣ Time validation (only if date is today)
  if (event.time) {
  const now = new Date();

  const [hours, minutes] = event.time.split(":");

  const eventDateTime = new Date(event.date);
  eventDateTime.setHours(hours, minutes, 0, 0);

  if (eventDateTime < now) {
    alert("Event date & time cannot be in the past");
    return;
  }
}


  // 5️⃣ Notes length validation
  if (note.length > 200) {
    alert("Notes cannot exceed 200 characters");
    return;
  }

  // ✅ All validations passed
  dispatch(addEvent({ ...event, name, venue, note }));

  // Reset form
  setEvent({
    name: "",
    date: "",
    venue: "",
    time: "",
    note: ""
  });
};

  return (
    <div className="bg-pink-200 min-h-screen p-6 flex justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg space-y-4">
        <h2 className="text-4xl font-extrabold text-pink-900 tracking-widest drop-shadow-md mb-6 text-center">
          WEDDING EVENTS 💐
        </h2>

        <input
          placeholder="Function Name"
          className="w-full p-2 border rounded"
          value={event.name}
          onChange={e => setEvent({ ...event, name: e.target.value })}
        />

        <input
          type="date"
          className="w-full p-2 border rounded"
          value={event.date}
          onChange={e => setEvent({ ...event, date: e.target.value })}
        />

        <input
          type="venue"
          className="w-full p-2 border rounded"
          placeholder='Venue'
          value={event.venue}
          onChange={e => setEvent({ ...event, venue: e.target.value })}
        />

        <input
          type="time"
          placeholder='time'
          className="w-full p-2 border rounded"
          value={event.time}
          onChange={e => setEvent({ ...event, time: e.target.value })}
        />

        <textarea
          placeholder="Notes (optional)"
          className="w-full p-2 border rounded"
          value={event.note}
          onChange={e => setEvent({ ...event, note: e.target.value })}
        />

        <button
          onClick={handleAdd}
          className="w-full bg-pink-500 text-white py-2 rounded"
        >
          Add Event
        </button>

        <hr />

        {events.length === 0 && (
          <p className="text-center text-gray-500">
            No events added yet
          </p>
        )}

        {[...events]
  .sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (a.time) {
      const [h, m] = a.time.split(":");
      dateA.setHours(h, m);
    }

    if (b.time) {
      const [h, m] = b.time.split(":");
      dateB.setHours(h, m);
    }

    return dateA - dateB;
  })
  .map((e, i) => (

          <div
            key={i}
            className="bg-pink-50 p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-xl text-pink-800">
                {e.name}
              </p>
              <p className="text-sm text-pink-600">
                {e.date} {e.time && `• ${e.time}`}
              </p>
              {e.venue && (
  <p className="font-semibold text-pink-600">
    Venue : {e.venue}
  </p>
)}

              {e.note && (
                <p className="text-sm text-pink-600">{e.note}</p>
              )}
            </div>

            <button
              onClick={() => dispatch(deleteEvent(i))}
              className="text-red-500"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline