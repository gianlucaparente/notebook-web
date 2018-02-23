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
        sass: {
            dev: {
                options: {
                    trace: true
                },
                files: [{
                    expand: true,
                    src: ['**.scss'],
                    dest: 'dev',
                    cwd: 'src',
                    ext: '.css'
                }]
            }
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
                src: ['**', '!**.scss'],
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
                    open: true,
                    livereload: true
                }
            }
        },
        watch: {
            scripts: {
                options: {
                    livereload: true
                },
                files: ['src/**/*'],
                tasks: ['clean:dev', 'compile', 'copyAssets']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    
    // Copy Task
    grunt.registerTask('copyAssets', ['copy:dependencies', 'copy:dev']);

    // Start Server Task
    grunt.registerTask('startServer', ['connect:server', 'watch']);

    // Compile Task
    grunt.registerTask('compile', ['jshint', 'sass']);

    // Build Tasks
    grunt.registerTask('dev', ['clean:dev', 'compile', 'copyAssets', 'startServer']);
    // grunt.registerTask('dist', ['clean:dist', 'jshint', 'copy:dist', 'uglify', 'copyAssets', 'watch']);

    // Custom Tasks
    grunt.registerTask('default', loadTask("default"));

};