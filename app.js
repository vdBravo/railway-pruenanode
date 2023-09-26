const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

require('dotenv').config();

const port = process.env.PORT || 3000;

//Conexion a base de datos 

const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.sckejd7.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;



mongoose.connect(uri, 
    {useNewUrlParser: true, useUnifiedTopology: true}
)
    .then(() => console.log('Base de datos conectada'))
    .catch(err => console.log(err))

//Motor de plantillas

app.set('view engine', 'ejs');
app.set('viewa', __dirname + './views')

//Rutas

app.use(express.static(__dirname + "/public"));

//Rutas de la Api
app.use('/', require('./router/RutasW'));
app.use('/mascotas', require('./router/Mascotas'));

app.use('/', (req, res, next) => {
    res.status(404).render("404", {titulo: "404", descripcion: "Not Found"});
});

//FIN RUTAS

//Escucha del puerto

app.listen(port, () => {
    console.log('se esta escuchando el servicio en el puerto: ', port)
})