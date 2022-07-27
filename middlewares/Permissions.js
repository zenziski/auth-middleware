const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const Permissions = (permissions) =>{
    return (req, res, next) => {
        const access_level = req.userAccessLevel
        if(!(access_level == 'admin' || permissions.includes(access_level))) {
            return res.status(401).json({msg: "Você não tem permissão para acessar está página."})
        }
        next()
    }    
}

module.exports = Permissions