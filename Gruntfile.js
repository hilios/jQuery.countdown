module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // contrib-watch
        watch: {
            source: {
                files: ['src/**/*.js', 'lib/**/*.js', 'spec/**/*.js', 'Gruntfile.js'],
                tasks: ['test', 'build']
            }
        },
        // contrib-jshint
        jshint: {
            source: ['Gruntfile.js', 'src/**/*.js'] // , 'spec/**/*.js'
        },
        // contrib-jasmine
        jasmine: {
            source: {
                src:            ['src/**/*.js'],
                options: {
                    // host : 'http://127.0.0.1:8998/',
                    vendor:     ['lib/*.js'],
                    helpers:    ['spec/*Helper.js'],
                    specs:      ['spec/*Spec.js']
                }
            }
        },
        // contrib-uglify
        uglify: {
            options: {
                banner: grunt.file.read('Copyright.txt'),
                preserveComments: false,
                compress: true,
                report: true
            },
            source: {
                'src/jquery.countdown.js': ['src/jquery.countdown.min.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Project tasks
    grunt.registerTask('test',      ['jshint', 'jasmine']);
    grunt.registerTask('build',     ['uglify']);
    grunt.registerTask('default',   ['watch']);
};