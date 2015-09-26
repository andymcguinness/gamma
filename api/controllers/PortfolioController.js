/**
 * PortfolioController
 *
 * @description :: Server-side logic for managing portfolios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  portfolio: function(req, res) {
    Portfolio.find().exec(function(err, items) {
      return res.view('portfolio/portfolio', {
        items: items
      });
    }); 
  },
  
  item: function(req, res) {
    Portfolio.findOne({slug: req.params['slug']}).exec(function(err, item) {
      return res.view('portfolio/item', {
        item: item
      });
    });
  }
};

