import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import { connectDB } from "./config/db.js"
import authRouter from "./routes/auth.js"
import dns from "dns"

dotenv.config()
const app = express()
app.use(cors());
app.use(express.json())

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

//routes
app.use('/api/auth',authRouter);

const port = process.env.PORT || 5000

app.listen(port,()=>{
    connectDB()
    console.log(`Server has started at port ${port}`)
})