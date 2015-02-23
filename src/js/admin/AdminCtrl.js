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
        if (this.title != "" && this.date != "" && this.text != "") {
            this.entry.title = this.title;
            this.entry.date = this.date;
            this.entry.text = this.text;
            this.entry.images = []; 
            
            this.title = "";
            this.date = "";
            this.text = "";

            this.entry.$save();
            this.entries = ResourceFcty('entries').query();
        } else {
            if (this.title === "")
                this.error = "No title provided";
            else if (this.date === "")
                this.error = "No date provided";
            else
                this.error = "No text provided";
        }

    };
}

angular.module('gamma')
    .controller('AdminCtrl', AdminCtrl);

