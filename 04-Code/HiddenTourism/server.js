const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql')
const morgan = require('morgan')
const myConnection = require('express-myconnection')
const bodyParser = require('body-parser')
const flush = require('connect-flash')
const session = require('express-session')

var port = 3000;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

//import routes
const touristRoutes = require('./routes/tourist.js')
const placeRoutes = require('./routes/Place.js')
const restaurantRoutes = require('./routes/Restaurant')
const tourGuideRoutes = require('./routes/TourGuide.js')
const loginRoutes = require('./routes/Login.js')
const reservationRoutes = require('./routes/Reservation.js')
app.set('view engine', 'ejs');

//middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('short'))
app.use(myConnection(mysql, {
    port: 3306,
    user: 'bl6oIJpEZUARyGpI9ZgvzqxF0XjC1IUXXqPcgtkfVM8',
    password: 'nx17S00DZ9wz3gn9DvSKf2i5sAzuXla7kx68Va/8sPg',
    database: 'hwCVPSe56Qua3kgUlYmaRh8yEeZF0VzG2u8Ra5v4xzQ'
}, 'single'));
app.use(express.json())
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}))
app.use(flush())

//routes
app.use('/', touristRoutes)
app.use('/', placeRoutes)
app.use('/', restaurantRoutes)
app.use('/', tourGuideRoutes)
app.use('/', loginRoutes)
app.use('/', reservationRoutes)

//static files 
app.use(express.static(path.join(__dirname, 'views')));

app.listen(port);
console.log("Server is running in port: " + port);