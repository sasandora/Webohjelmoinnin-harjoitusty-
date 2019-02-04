var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var expressValidator = require("express-validator");
var tyoController = require('./tyoController');
var hbs = require("express-handlebars");
var mysql = require('mysql');
var session = require('express-session');

//SQL-yhteys
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kiinteistohuolto'
});
connection.connect();

var app = express();

//Portti
var portVar = 3001;

//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//View engine
app.engine("html", hbs({ extname: "html"}));
app.set("view engine", "html");
app.set("views", path.join(__dirname, "sivut"));
app.use(express.static(__dirname + '/js'));


//Global vars
app.use(function (req, res, next) {
    res.locals.errors = null;
    next();
})

//Express validator
app.use(expressValidator());


/*******************
***** Reititys *****
********************/

//Tervehdys
app.get("/", function (req, res) {
    res.render("login", {
        message: "Tervehdys, netissä kulkija",
    });
})
//Käyttäjän luominen
app.post("/createUser", function (req, res) {
    tyoController.luoKayttaja(req, res);
})
//Käyttäjän käsittely
app.route("/kayttaja/")
    //Muokkaa käyttäjää
    .post(function (req, res) {
        tyoController.editUser(req, res);
    })
    //Hakee käyttäjän tiedot
    .get(function (req, res) {
        tyoController.getUser(req, res);
    })
//Tilauksen luominen
app.route("/tilaus/")
    //Luo tilauksen
    .post(function (req, res) {
        tyoController.teeTilaus(req, res, session);
    })
//Tilauksen käsittely
app.route("/tilaus/:id")
    //Muokkaa tilauksen
    .post(function (req, res) {
        tyoController.editTilaus(req, res);
    })
    //Hakee tilauksen
    .get(function (req, res) {
        tyoController.fetchTilaus(req, res);
    })
app.route("/tilaus/:id/:status")
    .post(function (req, res) {
        tyoController.updateTilaus(req, res);
    })

//Sisäänkirjautuminen
app.post("/login", function (req, res) {
    tyoController.login(req, res);
})
app.route('/kotisivu')
    .get(function (req, res) {
        console.log(req.body.loggedUserTaso);
        tyoController.fetchTyot(req, res);
    })
    .post(function (req, res) {

    })
//Uloskirjautuminen. Poistaa session käytöstä ja lähettää kirjautumis sivun selaimelle
app.get("/signout", function (req, res) {

    req.session.destroy();
    res.render("login", {
        message: "Kiitos käynnistä!"
    })
})
app.listen(portVar, function () {
    console.log("Server started at port " + portVar);
});