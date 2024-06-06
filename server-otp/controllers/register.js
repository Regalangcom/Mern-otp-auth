const dataUserUses = require('../model/users.js');
const randomize = require("randomatic");
const nodemailer = require("nodemailer");

const dotenv = require("dotenv");
dotenv.config();

const sendOtpEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                // uses key in to generate from gmail
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "OTP verification",
            text: `Your OTP is :  ${otp}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(info.response);
    } catch (error) {
        console.log(error.message);
    }
};

const loginWithOTP = async (req, res) => {
    const { email  , password } = req.body;
    console.log('Request Body:', req.body);

    try {
        
        const user = await dataUserUses.findOne({ email  , password});

        if (!user) {
            return res.status(404).json({ message: "User not found" , success : false   });
        }

        const generateOtp = randomize('0', 6);
      
        user.otp = generateOtp;
        await user.save();

       
        sendOtpEmail(email, generateOtp);

      return  res.status(200).json({ 
                            message: "OTP sent successfully"  ,
                            success : true
                        });
    } catch (error) {
        console.error("Error during OTP login:", error.message);
        return res.status(500).json({ message: "Error during OTP login" });
    }
};

const verifyOTP = async (req, res) => {
    const { otp } = req.body;

    try {
       
        const user = await dataUserUses.findOne({  otp  });

        if (!user) {
            return res.status(400).json({ message: "Invalid OTP" , success : false });
        }

        // Clear OTP field in user document
        user.otp = '';
        await user.save();

        return res.status(200).json({
                               message: "OTP verified successfully" ,
                               success : true });
    } catch (error) {
        console.error('Error during OTP verification:', error.message);
        return res.status(500).json({
            message: 'An error occurred during OTP verification'
        });
    }
};

module.exports = { loginWithOTP, verifyOTP };
