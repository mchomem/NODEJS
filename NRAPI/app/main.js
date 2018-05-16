var express = require('express')
var bodyParser = require('body-parser')
var moment = require('./lib/moment.js')
var routes = require('./routes/routes.js')
var app = express()
var server = '192.168.0.65'
var port = 50010

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
    // Website you wish to allow to connect
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.setHeader('Access-Control-Allow-Origin', '*')
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)
    // Pass to next layer of middleware
    next()

});

routes(app)

var server = app.listen(port, server,  function () {
    console.log('[' + moment().format('DD[/]MM[/]YYYY HH[:]mm[:]ss') + ']: Server (' + server.address().address + ':' + server.address().port + ') running...')
});
