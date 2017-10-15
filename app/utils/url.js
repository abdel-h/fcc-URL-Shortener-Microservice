"use strict"

let dbManager = require('./dbmanager.js'), 
    collection = 'urls';

module.exports = {
    insertShortUrl: function(db, original_url, callback) {
        let doc = {
            original_url: original_url, 
        };
        let short_url = Math.random().toString().substr(2, 8);
        doc.short_url = short_url;
        dbManager.getOneDocument(db, collection, {original_url: original_url}, function(res) {
            if(null === res) {
                dbManager.insertOneDocument(db, collection, doc, function() {
                    callback(doc);
                });
            } else {
                callback(res);
            }
        });
    },

    getShortUrl: function(db, id, callback) {
        dbManager.getOneDocument(db, collection, {short_url: id}, function(res) {
            if(null === res) {
                callback({error: 'This url is not on the database.'});
            } else {
                callback(res);
            }
        });
    }
}