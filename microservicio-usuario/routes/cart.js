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


router.post('/remove', (req, res) => {
    const { timestamp } = req.body;
    var valores = Object.values(timestamp);    
    let sql = `DELETE FROM carrito where codigo=${valores[0]} `;
    for(var i = 1; i < valores.length; i++)
    {
        sql = sql + ` OR codigo=${valores[i]}`;
    }
    console.log(sql);
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({ auth: false });
        } else {
            res.send({ auth: true });
        }
    });
});

router.post('/removeBeforePayment', (req, res) => {
    const { timestamp } = req.body;      
    let sql = `DELETE FROM carrito where codigo=${timestamp} `;
    console.log(sql);
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({ auth: false });
        } else {
            res.send({ auth: true });
        }
    });
});


router.get('/all/:user', (req,res)=>{
    const user = req.params['user'];    
    let sql = `select producto.nombre, producto.precio, carrito.cantidad, carrito.codigo from carrito
    inner join producto where carrito.producto = producto.producto and carrito.user=${user}`;    
    const query = conn.query(sql, (err, results) => {
        if (err) 
        {
            res.send([]);
        } else 
        {            
            res.send(results);
        }
    });    
});

module.exports = router;