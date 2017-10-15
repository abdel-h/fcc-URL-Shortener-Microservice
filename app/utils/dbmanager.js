var DBManager = function() {};

DBManager.prototype.insertOneDocument = function(db, collection, doc, callback) {
    db.collection(collection).insertOne(doc, function(err, res) {
        if(err) throw err;
        console.log('Inserted one document to ' + collection);
        callback();
    });
}
DBManager.prototype.getOneDocument = function(db, collection, doc, callback) {
    db.collection(collection).findOne(doc, function(err, res) {
        if(err) throw err;
        if(res)
            console.log('Grabbed one docment from ' + collection);
        callback(res);
    })
}

module.exports = new DBManager();