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
    jsonlint: {
      all: {
        src: ['*.json']
      }
    },
    // karma
    karma: {
      options: {
        configFile: 'karma.conf.js',
        autoWatch: true,
        singleRun: false
      },
      watch: {

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
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-version');
  // Test
  grunt.registerTask('test', ['jshint', 'jsonlint', 'test:scenarios']);
  grunt.registerTask('test:unit', ['jshint', 'jsonlint', 'karma:unit']);
  // Test scenarios
  grunt.registerTask('test:scenarios',
                     'Test multiple scenarios', function() {

    var scenariosConf = require('./test/scenarios.json'),
      scenarios = Object.keys(scenariosConf),
      scenariosTasks = [],
      karmaConf = {},
      karmaFiles;
    // Fetchs the values of karma conf file.
    require('./karma.conf.js')({set: function(values) {
      karmaConf = values;
    }});

    karmaFiles = karmaConf.files.filter(function(file) {
      return !(/vendor/.test(file));
    });

    grunt.log.write('Configuring scenarios:'.cyan +
      ' %s found...'.replace(/%s/, scenarios.length));

    scenarios.forEach(function(scenario) {
      var value = scenariosConf[scenario],
        confName = 'karma.scenario_' + scenario.replace(/[._-]/gi, '_'),
        conf = {
          autoWatch: false,
          singleRun: true,
          logLevel: 'OFF',
          reporters: 'dots'
        };

      if (Array.isArray(value)) {
        conf.options = {
          files: value.concat(karmaFiles)
        };
      } else {
        conf.configFile = value;
      }
      // Register the scenario
      grunt.config.set(confName, conf);
      scenariosTasks.push(confName.replace(/\./, ':'));
    });
    grunt.log.ok();
    // Run all scenarios tasks
    grunt.task.run(scenariosTasks);
  });
  // Build
  grunt.registerTask('build', ['uglify', 'test:all', 'version', 'compress']);
  // Develop
  grunt.registerTask('default', ['karma:watch']);
};
