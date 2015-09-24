/**
 * File: src/about/AboutCtrl.js
 * Description: The controller for the about page of my site
 * Dependencies: none
 *
 * @package gamma
 */

function AboutCtrl () {
    this.msg = "Hello!";
}

angular.module('gamma')
    .controller('AboutCtrl', AboutCtrl);
