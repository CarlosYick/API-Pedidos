const createError = require('http-errors');
const debug = require("debug")("app:module-users-controller");

const { UsersService } = require("./services");
const { Response } = require('../common/response');

module.exports.UsersController = {
    register: async (req, res) => {
        try {
            const { body } = req;
            
            // Validación de los campos necesarios
            if (!body || Object.keys(body).length === 0) {
                debug(body);
                return Response.error(res, new createError.BadRequest("Invalid data: Body is empty"));
            }
    
            const { name, email, password } = body;
    
            // Validar que todos los campos requeridos están presentes
            if (!name || !email || !password) {
                return Response.error(res, new createError.BadRequest("Invalid data: Missing required fields"));
            }
    
            // Validar que el email tiene un formato correcto
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return Response.error(res, new createError.BadRequest("Invalid data: Email format is incorrect"));
            }
    
            const userId = await UsersService.register(body);
            return Response.success(res, 201, 'Registered User', { userId });
        } catch (error) {
            debug(error);
            return Response.error(res, new createError.InternalServerError(error.message));
        }
    },
    
    login: async (req, res) => {
        try {
            const { body } = req;

            // Validación de los campos necesarios
            if (!body || Object.keys(body).length === 0) {
                debug(body);
                return Response.error(res, new createError.BadRequest("Invalid data: Body is empty"));
            }

            const { email, password } = body;

            // Validar que todos los campos requeridos están presentes
            if (!email || !password) {
                return Response.error(res, new createError.BadRequest("Invalid data: Missing required fields"));
            }

            // Validar que el email tiene un formato correcto
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return Response.error(res, new createError.BadRequest("Invalid data: Email format is incorrect"));
            }

            const { token, user } = await UsersService.login(email, password);
            return Response.success(res, 200, 'Successful login', { token, user });
        } catch (error) {
            debug(error);
            return Response.error(res, new createError.Unauthorized("Invalid credentials"));
        }
    },
};