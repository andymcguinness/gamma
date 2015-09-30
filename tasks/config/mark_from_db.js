module.exports  = function(grunt) {
  grunt.config.set('mark_from_db', {
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
          src: ['items/*', 'items/**/*.md']
        }
      ],
      options: {
        api: 'portfolio'
      }
    }
  });

  var request   = require('request');               // will make requests to our API routes
  var Promise   = require('bluebird');                     // will include promises library

  grunt.registerMultiTask('mark_from_db', 'Grunt plugin to read YAML frontmatter and insert data into a database via an API url.', function() {
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

    if (this.files.length > 0) {
      this.files.forEach(function(file) {
        function deleteRecurse () {
          if (file.src.length > 0) {
            var newFiles = file.src.filter(function(filepath){
              if (filepath.split('/').pop() !== '.gitignore') {
                return true;
              } else {
                return false;
              }
            });
          } else {
            var newFiles = [];
          }

          var url = 'http://localhost:1337/' + api;
          request.get({url: url, json: true}, function (err, httpMessage, files) {
            if (err) {
              console.log('Error: ' + err);
            } else {
              if (files.length > 0) {
                function search(nameKey, array) {
                  for (var i = 0; i < array.length; i++) {
                    if (array[i].split('/').pop() === nameKey) {
                      return array[i];
                    }
                  }
                }

                for (var i = 0; i < files.length; i++) {
                  var result = search(files[i].filename, newFiles);  
                  
                  if (!result) {
                    var delUrl = 'http://localhost:1337/' + api + '/' + files[i].id;
                    request.del({url: delUrl, json: true}, function (err, httpMessage, res) {
                      if (err) {
                        console.log('Error: ' + err);
                        if (files[files.length - 1].filename === res.filename) {
                          done();
                        }
                      } else {
                        console.log('Success!: ' + res.filename);
                        console.log(files[files.length - 1].filename);
                        if (files[files.length - 1].filename == res.filename) {
                          done();
                        }
                      }
                    });
                  } else {
                    if (i === files.length - 1) {
                      done();
                    }
                  }
                }
              } else {
                done();
              }
            }
          });
        }

        deleteRecurse();
      });
    }
  });
};
