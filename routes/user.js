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
    const { email, password } = req.body;
    const sql = `SELECT * FROM User WHERE email='${email}' AND password='${password}'`;
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

router.post('/signinProvider', (req, res) => {
    const { name, email, password, password_repeated, address } = req.body;
    let sql = `INSERT INTO User (name, email, password, address, role) VALUES ('${name}','${email}','${password}','${address}',false)`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({ auth: false });
        } else {
            res.send({ auth: true });
        }
    });
});

module.exports = router;