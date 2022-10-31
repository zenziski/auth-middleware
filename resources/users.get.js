const Auth = require('../middlewares/Auth');
const Permissions = require('../middlewares/Permissions');

module.exports = {
    http_method: "get",
    route: "/users",
    middleware: [Auth, Permissions(['admin'])],
    handler: async (req, res) => {
        const User = require('../models/User')
        try {
            const result = await User.find({}, { password: 0 });
            return res.json(result)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}