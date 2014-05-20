module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      src: './src',
      lib: './lib',
      bin: './build',
      test: './test',
      dest: './dist'
    },
    // project utils
    pluginName: 'jquery.<%= pkg.name %>',
    license: grunt.file.read('LICENSE.md').split('\n').splice(3).join('\n'),
    banner: '/*!\n' +
            ' * <%= pkg.description %> v<%= pkg.version %> ' +
              '(<%= pkg.homepage %>)\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> ' +
              '<%= pkg.author %>\n' +
            ' * <%= license.replace(/\\n/gm, "\\n * ") %>\n' +
            ' */\n',
    // contrib-clean
    clean: ['<%= dirs.dest %>'],
    // contrib-compress
    compress: {
      release: {
        options: {
          archive: '<%= dirs.bin %>/<%= pluginName %>-<%= pkg.version %>.zip'
        },
        expand: true,
        cwd: '<%= dirs.dest %>',
        src: ['**/*'],
        dest: '<%= pluginName %>-<%= pkg.version %>'
      }
    },
    // contrib-jshint
    jshint: {
      options: {
        jshintrc: true
      },
      all: [
        'Gruntfile.js',
        '<%= dirs.src %>/**/*.js',
        '<%= dirs.test %>/**/*.js'
      ]
    },
    // contrib-uglify
    uglify: {
      dev: {
        files: {
          '<%= dirs.dest %>/<%= pluginName %>.js':
              ['<%= dirs.src %>/**/*.js']
        },
        options: {
          beautify: true,
          compress: false,
          mangle: false,
          preserveComments: false
        }
      },
      min: {
        files: {
          '<%= dirs.dest %>/<%= pluginName %>.min.js':
              ['<%= dirs.src %>/**/*.js']
        },
        options: {
          report: 'min'
        }
      },
      options: {
        banner: '<%= banner %>'
      }
    },
    // karma
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      watch: {
        autoWatch: true,
        singleRun: false
      },
      unit: {
        autoWatch: false,
        singleRun: true
      }
    },
    // version
    version: {
      release: {
        src: ['*.json']
      }
    }
  });
  // Load grunt tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-version');
  // Test
  grunt.registerTask('test', ['jshint', 'karma:unit']);
  grunt.registerTask('test:unit', ['jshint', 'karma:unit']);
  // Build
  grunt.registerTask('build', ['uglify', 'test:all', 'version', 'compress']);
  // Develop
  grunt.registerTask('default', ['karma:watch']);
};
