/**
 * EntryController
 *
 * @description :: Server-side logic for managing entries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  homepage: function(req, res) {
    Entry.find().exec(function(err, entries) {
      return res.view('blog/homepage', {
        entries: entries
      });
    }); 
  },
  
  post: function(req, res) {
    Entry.findOne({slug: req.params['slug']}).exec(function(err, entry) {
      return res.view('blog/post', {
        entry: entry
      });
    });
  }
};

