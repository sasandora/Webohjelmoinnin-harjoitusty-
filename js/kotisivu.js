//Globaalit muuttujat
var IsAjaxExecuting = false;
var tilausID;

//Formatoidaan tietokannan päivämäärä Suomalaiseen muotoon
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('.');
}
//Palauttaa nykyisen päivän MYSQL ymmärrettävssä muodossa
function nykyinenDate() {
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = d.getFullYear() + '-' +
        (('' + month).length < 2 ? '0' : '') + month + '-' +
        (('' + day).length < 2 ? '0' : '') + day;

    return output;
}
function muokkaaStatusta(status, id) {
    let url;
    if (true) {
        url = "http://localhost:3001/" + "tilaus/" + id + "/" + status;
        paivitaStatus()
    }
    function paivitaStatus() {
        if (IsAjaxExecuting) return;
        IsAjaxExecuting = true;
        $.post(url)
            .done(function (data, status, error) {
                IsAjaxExecuting = false;
                console.log("Lähetys onnistui");
                haeTehtavat();
            })
            .fail(function (error) {
                console.log(error);
            })
    }
}

//Täyttää formin valmiilla tiedoilla muokkausta varten ja pistää muokkauksen menemään servulle
function muokkaaTilausta(id) {
    var urlinTeko = new Promise(function (resolve, reject) {
        url = "http://localhost:3001/" + "tilaus/" + id;
        resolve();
    })
    urlinTeko
        .then(function () {
            $.get(url)
                .done(function (data, status, error) {
                    console.log("Data käyty formiin\n:" + data.response[0]);
                    var i = 1;
                    //Täytetään text inputit
                    $("#tilausMuokTaulu input[type=text]").each(function () {
                        this.value = Object.values(data.response[0])[i];
                        i++;

                    });
                    $("#kuvausMuok").text(Object.values(data.response[0])[i]);
                })
                .fail(function (error) {
                    console.log(error);
                })
        })
    //Muokataa vanha tilaus
    $("#tyoMuokSub").click(function () {
        if (IsAjaxExecuting) return;
        IsAjaxExecuting = true;
        var lahetys = $("#tilausMuokFormi").serialize();

        console.log("Data lähtee \n" + lahetys);
        $.post(url, lahetys)
            .done(function (data, status, error) {
                IsAjaxExecuting = false;
                console.log("Lähetys onnistui" + error);
                $('#suljeMuokDialog').click();

                haeTehtavat();
            })
            .fail(function (error) {
                console.log(error);
            })
            .always(function () {
            })
    })
}
//Muokkaa tunnusta
function muokkaaTunnusta() {
    var urlinTeko = new Promise(function (resolve, reject) {
        url = "http://localhost:3001/" + "kayttaja/";
        resolve();
    })
    urlinTeko
        .then(function () {
            $.get(url)
                .done(function (data, status, error) {
                    console.log("Data käyty formiin\n:" + data.response[0]);
                    var i = 1;
                    //Täytetään text inputit
                    $("#kayttajaMuokTaulu input[type=text]").each(function () {
                        this.value = Object.values(data.response[0])[i];
                        i++;

                    });
                })
                .fail(function (error) {
                    console.log(error);
                })
        })
    //Muokataa vanha tilaus
    $("#kaytMuokSub").click(function () {
        if (IsAjaxExecuting) return;
        IsAjaxExecuting = true;
        var lahetys = $("#kayttajaMuokFormi").serialize();

        console.log("Data lähtee \n" + lahetys);
        $.post(url, lahetys)
            .done(function (data, status, error) {
                IsAjaxExecuting = false;
                console.log("Lähetys onnistui" + error);

                $('#suljeKaytMuokDialog').click();

                haeTehtavat();
            })
            .fail(function (error) {
                console.log(error);
            })
            .always(function () {
            })
    })
}

function haeTehtavat() {
    $.get("http://localhost:3001/kayttaja")
        .done(function (data, status, error) {
            haeTyot(data.response[0].taso, data.response[0].id)
        })
    function haeTyot(taso, kayttaja) {
        $.get("http://localhost:3001/kotisivu")
            .done(function (data, status, error) {
                //Tyhjennetään vanhat tiedot pois tauluista
                $("#tauluTilaus").children().remove();
                //$("#tauluTarjous").children().remove();

                //Luodaan taulu saadusta datasta
                var ylaRivi = "<tr><th>Työ</th><th>Tilaaja</th><th>Työnkuvaus</th><th>Tilauspäivä</th><th>Tila</th></tr>";
                $("#tauluTilaus").append(ylaRivi);
                for (var i = 0; i < data.response.length; i++) {
                    var tyo = data.response[i].tyo;
                    var tilaaja = data.response[i].tilaaja;
                    var kuvaus = data.response[i].kuvaus;
                    var id = data.response[i].id;
                    var status = data.response[i].STATUS;
                    var tilauspvm = data.response[i].tilauspvm;
                    var tilaajaID = data.response[i].tilaajaID;


                    tilauspvm = formatDate(tilauspvm);

                    //Luodaan rivin alku

                    //Tehdään riville napit statuksen ja käyttäjän tyypin mukaan
                    if (taso == 1 && kayttaja == tilaajaID) {
                        var rivi = "<tr><td>" + tyo + "</td><td>" + tilaaja + "</td><td>" + kuvaus + "</td><td>" + tilauspvm + "</td><td>" + status;
                        if (status == "tilattu" || status == "aloitettu" || status == "hyväksytty" || status == "hylätty" || status == "valmis") {
                            if (status == "tilattu") {
                                rivi += '<td><button onClick="muokkaaTilausta(' + id + ')" data-toggle="modal" data-target="#tilausMuokIkkuna" class="btn btn-primary">Muokkaa</button></td>' +
                                    '<td><button class="btn btn-danger">Poista</button></td>';
                            }
                            else if (status == "valmis") {
                                rivi += '<td><button onClick="muokkaaStatusta(' + "'hyväksytty'" + ',' + id + ')"  class="btn btn-primary">Hyväksy</button></td>';
                                rivi += '<td><button onClick="muokkaaStatusta(' + "'hylätty'" + ',' + id + ')"  class="btn btn-primary">Hylkää</button></td>';
                            }
                        }
                    }
                    else if (taso == 2) {
                        var rivi = "<tr><td>" + tyo + "</td><td>" + tilaaja + "</td><td>" + kuvaus + "</td><td>" + tilauspvm + "</td><td>" + status;
                        if (status == "tilattu") {
                            rivi += '<td><button onClick="muokkaaStatusta(' + "'aloitettu'" + ',' + id + ')" class="btn btn-primary">Aloita</button></td>';
                        }
                        else if (status == "aloitettu") {
                            rivi += '<td><button onClick="muokkaaStatusta(' + "'valmis'" + ',' + id + ')" class="btn btn-primary">Valmista</button></td>';
                        }
                    }
                    $("#tauluTilaus").append(rivi);
                }
            })
            .fail(function () {
                alert(error);
            })
    }
}
//Lähetetään uusi tilaus
$("#tyoTilSub").click(function () {
    if (IsAjaxExecuting) return;
    IsAjaxExecuting = true;

    var urlinTeko = new Promise(function (resolve, reject) {
        url = "http://localhost:3001/tilaus/";
        resolve();
    })
    urlinTeko
        .then(function () {
            var lahetys = $("#tilausFormi").serialize() + "&tilauspvm=" + nykyinenDate();

            console.log("Data lähtee \n" + lahetys);
            $.post(url, lahetys)
                .done(function (data, status, error) {
                    IsAjaxExecuting = false;
                    console.log("Lähetys onnistui" + error);
                    $('#suljeTilausDialog').click();

                    haeTehtavat();
                })
                .fail(function (error) {
                    console.log(error);
                })
                .always(function () {
                })
        })
})

$(document).ready(function () {
    haeTehtavat();
})
