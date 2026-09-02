import { createSlice } from "@reduxjs/toolkit"

const courseSlice=createSlice({
    name:"course",
    initialState:{
        creatorCourseData:null;
        courseData:null
        
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

export const {setCreatorCourseData}=courseSlice.actions
export const {setCourseData}=courseSlice.actions
export default courseSlice.reducer