const express = require("express");
const authenticateJWT = require('../middleware/auth');

const { OrdersController } = require('./controller');

const router = express.Router();

module.exports.OrdersAPI = (app) => {
    router
    .get("/", authenticateJWT, OrdersController.getAllByUserId) //http://localhost:3000/api/orders/
    .get("/:id/status", authenticateJWT, OrdersController.getOrderStatus)
    .post("/", authenticateJWT, OrdersController.createOrder)
    .put("/:id", authenticateJWT, OrdersController.updateOrder)
    .delete("/:id", authenticateJWT , OrdersController.deleteOrder);

    app.use("/api/orders", router);
}