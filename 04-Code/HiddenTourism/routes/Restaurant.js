const express = require('express');
const routes = express.Router();

//Register Place
routes.post('/restaurantAdd', (req, res) => {
    const id = req.body.id
    const nameR = req.body.nameR
    const address = req.body.address
    const openingTime = req.body.openingTime
    const closingTime =req.body.closingTime
    const foodType = req.body.foodType
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('INSERT INTO restaurant (IDRESTAURANT,NAMERESTAURANT,ADDRESSRESTAURANT,OPENINGTIMERESTAURANT,CLOSINGTIMERESTAURANT,CONSUMPTIONTYPERESTAURANT) VALUES (?,?,?,?,?,?)', [id,nameR,address,openingTime,closingTime,foodType], (err, rows) => {
            if (err) return res.send(err)
            res.redirect('/administratorGUI.html')
        })
    })
})

module.exports = routes;