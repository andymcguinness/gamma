/**
 * File: Gruntfile.js
 * Description: Grunt taskrunner for the project
 * Dependencies: See package.json
 *
 * @package gamma
 */

/* === Basic Variables === */
var yamlFront   = require('yaml-front-matter');     // will parse through files and pull out the YAML frontmatter
var request     = require('request');               // will make requests to our API routes
var Promise     = require('bluebird');                     // will include promises library

/* === Setting Up Grunt === */
module.exports = function(grunt) {
  /* === Initial Config === */
  grunt.initConfig({
    // where the package file is located
    pkg: grunt.file.readJSON('package.json'),

    // combining all our JS into one file and wrapping it in an IIFE
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

    // telling our custom plugin where to find the source markdown files and their compiled counterparts
    mark_to_db: {
      all: {
        files: [
          {
            src: ['src/md/*.md', 'src/md/**/*.md'],
            dest: 'dist/views/blog/entries/'
          }
        ]
      }
    },

    mark_from_db: {
      all: {
        files: [
          {
            src: 'dist/views/blog/entries/*.html',
            dest: 'src/md/'
          }
        ]
      }
    },

    // tells the markdown parser where to look for our files, and strips the YAML frontmatter off before parsing
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

    // compiling our SASS
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

    // uglifies concatenated JS on the deploy function
    uglify: {
      build: {
        src: 'dist/scripts.js',
        dest: 'dist/scripts.min.js'
      }
    },

    // watches for changes in SASS or JS files and recompiles as necessary
    watch: {
      scripts: {
        files: ['src/sass/*.scss', 'src/sass/*/*.scss', 'src/js/*.js', 'src/js/**/*.js', 'src/md/*.md', 'src/md/**/*.md'],
        tasks: ['sass', 'concat', 'mark_to_db', 'mark_from_db', 'newer:markdown']
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
  // the basic grunt task -- if I'm working on the Angular functionality or styling
  grunt.registerTask('default', ['concat', 'sass', 'mark_to_db', 'mark_from_db', 'newer:markdown', 'watch']);

  // the deploy grunt task -- when I want to prepare scripts for production and generate entries
  grunt.registerTask('deploy', ['concat', 'sass', 'uglify', 'mark_to_db', 'mark_from_db', 'newer:markdown']);

  // custom grunt task -- where the magic happens!
  grunt.registerMultiTask('mark_to_db', 'Grunt plugin to read YAML frontmatter and insert data into a database via an API url.', function() {
    var done = this.async();    // telling Grunt this is going to involve asynchronous tasks

    // default options object
    var options = this.options({
      encoding: 'utf-8'
    });

    // default GET options
    var req_options = {
      json: true,
      headers: {
        'content-type': 'application/json'
      }
    };

    // defining our files holder
    var fileObj = {};

    req_options.url = 'http://localhost:8080/v1/entries/';
    request.get(req_options, function (err, httpMessage, res) {
      if (err) {
        console.log('Error: ' + err);
      } else {
        fileObj = res;
      }
    });

    this.files.forEach(function(file) {

      function createRecurse () {
        // remove files that exist
        var newFiles = file.src.filter(function(filepath){
          if (!grunt.file.exists(file.dest + filepath.split('/').pop().replace('md', 'html')) && filepath.split('/').pop() !== '.gitignore') {
            return true;
          } else {
            return false;
          }
        });

        if (newFiles.length > 0) {
          // insert file info into the db here
          newFiles.forEach(function(file, index, arr) {
            // reads each file and gets the contents
            var contents = grunt.file.read(file);
            // parses out the YAML frontmatter
            var result = yamlFront.loadFront(contents);

            // shoves it in the db
            request.post({url: 'http://localhost:8080/v1/entries', json: true, body: {slug: result.slug, title: result.title, filepath: file.split('/').pop()}}, function (err, httpMessage, res) {
              if (err) {
                if (index === (arr.length - 1)) {
                  done();
                }
                return console.log('Error: ' + err);
              } else {
                if (index === (arr.length - 1)) {
                  done();
                }
                return console.log('Success!: ' + res.message);
              }
            });
          });
        } else {
          done();
        }
      }

      createRecurse();
    });
  });

  // custom grunt task -- where the magic happens!
  grunt.registerMultiTask('mark_from_db', 'Grunt plugin to check for deleted posts and remove them via an API url.', function() {
    var done = this.async();    // telling Grunt this is going to involve asynchronous tasks

    // default options object
    var options = this.options({
      encoding: 'utf-8'
    });

    // default GET options
    var req_options = {
      json: true,
      headers: {
        'content-type': 'application/json'
      }
    };

    // defining our files holder
    var fileObj = {};

    req_options.url = 'http://localhost:8080/v1/entries/';

    this.files.forEach(function(file) {

      // function to cross-ref files in the dest dir with files in the src dir
      function deleteRecurse () {

        // remove files that exist
        var deletedFiles = file.src.filter(function(filepath){
          if (!grunt.file.exists(file.dest + filepath.split('/').pop().replace('html', 'md')) && filepath.split('/').pop() !== '.gitignore') {
            return true;
          } else {
            return false;
          }
        });

        if (deletedFiles.length > 0) {
          // insert file info into the db here
          deletedFiles.forEach(function(file, index, arr) {

            // delete the entry from the db
            var url = 'http://localhost:8080/v1/entries/' + file.split('/').pop().replace('html', 'md');
            request.get({url: url, json: true}, function (err, httpMessage, res) {
              console.log('in the get request')
              if (err) {
                console.log('Error: ' + err);
                if (index === (arr.length - 1)) {
                  done();
                }
              } else {
                // if we got nothing back, no corresponding entry in the db
                if (!res) {
                  console.log('Entry does not exist.');
                  if (index === (arr.length - 1)) {
                    done();
                  }
                } else { // otherwise, we have work to do
                  req_options.url = 'http://localhost:8080/v1/entries/' + file.split('/').pop().replace('html', 'md');
                  // fire off the deletion request
                  console.log('firing off delete request');
                  request.del({url: req_options.url}, function (err, httpMessage, res) {
                    if (err) {
                      console.log('Error: ' + err);
                    } else {
                      console.log('Success!: ' + res.message);
                    }
                  });
                }
              }

              // delete the html file
              console.log('deleting file')
              grunt.file.delete(file);
              if (index === (arr.length - 1)) {
                done();
              }
            });
          });
        } else {
          done();
        }
      }

      deleteRecurse();
    });
  });
};
