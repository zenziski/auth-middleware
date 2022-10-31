require('dotenv').config()
const app = require('./server');
const mongoose = require('mongoose');
const port = process.env.SERVER_PORT

const mongooseConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error)
    }
}
mongooseConnect()

app.listen(port, ()=> console.log(`Server rodando na porta ${port}`))