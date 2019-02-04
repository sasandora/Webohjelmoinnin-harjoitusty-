var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kiinteistohuolto'
});

var sqlQuery;
var sessio;

function yhdistaTietokantaa(kysely, res) {

    console.log(kysely);

    connection.query(kysely, function (error, results, fields) {
        if (error) {
            console.log("Virhe haettaessa dataa, syy: " + error);
            res.json({ "status": 500, "error": error, "response": null });
        }
        else {
            console.log("Data: " + JSON.stringify(results));
            res.json({ "status": 100, "error": null, "response": results });
        }
    });
}

module.exports =
    {
        fetchTyot: function (req, res) {
            //let sqlQuery = "SELECT * FROM tehtava"
            let sqlQuery = "SELECT * FROM tehtavanakyma1"

            yhdistaTietokantaa(sqlQuery, res);

        },//fetchTyot
        teeTilaus: function (req, res) {
            sqlQuery = 'INSERT INTO tehtava (tyo, kuvaus, tilauspvm, tilaaja, status) VALUES ("' +
                req.body.tyo + '", "' +
                req.body.kuvaus + '", "' +
                req.body.tilauspvm + '", ' +
                sessio.numero + ', ' +
                '"tilattu"' + ');';
            yhdistaTietokantaa(sqlQuery, res);
        },//fetchTyot
        fetchTilaus: function (req, res) {
            sqlQuery = 'SELECT * FROM tehtavanakyma  ' +
                'WHERE id = ' + req.params.id + ';';
            yhdistaTietokantaa(sqlQuery, res);
        },//fetchTilaus
        editTilaus: function (req, res) {
            sqlQuery = 'UPDATE tehtava SET ' +
                ' tyo = "' + req.body.tyo + '", ' +
                ' kuvaus= "' + req.body.kuvaus + '" ' +
                //' status= "' + req.body.status + '" ' +
                ' WHERE id = ' + req.params.id + '  ' +
                ' ' + ';';

            yhdistaTietokantaa(sqlQuery, res);
        },//editTilaus
        updateTilaus: function (req, res) {
            sqlQuery = 'UPDATE tehtava SET ' +
                ' status= "' + req.params.status + '" ' +
                ' WHERE id = ' + req.params.id + '  ' +
                ' ' + ';';

            yhdistaTietokantaa(sqlQuery, res);
        },
        getUser: function (req, res) {
            let sqlQuery = "SELECT * FROM kayttaja WHERE id = " + sessio.numero;
            yhdistaTietokantaa(sqlQuery, res);
        },//getUser
        editUser: function (req, res) {
            let sqlQuery = "UPDATE kayttaja SET" +
            ' nimi = "' + req.body.nimi + '", ' +
            ' tunnus= "' + req.body.tunnus + '", ' +
            ' salasana= "' + req.body.salasana + '" ' +

            'WHERE id = ' + sessio.numero;
            yhdistaTietokantaa(sqlQuery, res);
        },//editUser
        luoKayttaja: function (req, res) {
            req.checkBody('newpassword', 'salasanan varmistaminen ei onnistunut').equals(req.body.repeatedpassword);

            var errors = req.validationErrors();
            if (errors) {
                console.log("Käyttäjän lisääminen ei onnistunut");
                res.json('Salasanan varmistaminen ei onnistunut');
            } else {
                sqlQuery = 'INSERT INTO kayttaja (tunnus, salasana, taso ,nimi) VALUES ("' +
                    req.body.newusername + '", "' +
                    req.body.newpassword + '", "' +
                    req.body.taso + '", "' +

                    req.body.newrealname + '" )';

                yhdistaTietokantaa(sqlQuery, res);
            }
        },//luoKayttaja
        login: function (req, res) {
            console.log("Kirjautuneen käyttäjän id:\n" + req.session.numero)
            if (req.session.numero != null)
                sqlQuery = 'SELECT * FROM kayttaja WHERE id = "' + req.session.numero + '"';
            /*Muuten otetaan data sisäänkirjautumisen bodystä */
            else
                sqlQuery = 'SELECT * FROM kayttaja WHERE tunnus = "' + req.body.username + '" AND salasana="' + req.body.password + '"';

            console.log("Sisäänkirjautuminen:\n " + sqlQuery);

            connection.query(sqlQuery, function (error, results, fields) {
                if (error) {
                    console.log("Virhe haettaessa dataa kayttaja-taulusta, syy: " + error);
                    res.render("login", {
                        message: "Kirjautuminen epäonnistui. Kysely tietokantaan epäonnistui.",
                        condition: false,
                    })
                }
                else if (results[0] == undefined) {
                    console.log("Käyttäjää ei löytynyt");
                    res.render("login", {
                        message: " Tunnusta ei löytynyt, tai salasana ei vastaa käyttäjää.",
                        condition: false,
                        data: results,

                    })
                }
                else {
                    console.log("Löydettiin käyttäjä:\n" + JSON.stringify(results));

                    res.statusCode = 200;

                    req.session.username = results[0].tunnus;
                    req.session.taso = results[0].taso;
                    req.session.numero = results[0].id;
                    req.session.password = results[0].salasana;
                    req.session.realname = results[0].nimi;
                    sessio = req.session;
                    console.log(sessio);
                    res.render("kotisivu", {
                        title: "Kirjautuminen onnistui",
                        condition: true,
                        data: results,
                        loggedUser: req.session.username,
                        loggedUserTaso: req.session.taso,

                    })
                }
            })
        }//login
    }//module
