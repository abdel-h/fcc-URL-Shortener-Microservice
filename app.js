let express = require('express'), 
    mongodb = require('mongodb'),
    routes = require('./app/routes/index');
    MongoClient = mongodb.MongoClient;
    app = express();

let url = "mongodb://majidh:majidh123@ds113825.mlab.com:13825/urls", 
    db;
MongoClient.connect(url, function(err, database) {
    if (err) throw err;
    console.log('Connected to the db');
    db = database;
    routes(app, db);
});



let port = process.env.PORT || 80;
app.listen(port, function() {
    console.log('Node.js is listening to ' + port + ' ...');
});
