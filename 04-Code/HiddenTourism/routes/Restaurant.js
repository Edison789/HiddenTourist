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
});

//VIEW RESTAURANT
routes.get('/viewRestaurant', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('SELECT * FROM restaurant', (err, rows, fields) => {
            if (!err) {
                res.render('tableRestaurant.ejs', {
                    rows
                });
            } else {
                console.log(err);
            }
        });
    })
});

//delete restaurant
routes.post('/deleteRestaurant', (req, res) => {
    const id = req.body.id
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('DELETE FROM restaurant WHERE IDRESTAURANT=?',[id], (err, rows, fields) => {
            if (err) return res.send(err)
            res.redirect('./')
        });
    })
});

//UPDATE restaurant
routes.post('/updateRestaurant', (req, res) => {
    const id = req.body.id
    const nameR = req.body.nameR
    const address = req.body.address
    const openingTime = req.body.openingTime
    const closingTime =req.body.closingTime
    const foodType = req.body.foodType
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE restaurant SET NAMERESTAURANT=?, ADDRESSRESTAURANT=?, OPENINGTIMERESTAURANT=?, CLOSINGTIMERESTAURANT=?, CONSUMPTIONTYPERESTAURANT=? WHERE IDRESTAURANT=?', [nameR,address,openingTime,closingTime,foodType,id], (err, rows) => {
            if (err) return res.send(err)
            res.redirect('./')
        })
    })
});

//DELETE BY ID
routes.get('/deleteRestaurant/:id', (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        if(err) return res.send(err)
        conn.query('DELETE FROM restaurant WHERE IDRESTAURANT=?',[id], (err, rows, fields) => {
            if(err) return res.send(err)
            res.redirect(req.get('referer'));
        });
    });
});

module.exports = routes;
