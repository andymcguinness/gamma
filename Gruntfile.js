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
                src: ['src/js/app.js', 'src/js/**/*.js'],
                dest: 'dist/scripts.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dist/main.css': 'src/sass/main.scss' 
                }
            }
        },
        uglify: {
            build: {
                src: 'dist/scripts.js',
                dest: 'dist/scripts.min.js'
            }
        },
        watch: {
            scripts: {
                files: ['src/sass/*.scss', 'src/sass/*/*.scss'],
                tasks: ['sass']
            }
        }
    });

    /* === Loading Plugins === */
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    /* === Register Tasks === */
    grunt.registerTask('default', ['concat', 'sass', 'watch']);
    grunt.registerTask('deploy', ['concat', 'sass', 'uglify'])
};
