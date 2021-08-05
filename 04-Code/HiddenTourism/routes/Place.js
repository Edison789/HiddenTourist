const express = require('express');
const routes = express.Router();

//Register Place
routes.post('/placeAdd', (req, res) => {
    const id = req.body.id
    const nameP = req.body.nameP
    const province = req.body.province
    const canton = req.body.canton
    const address = req.body.address
    const contact =req.body.contact
    const activities = req.body.activities
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('INSERT INTO place (IDPLACE,NAMEPLACE,PROVINCEPLACE,CANTONPLACE,ADDRESSPLACE,CONTACTPLACE,ACTIVITIESPLACE) VALUES (?,?,?,?,?,?,?)', [id,nameP,province,canton,address,contact,activities], (err, rows) => {
            if (err) return res.send(err)
            res.redirect('/administratorGUI.html')
        })
    })
})

module.exports = routes;