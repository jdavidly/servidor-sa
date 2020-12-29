const express = require("express");
const router = express.Router();
const conn = require('../conexion');

router.get('/', (req, res) => {
    const sql = `SELECT * FROM User`;
    const query = conn.query(sql, (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

//validar informacion
//tener un procedimiento en la bd y enviar unicamente email y contra
router.post('/login', (req, res) => {
    const { email, contrasena } = req.body;
    const sql = `SELECT * FROM usuario WHERE email='${email}' AND contrasena='${contrasena}'`;
    console.log(sql);
    const query = conn.query(sql, (err, results) => {
        
        if (err) {
            res.send({ auth: false });
        } else {
            if (results.length === 1) {
                res.send({
                    auth: true,
                    result: results[0]
                });
            } else {
                res.send({ auth: false });
            }
        }
    });
});
/*El login se probo en postman con esta cadena --Eliu
{
    "email":"eder@usac.com",
    "contrasena":"SuperSegura"
}*/
router.post('/login-cliente', (req, res) => {
    const { email, contrasena } = req.body;
    const sql = `SELECT * FROM Usuario WHERE email='${email}' AND contrasena='${contrasena}'`;
    console.log(sql);
    const query = conn.query(sql, (err, results) => {
        if (err) {
            console.log(err)
            console.log("error1")
            res.send({ auth: false });
        } else {
            if (results.length === 1) {
                //console.log(results[0])
                res.send({
                    auth: true,
                    result: results[0]
                });
            } else {
                console.log("error2")
                res.send({ auth: false });
            }
        }
    });
});

//validar informacion
//tener un procedimiento que verifique e inserte la informacion
router.post('/signinClient', (req, res) => {
    const { first_name, last_name, email, password, password_repeated, phone_number } = req.body;
    let sql = `INSERT INTO User (first_name, last_name, email, password, phone_number, role) VALUES ('${first_name}','${last_name}','${email}','${password}','${phone_number}',true)`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({ auth: false });
        } else {
            res.send({ auth: true });
        }
    });
});

/*El registro se probo en postman con esta cadena --Eliu
{
    "nombre":"Eder",
    "apellido":"García",
    "email":"eder@usac.com",
    "contrasena":"SuperSegura",
    "celular":12345678
}*/
router.post('/registrar-cliente', (req, res) => {
    const { nombre, apellido, email, contrasena, celular } = req.body;
    let sql = `select nuevo_usuario('${nombre}','${apellido}','EsCliente','${email}','${contrasena}',${celular},'dirCliente',0)`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({ auth: false });
        } else {
            res.send({ auth: true });
        }
    });
});

router.post('/registrar-proveedor', (req, res) => {
    const { nombre, apellido, empresa, email, contrasena, direccion } = req.body;
    let sql = `select nuevo_usuario('${nombre}','${apellido}','${empresa}','${email}','${contrasena}',0,'${direccion}', 1)`;
    console.log("query "+sql);
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({ auth: false });
        } else {
            res.send({ auth: true });
        }
    });
});

module.exports = router;