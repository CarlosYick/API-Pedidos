const express = require("express");
const createError = require("http-errors");

const { Response } = require("../common/response");

module.exports.IndexAPI = (app) => {
    const router = express.Router();

    router.get("/", (req, res) => {
        const menu = {
            orders: `http://${req.headers.host}/api/orders`,
            users: `http://${req.headers.host}/api/users`,
        }

        return Response.success(res, 200, "API Orders", menu);
    })

    app.use("/", router);
}

module.exports.NotFoundAPI = (app) => {
    const router = express.Router();

    router.all("*", (req, res) => {
        return Response.error(res, new createError.NotFound());
    });

    app.use("/", router);
}
