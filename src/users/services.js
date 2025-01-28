const debug = require("debug")("app:module-users-services");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../database/index");
const { Config } = require("../config/index");

const saltRounds = 10;

const register = async (user) => {
    try {
        //hashear contraseña
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        const userWithHashedPassword = { ...user, password: hashedPassword };

        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users SET ?";
            db.query(query, userWithHashedPassword, (err, results) => {
                if (err) return reject(err);
                resolve(results.insertId);
            });
        });
    } catch (error) {
        throw new Error("Error hashing password: " + error.message);
    }
};

const login = async (email, password) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE email = ?";
        db.query(query, [email], async (err, results) => {
            if (err) return reject(err);
            const user = results[0];
            if (user && await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ id: user.id, email: user.email }, Config.jwtSecret, { expiresIn: '1h' });
                resolve({ token, user });
            } else {
                reject('Credenciales no válidas');
            }
        });
    });
};

module.exports.UsersService = {
    register,
    login,
};
