const express = require('express');
const router = express.Router();

const Mascota = require('../models/mascota');

router.get('/', async (req, res) => {
    try {

        const arrayMascotasDB = await Mascota.find();
        

        res.render("mascotas", {arrayMascotas : arrayMascotasDB});

    } catch (error) {
        console.log(error);
    }
})

router.get('/crear', (req, res) => {
    res.render('crear');
});

//Recibir informacion

router.post('/', async(req, res) => {
    const body = req.body
    console.log(body)

    try {
        //const mascotaDB = new Mascota(body) //Crea la mascota
        //await mascotaDB.save() //la guarda

        await Mascota.create(body) // crea y guarda

        res.redirect('/mascotas')
    } catch (error) {
        console.log(error)
    }
});

// Editar informacion 

router.get('/:id', async(req, res) => {
    const id = req.params.id
    try {
        const mascotaDB = await Mascota.findOne({ _id: id })
        console.log(mascotaDB)
        res.render('detalle', {
            mascota: mascotaDB,
            error: false
        })
    } catch (error) {
        console.log('erroooooooooorrr', error)
        res.render('detalle', {
            error: true,
            mensaje: 'No se encuentra el documento...'
        })
    }
})

// eliminar informacion

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {

        const mascotaDB = await Mascota.findByIdAndDelete({ _id: id });
        console.log(mascotaDB)

        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/mascotas')
        if (!mascotaDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'eliminado!'
            })
        }
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;