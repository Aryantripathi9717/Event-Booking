import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import { connectDB } from "./config/db.js"

const app = express()
dotenv.config()
app.use(cors())

const port = process.env.PORT || 5000

app.listen(port,()=>{
    connectDB()
    console.log(`Server has started at port ${port}`)
})