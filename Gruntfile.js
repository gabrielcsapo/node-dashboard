module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-screenshot');

    grunt.initConfig({
        pug: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    'dist/dashboard.html': ['./src/dashboard.pug']
                }
            }
        },
        screenshot: {
            dashboard: {
              options: {
                path: 'screenshots',
                files: [
                    {
                        parallel: true,
                        compress : true,
                        type: 'remote',
                        src: 'http://localhost:1337/admin',
                        dest: 'dashboard.png',
                        delay: 100
                    }
                ],
                viewport: ['1920x1080','1024x768','640x960', '320x480'] // any (X)x(Y) size
              }
          }
        }
    });

    grunt.registerTask('default', ['pug']);
}
