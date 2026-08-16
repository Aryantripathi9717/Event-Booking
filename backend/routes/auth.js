import express from "express"
import { Router } from "express"
import {registerUser}  from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post('/register',registerUser);
// router.post('/login',loginUser);
// router.post('/verify-otp',verifyOtp)

export default authRouter