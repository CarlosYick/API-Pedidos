require("dotenv").config();

module.exports.Config = {
    port: process.env.PORT,
    mysqlHost: process.env.MYSQL_HOST,
    mysqlUser: process.env.MYSQL_USER,
    mysqlPassword: process.env.MYSQL_PASSWORD,
    mysqlDatabase: process.env.MYSQL_DATABASE,
    jwtSecret: process.env.JWT_SECRET,
};
