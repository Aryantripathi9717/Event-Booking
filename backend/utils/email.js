import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    }
});

export const sendBookingEmail = async (userEmail,userName,eventTitle) => { 
    try {
        const mailOptions = {
            from : process.env.EMAIL_USER,
            to : userEmail,
            subject : `Booking Confirmed : ${eventTitle}`,
            html : `
            <h2>Hi ${userName}!</h2>
            <p>Your booking for the event <strong>${eventTitle}</strong> is successfully confirmed </p>
            <p>Thank you for choosing Evnetora.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to',userEmail);
        
    } catch (error) {
        console.error('Error sending email:',error);
        
    }
}

export const sendOtpEmail = async (email,Option,type) =>{
    try {

        const title = type === 'account_verification' ? 'Verfiy your Eventora Account' : 'Eventora Booking Verification'
        const msg = type === 'account_verification' ? 'please use the following OTP to verify your new Eventora account.' : 
        'Please use the following OTP to verify and confirm your event booking.';

        const mailOptions = {
            from : process.env.EMAIL_USER,
            to : email,
            subject : "Your OTP Code",
            html : `
                   <div style="text-align: center; padding: 20px;">
                        <p>${msg}</p>
                        <p style="padding: 10px; font-size: 24px; font-weight: bold; background: #f4f4f4; width: max-content; letter-spacing: 5px;
                            ">${otp}</p>
                        <p>This code expires in 5 minutes. If you didn't request this, please ignore this email.</p>
                    </div> 
            `
        };
    
        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${email} for ${type}`);
        
    } catch (error) {
        console.error(`Error sending OTP email to ${email} for ${type}:`,error)
    }
}
