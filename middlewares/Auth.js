const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const Auth = (req, res, next) =>{
    let token = null;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0].toLocaleLowerCase() === 'bearer') 
        token = req.headers.authorization.split(' ')[1];
    try {
        const data = jwt.verify(token, secret)
        req.user = {
            username: data.username,
            accessLevel: data.access_level
        }
        next()
    } catch (error) {
        return res.status(400).json("Token inválido")
    }
    
}

module.exports = Auth