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
            res.send({
                results: [],
                count: 0
            });
        } else {
            res.send({
                results,
                count: results.length
            });
        }
    });
});


const products = [];
for (let i = 0; i < 35; i++) {
    products.push({
        nombre: `nombre${i}`,
        precio: i + 5,
    });
}
const size = 12;
router.get('/page/:page', (req, res) => {
    const page = req.params['page'] - 1;
    res.send({
        pages: Math.ceil(products.length / size),
        products: products.slice(page * size, page * size + size)
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
    const sql = `select p.id_producto, p.nombre, p.precio_unitario, p.inventario, p.categoria, p.url_, p.descripcion from usuario u, producto p
        where u.id_usuario = '${user}'
        and u.id_usuario = p.usuario_id_usuario;`;
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