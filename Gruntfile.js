'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    release: {},
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'lib/index.js': 'src/index.js'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      lib: ['src/**/*.js', 'Gruntfile.js'],
      test: 'test/**/*.js',
      example: 'example/*.js'
    },
    simplemocha: {
      options: {

      },
      all: {
        src: ['test/**/*.js']
      }
    },
    watch: {
      scripts: {
        files: '**/*.js',
        tasks: ['jshint', 'express:dev'],
        options: {
          spawn: false
        }
      },
      tests: {
        files: '**/*.js',
        tasks: ['simplemocha'],
        options: {
          spawn: true
        }
      }
    },
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'example/index.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('test', ['jshint', 'simplemocha']);
  grunt.registerTask('build', ['babel']);
  grunt.registerTask('default', ['jshint', 'simplemocha', 'express:dev', 'watch']);

};
