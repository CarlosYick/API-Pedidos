const express = require("express");

const { UsersController } = require('./controller');

const router = express.Router();

module.exports.UsersAPI = (app) => {
    router
    .post("/register", UsersController.register) //http://localhost:3000/api/users/register
    .post("/login", UsersController.login); //http://localhost:3000/api/users/login

    app.use("/api/users", router);
}