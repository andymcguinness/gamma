/**
 * File: Gruntfile.js
 * Description: Grunt taskrunner for the project
 * Dependencies: See package.json
 *
 * @package gamma
 */

module.exports = function(grunt) {
    /* === Initial Config === */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: '(function() {',
                footer: '})();'
            },
            dist: {
                src: ['src/app.js', 'src/**/*.js'],
                dest: 'dist/scripts.js'
            }
        },
        uglify: {
            build: {
                src: 'dist/scripts.js',
                dest: 'dist/scripts.min.js'
            }
        }
    });

    /* === Loading Plugins === */
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    /* === Register Tasks === */
    grunt.registerTask('default', ['uglify']);
};
