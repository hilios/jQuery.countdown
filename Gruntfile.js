module.exports = function(grunt) {
    'use strict';
    // Force use of Unix newlines
    grunt.util.linefeed = '\n';
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            src:  './src',
            lib:  './lib',
            test: './test',
            dest: './dist'
        },
        // project utils
        pluginName: 'jquery.<%= pkg.name %>',
        license: grunt.file.read('LICENSE.md').split('\n').splice(3).join('\n'),
        banner: '/*!\n' +
              ' * The Final Countdown for jQuery v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
              ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' * <%= license.replace(/\\n/gm, "\\n * ") %>\n' +
              ' */\n',
        // contrib-clean
        clean: ['<%= dirs.dest %>'],
        // contrib-jshint
        jshint: {
            all: [
                'Gruntfile.js',
                '<%= dirs.src %>/**/*.js', '<%= dirs.test %>/**/*.js'
            ]
        },
        // contrib-qunit
        qunit: {
            all: 'test/**/*.html',
            dev: 'test/scenario-jquery-1.9.1.html'
        },
        // contrib-uglify
        uglify: {
            dev: {
                files: {
                    '<%= dirs.dest %>/<%= pluginName %>.js': 
                        ['<%= dirs.src %>/**/*.js']
                },
                options: {
                    beautify:           true,
                    compress:           false,
                    mangle:             false,
                    preserveComments:   false
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
        // contrib-watch
        watch: {
            all: {
                files: [
                    '<%= dirs.src %>/**/*.js', 
                    '<%= dirs.lib %>/**/*.js', 
                    '<%= dirs.test %>/**/*.js'
                ],
                tasks: ['build:dev']
            }
        }
    });
    // Load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Test
    grunt.registerTask('test',      ['jshint', 'qunit:all']);
    grunt.registerTask('test:dev',  ['jshint', 'qunit:dev']);
    // Build
    grunt.registerTask('build',     ['uglify', 'test:all']);
    grunt.registerTask('build:dev', ['uglify', 'test:dev']);
    // Develop
    grunt.registerTask('default',   ['watch']);
};