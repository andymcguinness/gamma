/**
 * File: src/admin/AdminCtrl.js
 * Description: The controller for the admin page of my site
 * Dependencies: None yet
 *
 * @package gamma
 */

function AdminCtrl () {
    this.msg = "Hello!";
}

angular.module('gamma')
    .controller('AdminCtrl', AdminCtrl);

