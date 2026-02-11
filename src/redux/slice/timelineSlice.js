import { createSlice } from "@reduxjs/toolkit";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    events: []
  },
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(
        (_, index) => index !== action.payload
      );
    }
  }
});

export const { addEvent, deleteEvent } = timelineSlice.actions;
export default timelineSlice.reducer;
