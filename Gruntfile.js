/**
 * File: Gruntfile.js
 * Description: Grunt taskrunner for the project
 * Dependencies: See package.json
 *
 * @package gamma
 */

/* === Basic Variables === */
var yamlFront = require('yaml-front-matter');
var http = require('http');
var request = require('request');

/* === Setting Up Grunt === */
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
        mark_ya_db: {
            all: {
                files: [
                    {
                        src: 'src/md/*.md',
                        dest: 'dist/views/blog/entries/',
                    }
                ]
            }
        },
        markdown: {
            all: {
                files: [
                    {
                        expand: true,
                        src: 'src/md/*.md',
                        dest: 'dist/views/blog/entries/',
                        ext: '.html',
                        flatten: true
                    }
                ],
                options: {
                    template: 'src/html-template/template.html',
                    markdownOptions: {
                        gfm: true
                    },
                    preCompile: function(src, context) {
                        var result = yamlFront.loadFront(src);
                        return src = result.__content;
                    }
                }
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
                files: ['src/sass/*.scss', 'src/sass/*/*.scss', 'src/js/*.js', 'src/js/**/*.js'],
                tasks: ['sass', 'concat']
            }
        }
    });

    /* === Loading Plugins === */
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-newer');

    /* === Register Tasks === */
    grunt.registerTask('default', ['concat', 'sass', 'watch']);
    grunt.registerTask('deploy', ['concat', 'sass', 'uglify', 'newer:mark_ya_db']);
    grunt.registerMultiTask('mark_ya_db', 'Grunt plugin to read YAML frontmatter and insert data into a database via an API url.', function() {
        var done = this.async();
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            encoding: 'utf-8'
        });

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            var contents = grunt.file.read(f.src);
            var result = yamlFront.loadFront(contents);

            var req_options = {
                json: true,
                url: 'http://localhost:8080/v1/entry/' + result.slug,
                headers: {
                    'content-type': 'application/json'
                }
            };
            request.get(req_options, function (err, httpMessage, res) {
                if (err) {
                    console.log('Error: ' + err);
                    done();
                }
                else {
                    if (!res) {
                        request.post({url: 'http://localhost:8080/v1/entries', json: true, body: {slug: result.slug, title: result.title}}, function (err, httpMessage, res) {
                            if (err)
                                return console.log('Error: ' + err);
                            else
                                return console.log('Success!: ' + res.message);
                            done();
                        });
                    } else {
                        if (res.title != result.title) {
                            request.put({url: 'http://localhost:8080/v1/entries/' + result.slug, json: true, body: {slug: result.slug, title: result.title}}, function (err, httpMessage, res) {
                                if (err)
                                    return console.log('Error: ' + err);
                                else
                                    return console.log('Success!: ' + res.message);
                                done();
                            });
                        } else {
                            done();
                        }
                    }
                }
            });
        });
        grunt.task.run(['newer:markdown']);
    });
};
