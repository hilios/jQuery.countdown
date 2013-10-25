module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // contrib-watch
        watch: {
            all: {
                files: ['src/**/*.js', 'lib/**/*.js', 'test/**/*.js', 'Gruntfile.js'],
                tasks: ['test', 'build']
            }
        },
        // contrib-jshint
        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        },
        // contrib-qunit
        qunit: {
            all: 'test/**/*.html'
        },
        // contrib-uglify
        uglify: {
            options: {
                banner: grunt.file.read('Copyright.txt'),
                preserveComments: false
            },
            all: {
                files: {
                    'src/jquery.countdown.min.js': ['src/jquery.countdown.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Project tasks
    grunt.registerTask('test',      ['jshint', 'qunit']);
    grunt.registerTask('build',     ['uglify']);
    grunt.registerTask('default',   ['build', 'watch']);
};