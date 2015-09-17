/**
 * File: src/about/AboutCtrl.js
 * Description: The controller for the about page of my site
 * Dependencies: none
 *
 * @package gamma
 */

function ContactCtrl () {
    this.msg = "Hello!";
}

angular.module('gamma')
    .controller('ContactCtrl', ContactCtrl);
