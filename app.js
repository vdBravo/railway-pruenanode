const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

//Motor de plantillas

app.set('view engine', 'ejs');
app.set('viewa', __dirname + './views')

//Rutas

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.render("index", {titulo: "titulo de views inicio  dinamico"});
});

app.get('/servicios', (req, res) => {
    res.render("servicios", {tituloServicios: "titulo de views servicios"});
});

app.use('/', (req, res, next) => {
    res.status(404).render("404", {titulo: "404", descripcion: "Not Found"});
});

//FIN RUTAS

//Escucha del puerto

app.listen(port, () => {
    console.log('se esta escuchando el servicio en el puerto: ', port)
})