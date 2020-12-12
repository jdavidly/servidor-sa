const express = require("express");
const router = express.Router();
const conn = require('../conexion');

router.get('/categorias', (req, res) => {
    const sql = `SELECT * FROM categoria`;
    const query = conn.query(sql, (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

router.post('/addProduct', (req, res) => {
    console.log("agregando un producto")
    //console.log(req.body);
    //console.log(req.query);
    const { nombre, precio, cantidad, categoria, imagen, user } = req.body;
    console.log(nombre, precio, cantidad, categoria, imagen, user);
    let sql = `INSERT INTO producto (nombre, precio, cantidad, categoria, url, proveedor) VALUES ('${nombre}','${precio}','${cantidad}','${categoria}','${imagen}','${user}')`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.send({ auth: false });
        } else {
            console.log(results);
            res.send({ auth: true });
        }
    });
});

router.post('/proveedor', (req, res) => {
    const { user } = req.body;
    const sql = `select p.producto, p.nombre, p.precio, p.cantidad, p.categoria, p.url from user u, producto p
        where u.role = 0
        and u.id = '${user}'
        and u.id = p.proveedor;`;
    const query = conn.query(sql, (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

module.exports = router;