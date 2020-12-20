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
    console.log("en login");
    const { email, password } = req.body;
    const sql = `SELECT * FROM usuario WHERE correo='${email}' AND pass='${password}'`;
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

router.post('/loginp', (req, res) => {
    const { correo, pass } = req.body;
    const sql = `SELECT * FROM Usuario WHERE correo='${correo}' AND pass='${pass}'`;
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

router.post('/signinClientp', (req, res) => {
    const { nombres, nit, edad, correo, pass, telefono } = req.body;
    let sql = `call nuevo_usuario('${nombres}','${nit}',${edad},'${correo}','${telefono}',0,'','${pass}')`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({ auth: false });
        } else {
            res.send({ auth: true });
        }
    });
});

router.post('/signinProvider', (req, res) => {
    const { nombres, nit, correo, pass, direccion } = req.body;
    let sql = `call nuevo_usuario('${nombres}','${nit}',0,'${correo}','',1,'${direccion}','${pass}')`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({ auth: false });
        } else {
            res.send({ auth: true });
        }
    });
});

module.exports = router;