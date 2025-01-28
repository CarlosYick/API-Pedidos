const createError = require("http-errors");

module.exports.Response = {
    //respuestas exitosas
    success: (res, status = 200, message = "Ok", body={}) => {
        res.status(status).json({ message, body });
    },
    //respuestas fallidas
    error: (res, error= null) => {
        const { statusCode, message } = error ? error : new createError.InternalServerError();
        res.status(statusCode).json({message});
    }
}