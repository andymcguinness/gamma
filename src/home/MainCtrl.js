/* === Test Main Controller */
function MainCtrl (getEntries) {
    this.msg = "Hello!";
    this.entries = getEntries.data;
}

angular.module('gamma')
    .controller('MainCtrl', MainCtrl);
