module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');

    function loadTask(task) {
        return require("./tasks/" + task + ".js");
    }

    // Project configuration.
    grunt.initConfig({
        pkg: pkg,
        jshint: {
            options: {
                esversion: 6
            },
            files: { src: 'src/**/*.js', filter: 'isFile' }
        },
        clean: {
            dev: { src: 'dev' },
            dist: { src: 'dist' }
        },
        copy: {
            dependencies: {
                expand: true,
                src: ['requirejs/require.js', 'vue/dist/vue.js', 'axios/dist/axios.js'],
                dest: 'dev/components',
                cwd: 'node_modules'
            },
            dev: {
                expand: true,
                src: ['**'],
                dest: 'dev',
                cwd: 'src'
            },
            dist: {
                expand: true,
                src: ['**'],
                dest: 'dist',
                cwd: 'src'
            }
        },
        uglify: {
            options: {
                esversion: 6
            },
            dev: { src: ['dev/**/*.js'], dest: 'dev/<%= pkg.name %>.min.js' },
            dist: { src: ['dist/**/*.js'], dest: 'dist/<%= pkg.name %>.min.js' }
        },
        connect: {
            server: {
                options: {
                    base: "./dev",
                    livereload: true,
                    open: true
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['jshint', 'copyAssets']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Copy Task
    grunt.registerTask('copyAssets', ['copy:dependencies', 'copy:dev']);

    // Start Server Task
    grunt.registerTask('startServer', ['connect:server', 'watch']);

    // Build Tasks
    grunt.registerTask('dev', ['clean:dev', 'jshint', 'copyAssets', 'startServer']);
    // grunt.registerTask('dist', ['clean:dist', 'jshint', 'copy:dist', 'uglify', 'copyAssets', 'watch']);

    // Custom Tasks
    grunt.registerTask('default', loadTask("default"));

};