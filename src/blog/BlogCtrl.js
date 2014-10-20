/* === Test Main Controller */
function BlogCtrl (getPartial) {
    this.msg = "Hello!";
    this.partial = getPartial;
}

angular.module('gamma')
    .controller('BlogCtrl', BlogCtrl);
