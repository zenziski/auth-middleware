require('dotenv').config()
const app = require('./server')
const serverPort = process.env.SERVER_PORT

app.listen(serverPort, ()=> console.log(`Server rodando em http://localhost:${serverPort}`))