const express = require('express');
const routes = express.Router();

//login authentication

routes.get('/logedAdmin', (_req, res) => {
    res.redirect('/administratorGUI.html');
});

routes.get('/logedUser',(_req,res)=>{
    res.redirect('/userGUI.html');
})

//Consulta de Usuarios Administradores y Clientes
function login(type, user, passwrd, _req, res) {
    const query = type === 'Administrator' ?
        `SELECT * FROM administrator WHERE USERADMINISTRATOR = ? AND PASSWORDADMINISTRATOR = ?` :
        `SELECT * FROM tourist WHERE USERTOURIST = ? AND PASSWORDTOURIST = ?`;
    _req.getConnection((err, conn) => {
        conn.query(query, [user, passwrd], (err, rows, _fields) => {
            if (err) handleError(err)
            if (rows.length <= 0) {
                res.redirect('/login.html')
            } else {
                res.redirect(type === 'Administrator' ? '/logedAdmin' : '/logedUser');
            }
        })
    })
}

//Analisis de error
function handleError(err){
    console.error(err);
    //agregar un mensaje de error al usuario
}

routes.post('/login', (_req, res) => {
    const user = _req.body.user
    const passwrd = _req.body.passwrd
    const type = _req.body.fav_language
    login(type,user,passwrd,_req,res)
})

module.exports = routes;