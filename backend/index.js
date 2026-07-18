import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
dotenv.config();

const port=process.env.PORT
const app= express();

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    connectDB()
})