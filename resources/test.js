const Auth = require("../middlewares/Auth")
const Permissions = require("../middlewares/Permissions")

module.exports = {
    http_method: "get",
    route: "/test",
    middleware: [Auth, Permissions(['user'])],
    handler: (req, res) => {
        res.json({ message: "Logou em uma página que necessita de autenticação", user: req?.user?.username, role: req.user.accessLevel })
    }
}