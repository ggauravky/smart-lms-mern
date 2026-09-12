import { createSlice } from "@reduxjs/toolkit";

const lectureSlice = createSlice({
  name: "lecture",
  initialState: {
    creatorLectureData: [],
    lectureData: [],
  },
  reducers: {
    setCreatorLectureData: (state, action) => {
      state.creatorLectureData = action.payload;
    },
    setLectureData: (state, action) => {
      state.lectureData = action.payload;
    },
  },
});

export const { setCreatorLectureData, setLectureData } = lectureSlice.actions;
export default lectureSlice.reducer;
