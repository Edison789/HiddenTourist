const express = require('express');
const routes = express.Router();


//Read tourist
routes.get('/read', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('SELECT * FROM tourist', (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })
})

//Register Tourist
routes.post('/touristAdd', (req, res) => {
    const id = req.body.id
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const location = req.body.location
    const dateR = req.body.dateR
    var paymentMethod = req.body.paymentMethod
    if(Array.isArray(paymentMethod)){

        paymentMethod = paymentMethod.join(",")
    }
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('INSERT INTO tourist (IdTourist,FirstName,LastName,Location,ResevationDate,PaymentType) VALUES (?,?,?,?,?,?)', [id,firstName,lastName,location,dateR,paymentMethod], (err, rows) => {
            if (err) return res.send(err)
            res.redirect('./')
        })
    })
})

module.exports = routes;