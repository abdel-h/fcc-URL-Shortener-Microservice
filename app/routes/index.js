"use strict"

let validurl = require('valid-url'),
    urlManager = require('../utils/url.js');

module.exports = function(app, db) {
    

    app.get('/', (req, res) => {
        res.send('This is the homepage');
    });


    app.get('/new/:url(*)', (req, res) => {
        let url = req.params.url;
        if(validurl.isUri(url)) {
            urlManager.insertShortUrl(db, url, function(results) {
                let shorturl = req.protocol + '://' + req.get('host') + "/" + results.short_url;
                res.json({
                    original_url: results.original_url,
                    short_url: shorturl
                });
            });
        } else {
            res.json({error: 'Wrong url format, make sure you have a valid protocol and real site.'});
        }
    });

    app.get('/:id', (req, res) => {
        let id = req.params.id;
        urlManager.getShortUrl(db, id, function(results) {
            if(results.error) {
                res.json(results);
            } else {
                res.redirect(results.original_url);
            }
        });
    });

}