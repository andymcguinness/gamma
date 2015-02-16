/**
 * File: ResourceFcty.js
 * Description: Defines the catch-all interface to my API
 * Dependencies: $resource
 *
 * @package gamma
 */

/* === Function Declaration === */
function ResourceFcty ($resource) {
    return function (resourceName) {
        return $resource (
            '/v1/:resourceName/:id',
            {
                resourceName: resourceName,
                id: '@id'
            },
            {
                put: {
                    method: 'PUT'
                }
            }
        );
    };
}

/* === Factory Declaration === */
angular.module('gamma')
    .factory('ResourceFcty', ResourceFcty);
