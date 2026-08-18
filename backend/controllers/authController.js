import { User } from "../models/User.js";
import bcrypt from "bcryptjs"
import { sendOtpEmail } from "../utils/email.js";
import { OTP } from "../models/OTP.js";
import jwt from "jsonwebtoken"

const generateToken = (id,role) => {
    return jwt.sign({id,role}, process.env.JWT_SECRETE,{
        expiresIn : "7d"
    })
}

export const registerUser = async (req,res)=> {
    
    try {
        const {name,email,password} = req.body;
        let existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({error : "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            name,
            email,
            password : hashedPassword,
            role : 'user',
            isVerified : false
        })

        const otp = Math.floor(100000 + Math.random()*900000).toString();
        console.log(`otp for ${email} : ${otp}`);
        await OTP.create({email, otp, action : 'account_verification'})
        await sendOtpEmail(email,otp,'account_verification');


        res.status(201).json({
            message : "User registered successfully. Please check your email for OTP to verify your account.",
            email : newUser.email
        })        

    } catch (error) {
        res.status(402).json(error.message)
        
    }
}


export const loginUser = async (req,res)=>{

    let {email,password } = req.body;

    try {
        let existUser = await User.findOne({email})
        if(!existUser){
            return res.status(400).json({message : "User not Found"});
        }

        let verifyPassword = await bcrypt.compare(password,existUser.password)
        if(!verifyPassword){
            return res.status(400).json({message : "Incorrect Password"});
        }

        if(!user.isVerified && user.role === 'user'){
            const otp = Math.floor(100000 + Math.random()*900000).toString();
            await OTP.deleteMany({email,action : "account_verification"}) // Remove old OTPs
            await OTP.create({email, otp, action : 'account_verification'})
            await sendOtpEmail(email,otp,'account_verification'); 
            
            return res.status(400).json({
                error : "Account not Verified. A new OTP has been sent to your email."
            });
        }

        

        return res.status(200).
        json({
            message : "Login Succesfully" ,
            _id : existUser._id,
            name : existUser.name,
            email : existUser.email,
            role : existUser.role,
            token : generateToken(existUser._id, existUser.role)
            });
    } catch (error) {
        return res.status(401).json({message : "Login Error", error : error})
    }
}


export const verifyOtp = async (req,res)=>{
    const {email,otp} = req.body;

    try {
        const otpRecord = await OTP.findOne({email,otp,action : "account_verification"});
    
        if(!otpRecord){
            return res.status(400).json({error : 'Invalid or expired Otp'})
        }
    
        const existUser = await User.findOneAndUpdate({email},{isVerified : true});
        await OTP.deleteMany({email,action:'account_verification'});
        res.json({
            message : "Account verified successfully. You can log in now.",
            _id : existUser._id,
            name : existUser.name,
            email : existUser.email,
            role : existUser.role,
            token : generateToken(existUser._id, existUser.role)
        });
    } catch (error) {
        
    }
}