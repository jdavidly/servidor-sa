const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send("hola user");
});

//validar informacion
//tener un procedimiento en la bd y enviar unicamente email y contra
//si existen, devolver ok:true, rol y datos del usuario
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'jorge@gmail.com') {
        res.send({
            ok: true,
            response: {
                rol: true,
                name: 'jorge'
            }
        });
    } else {
        res.send({
            ok: false
        });
    }
});

//validar informacion
//tener un procedimiento que verifique e inserte la informacion
//si inserto, devolver true
router.post('/signinClient', (req, res) => {
    const { first_name, last_name, email, password, password_repeated, phone_number } = req.body;
    res.send({
        ok: true
    });
});

router.post('/signinProvider', (req, res) => {
    const { first_name, last_name, email, password, password_repeated, phone_number } = req.body;
    res.send({
        ok: true
    });
});

module.exports = router;