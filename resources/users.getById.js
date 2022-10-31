const Auth = require('../middlewares/Auth');
const Permissions = require('../middlewares/Permissions');

module.exports = {
    http_method: "get",
    route: "/user/:id",
    middleware: [Auth, Permissions(['admin'])],
    handler: async (req, res) => {
        const User = require('../models/User')
        const userId = req.params.id;
        if(!userId) return res.status(400).json({message: "ID não preenchido"});
        try {
            const result = await User.findOne({ _id: userId }, { password: 0 });
            if(!result) return res.status(404).json("Usuário não encontrado");
            return res.json(result)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}