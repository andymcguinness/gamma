/**
 * File: app/app.js
 * Description: Defining my Angular module && hooking in all the pieces
 * Dependencies: ui-router, ngResource
 *
 * @package gamma
 */

// wrapped in an IIFE for good vibes
(function () {
    /* === Module Definition === */
    angular
        .module('gamma', ['ui.router', 'ngResource'])   // initial module decl.
        .controller('MainCtrl', MainCtrl)               // test controller
        .config(Config);                                // config for routing, etc.
    
    /* === Test Main Controller */
    function MainCtrl () {
        this.msg = "Hello!";
    }

    /* === Initial Routing === */
    function Config ($stateProvider, $urlRouterProvider) {
        // if all else fails
        $urlRouterProvider.otherwise('/');

        // let's get it started in here
        $stateProvider

            // Home state
            .state('home', {
                url: '/',
                templateUrl: 'home/home.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            });
    }
})();
