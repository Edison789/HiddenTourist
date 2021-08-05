const express = require('express');
const routes = express.Router();

//login authentication

routes.get('/logedAdmin', (req, res) => {
    res.redirect('/administratorGUI.html');
});

routes.get('/logedUser',(req,res)=>{
    res.redirect('/userGUI.html');
})

routes.post('/login', (req, res) => {
    const user = req.body.user
    const passwrd = req.body.passwrd
    const type = req.body.fav_language
    if (type == 'Administrator') {
        const query = `SELECT * FROM administrator WHERE USERADMINISTRATOR = ? AND PASSWORDADMINISTRATOR = ? `;
        req.getConnection((err, conn) => {
            conn.query(query, [user, passwrd], (err, rows, fields) => {
                if (err) throw err
                if (rows.length <= 0) {
                    res.redirect('/login.html')
                } else {
                    res.redirect('/logedAdmin');
                }
            })
        })
    } else {
        const query = `SELECT * FROM tourist WHERE USERTOURIST = ? AND PASSWORDTOURIST = ? `;
        req.getConnection((err, conn) => {
            conn.query(query, [user, passwrd], (err, rows, fields) => {
                if (err) throw err
                if (rows.length <= 0) {
                    res.redirect('/login.html')
                } else {
                    res.redirect('/logedUser');
                }
            })
        })
    }

})

module.exports = routes;