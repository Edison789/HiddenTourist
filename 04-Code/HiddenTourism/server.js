const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const morgan = require('morgan')
const myConnection = require('express-myconnection');
const bodyParser = require('body-parser')

var port = 3000;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/view/index.html');
});

//import routes
const touristRoutes = require('./routes/tourist.js');
const placeRoutes = require('./routes/Place.js')

//middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('short'))
app.use(myConnection(mysql,{
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345',
    database: 'hiddentourismnode'
},'single'));
app.use(express.json())

//routes
app.use('/',touristRoutes);
app.use('/',placeRoutes);

//static files 
app.use(express.static(path.join(__dirname,'view')));

app.listen(port);
console.log("Server is running in port: " + port);