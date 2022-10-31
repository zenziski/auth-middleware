//Express e middlewares
const express = require('express');
const app = express();

app.use(express.json());

const rootPath = './resources';

const loader = require('./config');

const routes = loader(rootPath);

routes.forEach(i => {
    let {
        http_method,
        route,
        handler,
        middleware
    } = require(i)
    app[http_method](route, ...middleware, handler);
})

module.exports = app;