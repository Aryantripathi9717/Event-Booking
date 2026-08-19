import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import { connectDB } from "./config/db.js"
import authRouter from "./routes/auth.js"
import dns from "dns"
import eventRouter from "./routes/event.route.js"
import bookingRouter from "./routes/booking.route.js"

dotenv.config()
const app = express()
app.use(cors());
app.use(express.json())


//routes
app.use('/api/auth',authRouter);
app.use('/api/events', eventRouter);
app.use('/api/bookings', bookingRouter)

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    connectDB()
    console.log(`Server has started at port ${port}`)
})