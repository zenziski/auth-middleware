module.exports = {
    http_method: "post",
    route: "/login",
    middleware: [],
    handler: async (req, res) => {
        const jwt = require('jsonwebtoken')
        const bcrypt = require('bcrypt')
        const User = require('../models/User')
        const secret = process.env.JWT_SECRET

        console.log(req.body);
        const { username, password } = req.body

        if (!username || !password) return res.status(400).json({ message: "Necessário preencher todos os campos" })

        try {
            const user = await User.findOne({ username: username }).lean()
            if (!user) return res.status(404).json({ message: "Usuário não encontrado" })

            const checkPassword = await bcrypt.compare(password, user.password)
            if (!checkPassword) return res.status(422).json({ message: "Senha incorreta" })

            //cria o token de autenticação
            const token = jwt.sign({ username: user.username, access_level: user.access_level }, secret, { expiresIn: '12h' })

            return res.status(200).json({ token: token })
        } catch (error) {
            return res.json(error)
        }
    }
}