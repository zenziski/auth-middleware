const Auth = require('../middlewares/Auth');
const Permissions = require('../middlewares/Permissions');

module.exports = {
    http_method: "delete",
    route: "/user/:id",
    middleware: [Auth, Permissions(['admin'])],
    handler: async (req, res) => {
        const User = require('../models/User');
        const userId = req.params.id;
        if (!userId) return res.status(400).json({ message: "Usuário não encontrado" });
        try {
            await User.deleteOne({ _id: userId });
            return res.json({ deleted: true });
        } catch (error) {
            return res.status(400).json({ deleted: false, error });
        }
    }
}