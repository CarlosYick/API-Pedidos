const createError = require('http-errors');
const debug = require("debug")("app:module-orders-controller");

const { OrdersService } = require("./services");
const { Response } = require('../common/response');

module.exports.OrdersController = {
    getOrders: async (req,res) => {
        try {
            let orders = await OrdersService.getAll();
            return Response.success(res, 200, 'Lista de ordenes', orders);
        } catch (error){
            debug (error);
            return Response.error(res);
        }
    },
    getAllByUserId: async (req, res) => {
        try {
            const userId = req.user.id;
            let orders = await OrdersService.getAllByUserId(userId);
            return Response.success(res, 200, 'List of orders', orders);
        } catch (error) {
            debug(error);
            return Response.error(res);
        }
    },
    createOrder: async (req, res) => {
        try {
            const { body } = req;
            const userId = req.user.id;

            // Validación de los campos necesarios
            if (!body || Object.keys(body).length === 0) {
                debug(body);
                return Response.error(res, new createError.BadRequest("Invalid data: Body is empty"));
            }

            const { product, amount, status } = body;

            // Validar que todos los campos requeridos están presentes
            if (!product || !amount || !status) {
                return Response.error(res, new createError.BadRequest("Invalid data: Missing required fields"));
            }

            // Validar que los valores son del tipo correcto y válidos
            if (typeof product !== 'string' || typeof amount !== 'number' || typeof status !== 'string') {
                return Response.error(res, new createError.BadRequest("Invalid data: Fields must be of correct type"));
            }

            if (amount <= 0) {
                return Response.error(res, new createError.BadRequest("Invalid data: Amount must be greater than zero"));
            }

            const validStatuses = ["En preparación", "En camino", "Entregado"];
            if (!validStatuses.includes(status)) {
                return Response.error(res, new createError.BadRequest("Invalid data: Invalid status value"));
            }

            const orderData = { ...body, user_id: userId }; // Añadir el user_id al pedido
            await OrdersService.create(orderData);
            return Response.success(res, 201, 'Order created', { orderData });
        } catch (error) {
            debug(error);
            return Response.error(res, new createError.InternalServerError(error.message));
        }
    },

    updateOrder: async (req, res) => {
        try {
            const { params: { id } } = req;
            const userId = req.user.id; // Obtener el ID del usuario autenticado

            // Validación del ID del pedido
            if (!OrdersService.validate(id)) {
                return Response.error(res, new createError.BadRequest("Invalid ID"));
            }

            // Obtener el pedido y verificar su existencia
            let order = await OrdersService.getById(id);
            if (!order) {
                return Response.error(res, new createError.NotFound("Order not found"));
            }

            // Verificar que el usuario autenticado es el propietario del pedido
            if (order.user_id !== userId) {
                return Response.error(res, new createError.Forbidden("You are not authorized to update this order"));
            }

            const { body } = req;

            // Validación del cuerpo de la solicitud
            if (!body || Object.keys(body).length === 0) {
                return Response.error(res, new createError.BadRequest("Invalid data: Body is empty"));
            }

            const { product, amount, status } = body;

            // Validar que todos los campos requeridos están presentes
            if (!product || !amount || !status) {
                return Response.error(res, new createError.BadRequest("Invalid data: Missing required fields"));
            }

            // Validar que los valores son del tipo correcto y válidos
            if (typeof product !== 'string' || typeof amount !== 'number' || typeof status !== 'string') {
                return Response.error(res, new createError.BadRequest("Invalid data: Fields must be of correct type"));
            }

            if (amount <= 0) {
                return Response.error(res, new createError.BadRequest("Invalid data: Amount must be greater than zero"));
            }

            const validStatuses = ["En preparacion", "listo", "Entregado"];
            if (!validStatuses.includes(status)) {
                return Response.error(res, new createError.BadRequest("Invalid data: Invalid status value"));
            }

            await OrdersService.update(id, body);
            return Response.success(res, 200, 'Order updated', body);
        } catch (error) {
            debug(error);
            return Response.error(res, new createError.InternalServerError(error.message));
        }
    },

    deleteOrder: async (req, res) => {
        try {
            const { params: { id } } = req;
            const userId = req.user.id; // Obtener el ID del usuario autenticado
    
            if (!OrdersService.validate(id)) {
                return Response.error(res, new createError.BadRequest("Invalid ID"));
            }
            let order = await OrdersService.getById(id);
            if (!order) {
                return Response.error(res, new createError.NotFound());
            }
            if (order.user_id !== userId) {
                return Response.error(res, new createError.Forbidden("You are not authorized to delete this order"));
            }
            await OrdersService.deleteById(id);
            return Response.success(res, 200, 'Order deleted', { id });
        } catch (error) {
            debug(error);
            return Response.error(res);
        }
    },

    getOrderStatus: async (req, res) => {
        try {
            const { params: { id } } = req;
            const userId = req.user.id; // Obtener el ID del usuario autenticado

            if (!OrdersService.validate(id)) {
                return Response.error(res, new createError.BadRequest("Invalid ID"));
            }
            let order = await OrdersService.getById(id);
            if (!order) {
                return Response.error(res, new createError.NotFound());
            }
            if (order.user_id !== userId) {
                return Response.error(res, new createError.Forbidden("You are not authorized to view the status of this order"));
            }
            let status = await OrdersService.getStatusById(id);
            return Response.success(res, 200, `Order ${id}`, status);
        } catch (error) {
            debug(error);
            return Response.error(res, new createError.InternalServerError(error.message));
        }
    },

};