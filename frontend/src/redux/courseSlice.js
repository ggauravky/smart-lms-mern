import { createSlice } from "@reduxjs/toolkit"

const courseSlice=createSlice({
    name:"course",
    initialState:{
        creatorCourseData:[]
        
    },
    reducers:{
        setCreatorCourseData:(state,action)=>{
        state.creatorCourseData=action.payload
        }
    }
})

export const {setCreatorCourseData}=courseSlice.actions

export default courseSlice.reducer