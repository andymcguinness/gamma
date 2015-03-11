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

// GET /v1/entries/:slug
exports.getEntry = function(req, res) {
    Entry.findOne({slug: req.params.slug}, function(err, entry) {
        if (err)
            res.send(err);

        res.json(entry);
    });
};

// POST /v1/entries
exports.addEntry = function(req, res) {
    var entry = new Entry(),
        date = new Date();

    entry.title = req.body.title;
    entry.slug = req.body.slug;
    entry.publishedDate = date;

    entry.save(function(err, entry) {
        if (err)
            res.send(err);

        res.json({ message: 'Entry created!' });
    });
};

// PUT /v1/entries/:slug
exports.updateEntry = function(req, res) {
    Entry.findOne({slug: req.params.slug}, function(err, entry) {
        if (err)
            res.send(err);

        entry.title = req.body.title;
        entry.save();
        res.json({ message: 'Entry updated!' });
    });
};

// DELETE /v1/entries/:slug
exports.deleteEntry = function(req, res) {
    Entry.findOneAndRemove({slug: req.params.slug}, function(err, entry) {
        if (err)
            res.send(err);

        res.json({ message: 'Entry deleted!' });
    });
};
