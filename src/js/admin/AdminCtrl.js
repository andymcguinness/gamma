/**
 * File: src/admin/AdminCtrl.js
 * Description: The controller for the admin page of my site
 * Dependencies: None yet
 *
 * @package gamma
 */

function AdminCtrl (ResourceFcty) {
    this.entry = new (ResourceFcty('entries'));
    this.entries = ResourceFcty('entries').query();

    this.saveEntry = function() {
        this.entry.title = this.title;
        this.entry.date = this.date;
        this.entry.text = this.text;
        this.entry.images = []; 

        this.entry.$save();
    };
}

angular.module('gamma')
    .controller('AdminCtrl', AdminCtrl);

