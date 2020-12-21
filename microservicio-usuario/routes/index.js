const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Nueva versión con GKE-Ansible 2020 Siguiente despliegue 20:10");
});

module.exports = router;