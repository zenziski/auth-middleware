//Express and middlewares
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

//JWT Related
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

//Mongo Related
const User = require('./models/User')
const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

//Authentication and permission middlewares
const Auth = require('./middlewares/Auth')
const Permissions = require('./middlewares/Permissions')

app.use(express.json())
app.use(cookieParser())

const mongooseConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected to the database')
    } catch (error) {
        console.log(error)
    }
}
mongooseConnect()

app.post('/register', async (req, res) => {
    const { name, username, password, access_level } = req.body

    //check if these fields are not empty
    if (!name || !username || !password || !access_level) return res.status(400).json({ msg: "Necessário preencher todos os campos" })

    try {
        //generate the salt to encrypt the password
        const salt = await bcrypt.genSalt(12)
        //make a password hash
        const passwordHash = await bcrypt.hash(password, salt)
        const user = await User.create({ name, username, password: passwordHash, access_level })

        return res.json({ msg: "Usuário criado com sucesso!", user })
    } catch (error) {
        if (error.code == 11000) return res.json({ msg: "Já existe um usuário com esse login" })
        return res.json('ocorreu um erro')
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    //check if these fields are not empty
    if (!username || !password) return res.status(400).json({ msg: "Necessário preencher todos os campos" })

    try {
        //lookup for the user in the db
        const user = await User.findOne({ username: username }).lean()
        if (!user) return res.status(404).json({ msg: "Usuário não encontrado" })

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) return res.status(422).json({ msg: "Senha incorreta" })

        //create the auth token
        const token = jwt.sign({ username: user.username, access_level: user.access_level }, secret, { expiresIn: '12h' })

        //set the token to a cookie
        res.cookie('login-token', token, { maxAge: 1000 * 60 * 60 * 12 })
        return res.status(200).json({ msg: "Logado com sucesso", token: token })
    } catch (error) {
        return res.json(error)
    }
})

//Test route
app.get('/', Auth, Permissions(['admin', 'supervisor']), (req, res) => {
    res.json({ msg: "Logou em uma página que necessita de autenticação", user: req.user, role: req.userAccessLevel })
})

module.exports = app