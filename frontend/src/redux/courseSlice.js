import { createSlice } from "@reduxjs/toolkit"

const courseSlice=createSlice({
    name:"course",
    initialState:{
        creatorCourseData:[],
        courseData:[]
        
    },
    reducers:{
        setCreatorCourseData:(state,action)=>{
        state.creatorCourseData=action.payload
        },
        setCourseData:(state,action)=>{
            state.courseData=action.payload
        }
    }
})

export const { setCreatorCourseData, setCourseData } = courseSlice.actions;
export default courseSlice.reducer;