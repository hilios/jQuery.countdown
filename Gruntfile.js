module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // contrib-watch
        watch: {
            all: {
                files: ['src/jquery.countdown.js', 'lib/**/*.js', 'test/**/*.js', 'Gruntfile.js'],
                tasks: ['build:dev']
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
    // Load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Project tasks
    // Test
    grunt.registerTask('test',      ['jshint', 'qunit:all']);
    grunt.registerTask('test:dev',  ['jshint', 'qunit:dev']);
    // Build
    grunt.registerTask('build',     ['test:all', 'uglify']);
    grunt.registerTask('build:dev', ['test:dev', 'uglify']);
    // Develop
    grunt.registerTask('default',   ['watch', 'build:dev']);
};