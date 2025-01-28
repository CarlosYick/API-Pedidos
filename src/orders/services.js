const db = require("../database/index");

const getAllByUserId = async (userId) => {
  return new Promise((resolve, reject) => {
      const query = "SELECT * FROM orders WHERE user_id = ?";
      db.query(query, [userId], (err, results) => {
          if (err) return reject(err);
          resolve(results);
      });
  });
};

const getAll = async () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM orders";
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getById = async (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM orders WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

const create = async (order) => {
  return new Promise((resolve, reject) => {
      const query = "INSERT INTO orders SET ?";
      db.query(query, order, (err, results) => {
          if (err) return reject(err);
          resolve(results.insertId);
      });
  });
};

const update = async (id, updateData) => {
  return new Promise((resolve, reject) => {
      const query = "UPDATE orders SET ? WHERE id = ?";
      db.query(query, [updateData, id], (err, results) => {
          if (err) return reject(err);
          resolve(results);
      });
  });
};

const deleteById = async (id) => { 
  return new Promise((resolve, reject) => {
      const query = "DELETE FROM orders WHERE id = ?";
      db.query(query, [id], (err, results) => {
          if (err) return reject(err);
          resolve(results);
      });
  });
};

const getStatusById = async (id) => {
  return new Promise((resolve, reject) => {
      const query = "SELECT status FROM orders WHERE id = ?";
      db.query(query, [id], (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
      });
  });
};

module.exports.OrdersService = {
  getAllByUserId,
  getAll,
  getById,
  create,
  update,
  deleteById,
  getStatusById,
  validate: (id) => !isNaN(id),
};
