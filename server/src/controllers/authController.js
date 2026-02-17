const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendEmail = require('../config/nodemailer')

exports.register = async (req, res) => {
    const { name, email, password, phone } = req.body
    if (!name || !email || !password || !phone) {
        return res.status(400).send({ success: false, message: "Invalid Fields" })
    }
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).send({ success: false, message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, email, password: hashedPassword, phone })
        await newUser.save()
        
        res.status(201).send({ success: true, message: "User registered successfully" })

        //sending the response before  welcome email to boost speed.

        const subject = `Welcome to WearItFashion ${newUser.name}`
        const html = `<div style="max-width:600px;margin:auto;padding:20px;
                    font-family:Arial;background:#f9f9f9;">
                    <h2 style="color:#2563eb;">Welcome to WeatItFashion</h2>
                    <p>Hello,${newUser.name}</p>
                    <p>Your account has been created successfully using:</p>
                    <p><strong>${newUser.email}</strong></p>
                    <hr/>
                    <p style="font-size:12px;color:#666;">
                    If you didn’t create this account, please ignore this email.
                    </p>
                </div>`

        await sendEmail({ to: newUser.email, subject: subject, html: html });

    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).send({ success: false, message: "Invalid Fileds" })
    }
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(401).send({ success: false, message: "User not found" })
        }
        const passwordCheck = await bcrypt.compare(password, existingUser.password)
        if (!passwordCheck) {
            return res.status(401).send({ success: false, message: "Invalid password" })
        }

        const token = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        });

        return res.status(200).send({
            success: true, message: "Successfully login", user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                phone: existingUser.phone,
                role: existingUser.role
            }
        })

    }
    catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }
}

exports.logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    })

    return res.status(200).send({ success: true, message: "Logged out successfully" })
}

exports.forgetPassword = async (req, res) => {
    const { email } = req.body
    if(!email){
        return res.status(400).send({success : false, message : "All fields are required"});
    }
    try {
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).send({success : true, message : "User doesn't exist"})
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.resetOtp = otp
        user.resetOtpExpiresAt = Date.now() + 15 * 60 * 1000 //15 min
        await user.save()

        const subject = "OTP for password reset"
        const html = `<div style="max-width:600px;margin:auto;padding:20px;
                    font-family:Arial;background:#f9f9f9;">
                    <h2 style="color:#2563eb;">Reset password OTP</h2>
                    <p>Hello,${user.name}</p>
                    <p>OTP to reset your account password is:</p>
                    <p><strong>${otp}</strong></p>
                    <hr/>
                    <p style="font-size:12px;color:#666;">
                        OTP is only valid for next 15 min.
                    </p>
                </div>`

        await sendEmail({
            to : user.email,
            subject,
            html
        })

        return res.status(200).send({success : true, message : "OTP sent to email"})

    }
    catch (error) {
        return res.status(500).send({success : false, message : error.message})
    }
}

exports.resetPassword = async (req, res) => {
    const { email, otp, password } = req.body
    if(!email || !otp || !password) {
        return res.status(400).send({success : false, message : "All fields are required"});
    }
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).send({success : false, message : "User not found"})
        }
        if(user.resetOtp === "" || user.resetOtp != otp){
            return res.status(400).send({success : false, message : "Invalid OTP"})
        }
        if(user.resetOtpExpiresAt < Date.now()){
            return res.status(400).send({success : false, message : "OTP expired"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpiresAt = 0;
        await user.save();

        return res.status(200).send({success : true, message : "Password changed successfully"});
    }
    catch (error) {
        return res.status(500).send({success : false, message : error.message});
    }
}

exports.getMe = async (req, res) => {
    res.status(200).send({
        success: true,
        user: req.user
    });
}