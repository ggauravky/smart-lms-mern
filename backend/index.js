import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './route/authRoute.js';
import userRouter from './route/userRoute.js';
import courseRouter from './route/courseRoute.js';
import cors from 'cors';
dotenv.config();


const port=process.env.PORT
const app= express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

 

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/course',courseRouter)

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    connectDB()
})