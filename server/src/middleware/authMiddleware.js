const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token
    if(!token){
        return res.status(401).send({success : false, message : "Token expired login again"})
    }
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decode.id).select("-password")

        if(!user){
            return res.status(401).send({success: false, message : "Unauthorised : User not found"})
        }
        
        req.user = user;
        next();
    }
    catch(error) {
        return res.status(401).send({success : false, message : "Unauthorized: Invalid or expired token"})
    }
}
module.exports = authMiddleware;