const express = require('express');
const routes = express.Router();

//login authentication

routes.get('/loged', (req, res) => {
    res.redirect('/administratorGUI.html');
});

routes.post('/login', (req, res) => {
    const user = req.body.user
    const passwrd = req.body.passwrd
    const query = `SELECT * FROM administrator WHERE USERADMINISTRATOR = ? AND PASSWORDADMINISTRATOR = ? `;
    req.getConnection((err, conn) => {
        conn.query(query, [user, passwrd], (err, rows, fields) => {
            if (err) throw err
            if (rows.length <= 0) {
                res.redirect('/login.html')
            } else {
                res.redirect('/loged');
            }
        })
    })
})

module.exports = routes;