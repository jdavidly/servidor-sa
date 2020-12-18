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

router.get('/products', (req, res) => {
    const sql = `SELECT * FROM producto`;
    const query = conn.query(sql, (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

router.get('/products/:category', (req, res) => {
    const category = req.params['category'];
    const sql = `SELECT * FROM producto WHERE categoria=${category}`;
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
    const { nombre, precio, cantidad, categoria, imagen, user, descripcion } = req.body;
    console.log(nombre, precio, cantidad, categoria, imagen, user);
    let sql = `INSERT INTO producto (nombre, precio, cantidad, categoria, url, proveedor, descripcion) VALUES ('${nombre}','${precio}','${cantidad}','${categoria}','${imagen}','${user}','${descripcion}')`;
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

//Retorna los productos que perteneces a un proveedor
router.post('/proveedor', (req, res) => {
    const { user } = req.body;
    const sql = `select p.producto, p.nombre, p.precio, p.cantidad, p.categoria, p.url, p.descripcion from user u, producto p
        where u.user = '${user}'
        and u.user = p.proveedor;`;
    const query = conn.query(sql, (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

router.post('/delete', (req, res) => {
    const { producto } = req.body;
    
    const sql = `delete from producto where producto = '${producto}';`;
    const query = conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.send({ auth: false });
        } else {
            console.log(results);
            res.send({ auth: true });
        }
    });
});

router.post('/update-price', (req, res) => {
    const { producto, precio, cantidad } = req.body;
    const sql = `
        UPDATE producto
        SET precio = '${precio}', cantidad = '${cantidad}'
        WHERE producto = '${producto}';`;
        const query = conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.send({ auth: false });
        } else {
            console.log(results);
            res.send({ auth: true });
        }
    });
});

module.exports = router;