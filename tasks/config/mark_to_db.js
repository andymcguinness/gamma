module.exports  = function(grunt) {
  grunt.config.set('mark_to_db', {
    all: {
      files: [
        {
          src: ['entries/**/*.md']
        }
      ]
    }
  });

  var markdown  = require('markdown').markdown;
  var yamlFront = require('yaml-front-matter');     // will parse through files and pull out the YAML frontmatter
  var request   = require('request');               // will make requests to our API routes
  var Promise   = require('bluebird');                     // will include promises library

  grunt.registerMultiTask('mark_to_db', 'Grunt plugin to read YAML frontmatter and insert data into a database via an API url.', function() {
    var done = this.async();    // telling Grunt this is going to involve asynchronous tasks

    var options = this.options({
      encoding: 'utf-8'
    });

    var req_options = {
      json: true,
      headers: {
        'content-type': 'application/json'
      }
    };

    var fileObj = {};

    this.files.forEach(function(file) {
      function createRecurse () {
        var newFiles = file.src.filter(function(filepath){
          if (filepath.split('/').pop() !== '.gitignore') {
            return true;
          } else {
            return false;
          }
        });

        if (newFiles.length > 0) {
          newFiles.forEach(function(file, index, arr) {
            var fileContents = grunt.file.read(file);
            var yamlFrontMatter = yamlFront.loadFront(fileContents);
            yamlFrontMatter.content = markdown.toHTML(yamlFrontMatter.__content, 'Gruber');

            var url = 'http://localhost:1337/entry?filename=' + file.split('/').pop();
            request.get({url: url, json: true}, function (err, httpMessage, res) {
              if (err) {
                console.log('Error: ' + err);
                if (index === (arr.length - 1)) {
                  done();
                }
              } else {
                if (res.length > 0) {
                  var errors = [];
                  if (res[0].title !== yamlFrontMatter.title) {
                    errors.push('title'); 
                  }
                  if (res[0].slug !== yamlFrontMatter.slug) {
                    errors.push('slug');
                  }
                  if (res[0].content !== yamlFrontMatter.content) {
                    errors.push('content');
                  }

                  if (errors.length > 0) {
                    var updates = {};
                    for (var i = 0; i < errors.length; i++) {
                      updates[errors[i]] = yamlFrontMatter[errors[i]];
                    }
                    request.put({url: 'http://localhost:1337/entry', json: true, body: updates}, function (err, httpMessage, res) {
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
                  } else {
                    if (index === (arr.length - 1)) {
                      done();
                    }
                  }
                } else {
                  request.post({url: 'http://localhost:1337/entry', json: true, body: {slug: yamlFrontMatter.slug, title: yamlFrontMatter.title, filename: file.split('/').pop(), content: yamlFrontMatter.content}}, function (err, httpMessage, res) {
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
                }
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


};
