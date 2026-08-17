import { User } from "../models/User.js";
import bcrypt from "bcryptjs"

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
            password : hashedPassword
        })

        res.status(201).json({
            name,
            email,
            hashedPassword
        })

    } catch (error) {
        res.status(402).json(error.message)
        
    }
}