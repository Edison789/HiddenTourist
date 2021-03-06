const express = require('express');
const routes = express.Router();

//Register Tourist
routes.post('/touristAdd', (req, res) => {
    const id = req.body.id
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const passwrd = req.body.passwrd
    const user = req.body.user
    const email = req.body.email
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('INSERT INTO tourist (IDTOURIST,FIRSTNAMETOURIST,LASTNAMETOURIST,PASSWORDTOURIST,USERTOURIST,EMAILTOURIST) VALUES (?,?,?,?,?,?)', [id, firstName, lastName, passwrd, user, email], (err, rows) => {
            if (err) return res.send(err)
            res.redirect('./')
        })
    })
});

//VIEW TOURIST
routes.get('/viewTourist', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('SELECT * FROM tourist', (err, rows, fields) => {
            if (!err) {
                res.render('tableTourist.ejs', {
                    rows
                });
            } else {
                console.log(err);
            }
        });
    })
});

//UPDATE TOURIST
routes.post('/updateTourist', (req, res) => {
    const id = req.body.id
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const passwrd = req.body.passwrd
    const user = req.body.user
    const email = req.body.email
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE tourist SET FIRSTNAMETOURIST=?, LASTNAMETOURIST=?, PASSWORDTOURIST=?, USERTOURIST=?, EMAILTOURIST=? WHERE IDTOURIST=?', [firstName, lastName, passwrd, user, email, id], (err, rows) => {
            if (err) return res.send(err)
            res.redirect('/viewTourist')
        })
    })
});

routes.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('SELECT * FROM tourist WHERE IDTOURIST= ?', [id], (err, rows, fields) => {
            if (err) return res.send(err)
            res.render('editTourist.ejs', {
                rows
            });
        });
    });
});

//DELETE BY ID
routes.get('/deleteTourist/:id', (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('DELETE FROM tourist WHERE IDTOURIST=?', [id], (err, rows, fields) => {
            if (err) return res.send(err)
            res.redirect(req.get('referer'));
        });
    });
});


module.exports = routes;
