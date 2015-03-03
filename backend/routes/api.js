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

// POST /v1/entries
exports.addEntry = function(req, res) {
    var entry = new Entry();

    entry.title = req.body.title;
    entry.text = req.body.text;
    entry.slug = req.body.slug;

    if (req.body.publishedDate) {
        entry.publishedDate = req.body.publishedDate;
        entry.editedDate = Date.now();
    } else {
        entry.publishedDate = Date.now();
        entry.editedDate = null;
    }

    entry.save(function(err, entry) {
        if (err)
            res.send(err);

        res.json({ message: 'Entry created!' });
    });
};
