const express = require("express");
const router = express.Router();
const conn = require('../conexion');

router.post('/add', (req, res) => {
    const { user, producto, cantidad } = req.body;
    let sql = `INSERT INTO Carrito (user, producto, cantidad) VALUES (${user},${producto},${cantidad})`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({ auth: false });
        } else {
            res.send({ auth: true });
        }
    });
});

module.exports = router;