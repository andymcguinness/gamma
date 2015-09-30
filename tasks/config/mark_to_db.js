module.exports  = function(grunt) {
  grunt.config.set('mark_to_db', {
    entries: {
      files: [
        {
          src: ['entries/**/*.md']
        }
      ],
      options: {
        api: 'entry'
      }
    },
    items: {
      files: [
        {
          src: ['items/**/*.md']
        }
      ],
      options: {
        api: 'portfolio'
      }
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
    var api = this.options().api;

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
            var excerpt = yamlFrontMatter.content.split(/\n\n/g);
            yamlFrontMatter.excerpt = excerpt[0] + (excerpt[1] ? excerpt[1] : '');
            yamlFrontMatter.filename = file.split('/').pop();

            var url = 'http://localhost:1337/' + api + '?filename=' + yamlFrontMatter.filename;
            request.get({url: url, json: true}, function (err, httpMessage, res) {
              if (err) {
                console.log('Error: ' + err);
                if (index === (arr.length - 1)) {
                  done();
                }
              } else {
                if (res.length > 0) {
                  var errors = [];
                  // Loop through all the results of yamlFrontMatter and compare with what's in the db
                  for (var key in yamlFrontMatter) {
                    // Ensure key is not inherited
                    if (yamlFrontMatter.hasOwnProperty(key)) {
                      if (res[0][key] !== yamlFrontMatter[key]) {
                        errors.push(key);
                      }
                    }
                  }

                  if (errors.length > 0) {
                    var updates = {};
                    for (var i = 0; i < errors.length; i++) {
                      updates[errors[i]] = yamlFrontMatter[errors[i]];
                    }
                    request.put({url: 'http://localhost:1337/' + api + '/' + res[0].id, json: true, body: updates}, function (err, httpMessage, res) {
                      if (err) {
                        if (index === (arr.length - 1)) {
                          done();
                        }
                        return console.log('Error: ' + err);
                      } else {
                        if (index === (arr.length - 1)) {
                          done();
                        }
                        return console.log('Success!');
                      }
                    });
                  } else {
                    if (index === (arr.length - 1)) {
                      done();
                    }
                  }
                } else {
                  request.post({url: 'http://localhost:1337/' + api, json: true, body: yamlFrontMatter}, function (err, httpMessage, res) {
                    if (err) {
                      if (index === (arr.length - 1)) {
                        done();
                      }
                      return console.log('Error: ' + err);
                    } else {
                      if (index === (arr.length - 1)) {
                        done();
                      }
                      return console.log('Success!: ' + res);
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
