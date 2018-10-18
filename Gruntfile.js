module.exports = function(grunt) {
    // Do grunt-related things in here

    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    // 'assets/main.css': 'src/scss/main.scss',
                    'assets/test.css': 'src/scss/test.scss',
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-sass');


};