const Permissions = (permissions) =>{
    return (req, res, next) => {
        const access_level = req.user.accessLevel;
        if(!(access_level == 'admin' || permissions.includes(access_level))) {
            return res.status(401).json({message: "Você não tem permissão para acessar está página."})
        }
        next()
    }    
}

module.exports = Permissions