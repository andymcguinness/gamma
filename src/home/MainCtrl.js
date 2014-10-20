/* === Test Main Controller */
function MainCtrl () {
    this.msg = "Hello!";
}

angular.module('gamma')
    .controller('MainCtrl', MainCtrl);
