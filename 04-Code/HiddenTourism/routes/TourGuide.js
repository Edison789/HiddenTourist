const express = require('express');
const routes = express.Router();

//Register Place
routes.post('/tourGuideAdd', (req, res) => {
    const id = req.body.id
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('INSERT INTO tourguide (IDTOURGUIDE,FIRSTNAMETOURGUIDE,LASTNAMETOURGUIDE) VALUES (?,?,?)', [id,firstName,lastName], (err, rows) => {
            if (err) return res.send(err)
            res.redirect('/administratorGUI.html')
        })
    })
})

module.exports = routes;