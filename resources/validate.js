const Auth = require('../middlewares/Auth');

module.exports = {
    http_method: "get",
    route: "/validate",
    middleware: [Auth],
    handler: async (req, res) => {
        return res.json({...req.user})
    }
}