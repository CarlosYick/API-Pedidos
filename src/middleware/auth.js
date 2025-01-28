const jwt = require('jsonwebtoken');
const { Config } = require('../config/index');
const { Response } = require("../common/response");
const createError = require("http-errors");

//autenticar solicitud usando JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        //extraer token del header
        const token = authHeader.split(' ')[1];
        jwt.verify(token, Config.jwtSecret, (err, user) => {
            if (err) {
                return Response.error(res, new createError.Forbidden());
            }

            req.user = user;
            next();
        });
    } else {
        return Response.error(res, new createError.Unauthorized());
    }
};

module.exports = authenticateJWT;
