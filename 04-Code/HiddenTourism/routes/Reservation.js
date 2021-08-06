const express = require('express');
const routes = express.Router();


//Reservation tourist
routes.post('/ReservationAdd', (req, res) => {
    const id = req.body.id
    const idTourist = req.body.idTourist
    const location = req.body.location
    const dateR = req.body.dateR
    var paymentMethod = req.body.paymentMethod

    if (Array.isArray(paymentMethod)) {

        paymentMethod = paymentMethod.join(",")
    }
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('INSERT INTO reservation (IDRESERVATION,IDTOURIST,LOCATIONRESERVATION,PAYMENTTYPERESERVATION,RESERVATIONDATERESERVATION) VALUES (?,?,?,?,?)', [id, idTourist, location, paymentMethod, dateR], (err, rows) => {
            if (err) return res.send(err)
            res.redirect('/userGUI.html')
        })
    })
})


routes.get('/viewReservation', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('SELECT * FROM reservation', (err, rows, fields) => {
            if (!err) {
                res.render('tableReservation.ejs', {
                    rows
                });
            } else {
                console.log(err);
            }
        });
    })
});

routes.get('/viewReservationUser', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('SELECT * FROM reservation', (err, rows, fields) => {
            if (!err) {
                res.render('tableUserReservation.ejs', {
                    rows
                });
            } else {
                console.log(err);
            }
        });
    })
});
module.exports = routes;
