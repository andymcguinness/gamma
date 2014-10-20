/**
 * File: backend/routes/index.js
 * Description: This file defines the route for the main index.html file
 * Dependencies: none
 *
 * @package gamma
 */

exports.index = function(req, res) {
    res.sendfile('views/index.html');
};
