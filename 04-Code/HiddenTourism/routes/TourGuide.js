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

routes.get('/viewGuide', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('SELECT * FROM tourguide', (err, rows, fields) => {
            if (!err) {
                res.render('tableTourGuide.ejs', {
                    rows
                });
            } else {
                console.log(err);
            }
        });
    })
});

//delete tourguide
routes.post('/deleteTourguide', (req, res) => {
    const id = req.body.id
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('DELETE FROM tourguide WHERE IDTOURGUIDE=?',[id], (err, rows, fields) => {
            if (err) return res.send(err)
            res.redirect('./')
        });
    })
});

//UPDATE TOURGUIDE
routes.post('/updateTourguide', (req, res) => {
    const id = req.body.id
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE tourguide SET FIRSTNAMETOURGUIDE=?, LASTNAMETOURGUIDE=? WHERE IDTOURGUIDE=?', [firstName,lastName,id], (err, rows) => {
            if (err) return res.send(err)
            res.redirect('/viewGuide')
        })
    })
});

routes.get('/editTourGuide/:id', (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('SELECT * FROM tourguide WHERE IDTOURGUIDE= ?', [id], (err, rows, fields) => {
            if (err) return res.send(err)
            res.render('editTourGuide.ejs', {
                rows
            });
        });
    });
});

//DELETE BY ID
routes.get('/deleteTourguide/:id', (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        if(err) return res.send(err)
        conn.query('DELETE FROM tourguide WHERE IDTOURGUIDE=?',[id], (err, rows, fields) => {
            if(err) return res.send(err)
            res.redirect(req.get('referer'));
        });
    });
});

module.exports = routes;
