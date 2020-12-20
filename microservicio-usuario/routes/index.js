const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Nueva versión con GKE-Ansible");
});

module.exports = router;