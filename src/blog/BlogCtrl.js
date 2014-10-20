/**
 * File: src/blog/BlogCtrl.js
 * Description: The controller for the blog functionality of my site
 * Dependencies: getPartial, resolved in the routing
 *
 * @package gamma
 */

function BlogCtrl (getPartial) {
    this.msg = "Hello!";
    this.partial = getPartial;
}

angular.module('gamma')
    .controller('BlogCtrl', BlogCtrl);
