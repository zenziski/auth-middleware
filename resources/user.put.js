const Auth = require('../middlewares/Auth');
const Permissions = require('../middlewares/Permissions');
const bcrypt = require('bcrypt');

module.exports = {
    http_method: "put",
    route: "/user/:id",
    middleware: [Auth, Permissions(['admin'])],
    handler: async (req, res) => {
        const User = require('../models/User');
        const userId = req.params.id;
        if (!userId) return res.status(400).json({ message: "Usuário não encontrado" });

        if (req.body.password) {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt);
            req.body.password = passwordHash;
        }
        try {
            await User.updateOne({ _id: userId }, {
                $set: {
                    ...req.body
                }
            });
            return res.json({ updated: true });
        } catch (error) {
            return res.status(400).json({ updated: false, error });
        }
    }
}