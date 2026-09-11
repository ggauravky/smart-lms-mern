import {configureStore} from"@reduxjs/toolkit"
import userSlice from "./userSlice"
import courseSlice from "./courseSlice"


export const store=configureStore({
    reducer:{
        user:userSlice,
        course:courseSlice

    }

})