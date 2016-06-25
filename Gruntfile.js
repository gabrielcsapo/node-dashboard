module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-screenshot');

    grunt.initConfig({
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

    grunt.registerTask('default', ['screenshot']);
}
