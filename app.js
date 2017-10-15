let config = require('./config.json'),
    express = require('express'), 
    mongodb = require('mongodb'),
    routes = require('./app/routes/index'),
    MongoClient = mongodb.MongoClient,
    app = express();

let db;
MongoClient.connect(config.DB_URL, function(err, database) {
    if (err) throw err;
    console.log('Connected to the db');
    db = database;
    routes(app, db);
});



let port = process.env.PORT || 80;
app.listen(port, function() {
    console.log('Node.js is listening to ' + port + ' ...');
});
