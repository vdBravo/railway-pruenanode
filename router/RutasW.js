const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index", {titulo: "titulo de views inicio  dinamico"});
});

router.get('/servicios', (req, res) => {
    res.render("servicios", {tituloServicios: "titulo de views servicios"});
});

module.exports = router;