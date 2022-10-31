module.exports = {
    http_method: "post",
    route: "/register",
    middleware: [],
    handler:
        async (req, res) => {
            const User = require('../models/User')
            const bcrypt = require('bcrypt')
            const { name, username, password, cpf } = req.body
            const DUPLICATE_ERROR_CODE = 11000;

            if (!name || !username || !password || !cpf) return res.status(400).json({ msg: "Necessário preencher todos os campos" })

            try {
                //gera o salt para criptografar senha
                const salt = await bcrypt.genSalt(12)
                //faz o hash da senha
                const passwordHash = await bcrypt.hash(password, salt)
                let user = await User.create({ name, username, password: passwordHash, cpf })
                user = user.toObject()
                delete user.password
                return res.json({ message: "Usuário criado com sucesso!", user })
            } catch (error) {
                console.log(error);
                if (error.code === DUPLICATE_ERROR_CODE) return res.status(400).json({ message: "Já existe um usuário com esse login" })
                return res.status(400).json('ocorreu um erro')
            }
        }
}