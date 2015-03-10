/**
 * File: api.js
 * Description: Defines the API routes for my application
 * Dependencies: Mongoose
 *
 * @package gamma
 */

/* === Basic Setup === */
var Entry = require('../models/entry.js');

/* === API Handling === */
// GET /v1/entries
exports.getEntries = function(req, res) {
    Entry.find(function(err, entries) {
        if (err)
            res.send(err);
        
        res.json(entries);
    });
};

// GET /v1/entry
exports.getEntry = function(req, res) {
    Entry.findOne({slug: req.params.slug}, function(err, entry) {
        if (err)
            res.send(err);

        res.json(entry);
    });
};

// POST /v1/entries
exports.addEntry = function(req, res) {
    var entry = new Entry();

    entry.title = req.body.title;
    entry.slug = req.body.slug;
    entry.publishedDate = Date.now();

    entry.save(function(err, entry) {
        if (err)
            res.send(err);

        res.json({ message: 'Entry created!' });
    });
};
