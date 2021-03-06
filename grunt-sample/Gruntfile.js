module.exports = function(grunt) {

  // Initializes the Grunt tasks with the following settings
  grunt.initConfig({

    // A list of files, which will be syntax-checked by JSHint
    jshint: { 
      files: ['Gruntfile.js', 'lib/**/*.js']
    },

    // Files to be concatenated … (source and destination files)
    concat: {
      js: {
        src: ['lib/**/*.js'],
        dest: 'dist/all.js'
      }
    },

    // … and minified (source and destination files)
    uglify: {
      dist: {
        src: ['<%= concat.js.dest %>'],
        dest: 'dist/all.min.js'
      }
    },

    // Tasks being executed with 'grunt watch'
    watch: {
      files: '<%= jshint.files %>',
      tasks: 'jshint'
    }
  });

  // Load the plugins that provide the tasks we specified in package.json.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // This is the default task being executed if Grunt
  // is called without any further parameter.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
