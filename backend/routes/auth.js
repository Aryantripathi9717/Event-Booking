import express from "express"
import { Router } from "express"
import {loginUser, registerUser, verifyOtp}  from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post('/register',registerUser);
authRouter.post('/login',loginUser);
authRouter.post('/verify-otp',verifyOtp)

export default authRouter