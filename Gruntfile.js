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
            all: ['Gruntfile.js', 'src/jquery.countdown.js', 'test/**/*.js']
        },
        // contrib-qunit
        qunit: {
            all: 'test/**/*.html',
            dev: 'test/scenario-jquery-1.9.1.html'
        },
        // contrib-uglify
        uglify: {
            options: {
                preserveComments: function(node, comment) {
                    // Preserve the license banner
                    return comment.col === 0 && comment.pos === 0;
                }
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
    grunt.registerTask('license', function() {

    });

    grunt.registerTask('test',      ['jshint', 'qunit:all']);
    grunt.registerTask('build',     ['qunit:all', 'uglify']);
    grunt.registerTask('build:dev', ['qunit:dev', 'uglify']);
    grunt.registerTask('default',   ['build:dev', 'watch']);
};