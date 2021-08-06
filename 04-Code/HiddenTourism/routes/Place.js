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

//View Place
routes.get('/viewPlace', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('SELECT * FROM place', (err, rows, fields) => {
            if (!err) {
                res.render('tablePlaces.ejs', {
                    rows
                });
            } else {
                console.log(err);
            }
        });
    })
});

//delete place
routes.post('/deletePlace', (req, res) => {
    const id = req.body.id
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('DELETE FROM place WHERE IDPLACE=?',[id], (err, rows, fields) => {
            if (err) return res.send(err)
            res.redirect('./')
        });
    })
});

//UPDATE PLACE
routes.post('/updatePlace', (req, res) => {
    const id = req.body.id
    const nameP = req.body.nameP
    const province = req.body.province
    const canton = req.body.canton
    const address = req.body.address
    const contact =req.body.contact
    const activities = req.body.activities
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE place SET NAMEPLACE=?, PROVINCEPLACE=?, CANTONPLACE=?, ADDRESSPLACE=?, CONTACTPLACE=?, ACTIVITIESPLACE=? WHERE IDPLACE=?', [nameP,province,canton,address,contact,activities,id], (err, rows) => {
            if (err) return res.send(err)
            res.redirect('./')
        })
    })
});


//DELETE BY ID
routes.get('/deletePlace/:id', (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        if(err) return res.send(err)
        conn.query('DELETE FROM place WHERE IDPLACE=?',[id], (err, rows, fields) => {
            if(err) return res.send(err)
            res.redirect(req.get('referer'));
        });
    });
});

module.exports = routes;
