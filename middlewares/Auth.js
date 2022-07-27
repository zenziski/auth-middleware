const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const Auth = (req, res, next) =>{
    const token = req.cookies['login-token'] ? req.cookies['login-token'] : ""
    try {
        const data = jwt.verify(token, secret)
        req.user = data.username
        req.userAccessLevel = data.access_level
        next()
    } catch (error) {
        return res.status(400).json("Token inválido")
    }
    
}

module.exports = Auth