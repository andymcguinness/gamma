/**
 * File: entry.js
 * Description: Defines the Entry model
 * Dependencies: Mongoose
 *
 * @package gamma
 */

/* Basic Setup */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Creating Entry Schema */
var EntrySchema = new Schema ({
    title: String,
    publishedDate: Date,
    slug: String
});

/* Export Model */
module.exports = mongoose.model('Entry', EntrySchema);
