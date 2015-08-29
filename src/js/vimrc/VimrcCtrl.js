/**
 * File: src/vimrc/VimrcCtrl.js
 * Description: The controller for the vimrc page of my site
 * Dependencies: none
 *
 * @package gamma
 */

function VimrcCtrl () {
    this.msg = "Hello!";
}

angular.module('gamma')
    .controller('VimrcCtrl', VimrcCtrl);

