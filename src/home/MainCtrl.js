/**
 * File: src/home/MainCtrl.js
 * Description: The controller for the homepage of my site
 * Dependencies: getEntries, resolved in the routing
 *
 * @package gamma
 */

function MainCtrl (getEntries) {
    this.msg = "Hello!";
    this.entries = getEntries.data;
}

angular.module('gamma')
    .controller('MainCtrl', MainCtrl);
