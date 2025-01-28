const express = require('express');
const debug = require('debug')("app:main");

const { Config } = require('./src/config/index');
const { OrdersAPI } = require("./src/orders/index");
const { UsersAPI } = require("./src/users/index");
const { IndexAPI, NotFoundAPI } = require("./src/index/index");
 
const app = express();

// manejo de body en solicitudes
app.use(express.json());

IndexAPI(app);
OrdersAPI(app);
UsersAPI(app);
NotFoundAPI(app);

app.listen(Config.port, ()=> {
    debug(`Servidor escuchando en el puerto ${Config.port}`)
})