var fs = require('fs')
var moment = require('../lib/moment.js')
const sql = require('mssql')


var appRouter = function (app) {

    var encode = 'utf8'
    var dataPath = './assets/data/'
    
    // #region services

    app.get('/', function(req, res) {
        fs.readFile('./view/home.html', encode, function(err, content) {
            content = content.replace('%datetime%', moment().format('DD[/]MM[/]YYYY HH[:]mm[:]ss'))
            content = content.replace(/%server%/g, req.hostname)
            content = content.replace(/%port%/g, 50010)
            res.status(200).send(content)
        });
    });

    app.get('/get-books', function(req, res) {
        fs.readFile(dataPath + 'books.json', encode, function(err, content) {
            res.status(200).send(content)
        });
    });

    app.get('/get-persons', function(req, res) {
        fs.readFile(dataPath + 'persons.json', encode, function(err, content) {
            res.status(200).send(content)
        });
    });

    app.get('/get-products', function(req, res) {
        fs.readFile(dataPath + 'products.json', encode, function(err, content) {
            res.status(200).send(content)
        });
    });

    app.get('/get-customers-with-sqlquery', function(req, res) {

        const connStr = "Server=localhost\\SQL2017;Database=DBNODEJS;User Id=sa;Password=conectt@2012;";

        sql.close()

        sql.connect(connStr)
            .then(conn => select())
            .catch(err => console.log('Falha: ' + err))

        function select() {
            new sql.Request().query('select * from Customer', (err, result) => {
                res.status(200).send(result)
            })
        }

    })

    app.get('/get-customers-with-sqlquery-v1', function(req, res) {

        // Connection string
        const config = "Server=localhost\\SQL2017;Database=Test;User Id=sa;Password=conectt@2012;";
        
        sql.close()

        sql.connect(config, err => {

            if(err) {
                res.status(200).send('Error:  ' + err.message + '<br><br>Stack: ' + err.stack)
                return
            }

            new sql.Request().query('select * from Customer', (err, result) => {
                res.status(200).send(result)
            })

        })

    })

    app.get('/get-customers-with-sqlquery-v2', function(req, res) {

        // Object to connect string
        const config = {
            user: 'sa'
            , password: 'conectt@2012'
            , server: 'localhost\\SQL2017'
            , database: 'DBNODEJS'
        }

        sql.close()

        sql.connect(config, err => {

            if(err) {
                res.status(200).send('Error:  ' + err.message + '<br><br>Stack: ' + err.stack)
                return
            }

            new sql.Request().query('select * from Customer', (err, result) => {
                res.status(200).send(result)
            })

        })

    })

    app.get('/get-customer-with-proc', function(req, res) {

        // Object to connect string
        const config = {
            user: 'sa'
            , password: 'conectt@2012'
            , server: 'localhost\\SQL2017'
            , database: 'DBNODEJS'
        }

        sql.close()

        sql.connect(config, err => {

            if(err) {
                res.status(200).send('Error:  ' + err.message + '<br><br>Stack: ' + err.stack)
                return
            }

            new sql.Request()
                .execute('PROC_CUSTOMER_SELECT', (err, result) => {
                    res.status(200).send(result)
                })

        })

    })

    // With paramether CustomerID
    app.get('/get-customer-with-proc/:id', function(req, res) {

        var costumerID = req.params.id

        // Object to connect string
        const config = {
            user: 'sa'
            , password: 'conectt@2012'
            , server: 'localhost\\SQL2017'
            , database: 'DBNODEJS'
        }

        sql.close()

        sql.connect(config, err => {

            if(err) {
                res.status(200).send('Error:  ' + err.message + '<br><br>Stack: ' + err.stack)
                return
            }

            new sql.Request()
                .input('CustomerID', sql.Int, costumerID)
                .execute('PROC_CUSTOMER_SELECT', (err, result) => {
                    
                    if(err) {
                        res.status(200).send(err.message)    
                        return
                    }
                    
                    res.status(200).send(result)
                })

        })

    })

    app.get('/npm-mssql', function(req, res) {

        res.redirect('https://www.npmjs.com/package/mssql')

    })

    // #endregion

}
  
module.exports = appRouter
