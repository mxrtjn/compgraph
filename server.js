var express    = require('express'),
    bodyParser = require('body-parser'),
    mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : '107.170.86.214',
    user     : 'videoserver',
    password : '3VEWXuOlqMneQpAm',
    database: 'kraken'
});

var app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get('/api/disasters/:year', function (req, res) {
    // connection.query("SELECT COUNTRY, LATITUDE, LONGITUDE, PRIMARY_MAGNITUDE, 1 AS TYPE FROM tsunami WHERE YEAR = " + req.params.year, function (err, result, fields) {
    connection.query("select * from  ((SELECT COUNTRY, LATITUDE, LONGITUDE, TOTAL_DEATHS ,TYPE,YEAR,color from tsunami ) union (SELECT COUNTRY, LATITUDE, LONGITUDE, TOTAL_DEATHS , TYPE,YEAR,color from volcan)) as T  where T.year = " + req.params.year, function (err, result, fields) {    
    if (err) 
            res.status(500).send(err);
        else{
            //console.log('fields: ', fields);
            res.send(result);
        }
    });    
});
app.get('/api/disaster/position/:year/:disasterType', function (req, res) {
    // connection.query("SELECT COUNTRY, LATITUDE, LONGITUDE, PRIMARY_MAGNITUDE, 1 AS TYPE FROM tsunami WHERE YEAR = " + req.params.year, function (err, result, fields) {
    if(req.params.disasterType == "1"){
        connection.query("SELECT COUNTRY, LATITUDE, LONGITUDE, TOTAL_DEATHS , TYPE,YEAR,color from tsunami where year >= " + req.params.year, function (err, result, fields) {    
            if (err) 
                res.status(500).send(err);
            else{
                //console.log('fields: ', fields);
                res.send(result);
            }
        });    
    }
    else{
        connection.query("SELECT COUNTRY, LATITUDE, LONGITUDE, TOTAL_DEATHS ,TYPE,YEAR,color from volcan where year >= " +  req.params.year, function (err, result, fields) {    
               if (err) 
                    res.status(500).send(err);
                else{
                    //console.log('fields: ', fields);
                    res.send(result);
                }
            });    
        }
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('conexion BD exitosa');
    app.listen(3000);
    console.log('Api server listening on port 3000');
});


