/**
 * File: app/app.js
 * Description: Defining my Angular module && hooking in all the pieces
 * Dependencies: ui-router, ngResource
 *
 * @package gamma
 */

/* === Module Definition === */
angular
    .module('gamma', ['ui.router', 'ngResource'])   // initial module decl.
    .config(Config);                                // config for routing, etc.

/* === Initial Routing === */
function Config ($stateProvider, $urlRouterProvider) {
    // if all else fails
    $urlRouterProvider.otherwise('/');

    // let's get it started in here
    $stateProvider

        // Home state
        .state('home', {
            url: '/',
            templateUrl: 'views/home/home.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        });
}
