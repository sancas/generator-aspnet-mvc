// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Folder Paths
// to match only one level down:
// 'test/spec/{,*/}*.js'
// to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // CONFIGURABLE PATHS
  //  The yeomanConfig object contains file paths and other "constants" that are used throughout
  //  The rest of this Gruntfile. Basically, any value that is used in multiple places should be
  //  put here for ease of maintenance. Update the value here, and all other places are updated
  //  automagically.
  var yeomanConfig = {
    app: '<%= projectName %>',
    dist: 'dist',
    port: <%= port %>
  };

  //The initConfig is were we define all possible operations that tasks can peform, and where we configure those
  //operations for each task.
  grunt.initConfig({

    // YEOMAN
    //  Create a yeoman object that contains our constants from above. We will refer to this object in
    //  the operations definitions below to get our "constant" values.
    yeoman: yeomanConfig,

    // WATCH
    //  The watch opertation will watch a set of files
    //  and run other operations when those files are
    //  edited or otherwised changed.
    watch: {<% if (compass) { %>
      compass: {
        files: ['<%%= yeoman.app %>/Content/sass/**/*.{scss,sass}'], //Watch these files, and...
        tasks: ['compass:server'] //run this operation when the files change.
      },<% } %>
      livereload: {
        options: {livereload: 32684},
        files: [
          '<%%= yeoman.app %>/Content/**/*.css',
          '<%%= yeoman.app %>/Scripts/**/*',
          '<%%= yeoman.app %>/Content/images/**/*',
          '<%%= yeoman.app %>/Views/**/*.cshtml',
          '<%%= yeoman.app %>/bin/**/*.dll'
        ]
      }
    },

    // PROCESSHTML
    //  The processhtml operation will process the defined files
    //  looking for "build" comment blocks and processing them accordingly.
    //  In our case, we want to process the dist version of the tail.php
    //  and remove the script tags that were put in there for livereload
    //  purposes during development.
    processhtml: {
      dist: {
        files: {
          '<%%= yeoman.dist %>/Views/Shared/_Footer.cshtml': ['<%%= yeoman.dist %>/Views/Shared/_Footer.cshtml']
        }
      }
    },
    
    // CLEAN
    //  The clean operation is useful to clean out folders prior to copying
    //  over new files. This operation will delete the contents of the folder.
    //  This operation is usually one of the first called when running grunt tasks
    //  to clean up our output directories before the remaining tasks copy new files
    //  to them.
    clean: {
      dist: {             // For the "dist" task, we need to clean out several folders.
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/**/*',
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      }
    },

    // JSHINT
    //  The jshint operation will lint our javascript files
    //  making sure that there are no errors or bad formatting.
    //  The .jshintrc file in the project folder sets the options
    //  for linting. If the operations fails, the grunt script will abort.
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%%= yeoman.app %>/Scripts/**/*.js',
        '!<%%= yeoman.app %>/Scripts/lib/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // INLINELINT
    //  The inlinelint operation performs the same operation does the same job
    //  as the jshint operation (see above), but runs on inline scripts in
    //  html/php files.
    inlinelint: {
      all: [
        '<%%= yeoman.app %>/**/*{.html,.cshtml}',
        '!<%%= yeoman.app %>/bower_components/**/*{.html,.cshtml}'
      ]
    },

<% if (compass) { %>
    // COMPASS
    //  The compass operation runs Compass (Sass compilation)
    //  on our Stylesheets to produce finalized css.
    compass: {
      options: {
        sassDir: '<%%= yeoman.app %>/Content/sass',                         //Folder that contains our Sass files.
        cssDir: '<%%= yeoman.app %>/Content',                               //Output folder
        generatedImagesDir: '<%%= yeoman.app %>/Content/images/generated',
        imagesDir: '<%%= yeoman.app %>/Content/images',
        javascriptsDir: '<%%= yeoman.app %>/Scripts',
        importPath: '<%%= yeoman.app %>/bower_components',
        httpImagesPath: '/Content/images',
        httpGeneratedImagesPath: '/Content/images/generated',
        fontsDir: '<%%= yeoman.app %>/Content/fonts',
        httpFontsPath: '/Content/fonts',
        relativeAssets: false
      },
      server: {
        options: {
          debugInfo: true
        }
      },
      dist: {
        options: {
          generatedImagesDir: '<%%= yeoman.dist %>/Content/images/generated'
        }
      }
    },
<% } %>

    // REV
    //  The rev operation will apply revision numbers to filenames (filename.ext will become filename.revision_no.ext)
    //  This is usually applied only for production on files for which we want to force browser cache expiration.
    rev: {
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/Script/**/*.js',
            '<%%= yeoman.dist %>/Content/**/*.css',
            '<%%= yeoman.dist %>/Content/images/**/*.{png,jpg,jpeg,gif,webp}'
          ]
        }
      }
    },

    // USEMINPREPARE
    //  This operation is part of the usemin operation and is responsible for setting everything
    //  up. This operation will parse the files listed in the options defined here looking for
    //  comment blocks of the form:
    //          <!-- build:css({.tmp,app}) styles/main.css -->
    //          ...
    //          <!-- endbuild -->
    //  It will then parse the html between these blocks and update the configuration of the
    //  cssmin, concat, and uglify operations to make sure they will operate properly on the
    //  files defined in the html comment block. The Usemin operation (below) will then be
    //  responsible for updating these references to point to the newly created, combined
    //  and minified files. This operation should be run BEFORE the concat, cssmin, and uglify
    //  operations to ensure they are properly configured.
    useminPrepare: {
      options: {
        dest: '<%%= yeoman.dist %>'
      },
      html: '<%%= yeoman.app %>/**/*{.html,.cshtml}'
    },

    // USEMIN
    //  The usemin operation will update references to javascript and css files that
    //  have beem concatinated and minified. See the USEMINPREPARE operation for instructions
    //  on how to identify references in your html/php with comment blocks. This operation
    //  should be run AFTER the concat, cssmin, and uglify operations. This is because this
    //  operation will ensure that the final output file(s) have been created before updating
    //  references to point to them.
    usemin: {
      options: {
        dirs: ['<%%= yeoman.dist %>']
      },
      html: ['<%%= yeoman.dist %>/**/*{.html,.cshtml}'],
      css: ['<%%= yeoman.dist %>/Content/**/*.css']
    },

    // CSSMIN
    //  The cssmin operation will combine and minify css files.
    //  This operation is disabled by default, since the Usemin
    //  operation will take care of combining and minifying css
    //  files for us.
    //cssmin: {
    //     dist: {
    //         files: {
    //             '<%= yeoman.dist %>/styles/main.css': [
    //                 '.tmp/styles/{,*/}*.css',
    //                 '<%= yeoman.app %>/styles/{,*/}*.css'
    //             ]
    //         }
    //     }
    //},


    // CONCAT
    //  The concat operation is used to combine several files
    //  into one final output file. This operation is included
    //  here for completeness, but not used since the uglify and
    //  usemin operations already combine files for us.
    /*concat: {
        dist: {}
    },*/

    // UGLIFY
    //  The uglify operation is used to minify javascript and css
    //  files. This operation is included here for completeness,
    //  but is not used since the usemin task already minifies
    //  files for us.
    /*uglify: {
        dist: {}
    },*/


    // IMAGEMIN
    //  The imagemin operation will minify jpeg and png files
    //  using several methods to attempt to compress the size
    //  of each file.
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/Content/images',
          src: '**/*.{png,jpg,jpeg}',
          dest: '<%%= yeoman.dist %>/Content/images'
        }]
      }
    },

    // COPY
    //  The copy task does simply copying of files from one location to another.
    //  Most of the otheroperations allow for putting their output files in a
    //  particular location. However, some files are "static" and not used in
    //  any operations. The copy operation can be used to copy those files as needed,
    //  for example, moving files from the app folder to the dist folder for a push
    //  to production.
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: [
              '*.{ico,png,txt}',
              '.htaccess',
              'Content/images/**/*.{webp,gif}',
              'Content/fonts/*',
              '**/*.cshtml'
          ]
        }<% if (bootstrap) { %>,{
          //Copy the bootcamp icon font files to the correct dist folder.
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>/Content/fonts',
          flatten: true,
          src: 'bower_components/bootstrap/dist/fonts/*'
        }<% } %>]
      }
    },

    // CONCURRENT
    //  The concurrent operation simply allows many other long-running operations
    //  to be run at the same time, to speed up the build process. Simply list
    //  the operations to be run concurrently, and it will be done.
    concurrent: {
      dist: [<% if (compass) { %>
        'compass',<% } %>
        'imagemin'
      ]
    }
  });
  // END INITCONFIG()


  /******************************************************************\
  |*  GRUNT TASK SETUP
  |*
  |*  In this section, we will define and configure the different
  |*  tasks that we want to be able to run using grunt. To run
  |*  a task, simply call grunt <taskname> from the commandline.
  |*  We'll also define a 'default' task to be run when no task
  |*  is provided.
  |*
  \*******************************************************************/



  // SERVER
  //  The server task is used to "start a server". If you are using php's built-in
  //  web server for development testing, it will be started up. We'll start watching
  //  any files that need to be watched for changes, and open a browser to our dev URL
  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open:server']);
    }

    grunt.task.run([<% if (compass) { %>
      'compass:server',<% } %>
      'watch'
    ]);
  });

  // BUILD
  //  The build task will "build" our project, and put the final output into
  // the dist folder, making it ready for deployment to our production environment.
  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    //'concat',
    //'cssmin',
    //'uglify',
    'copy:dist',
    'rev',
    'usemin',
    'processhtml:dist'
  ]);

  // DEFAULT
  //  The default task is run whenever no other task is provided. Here,
  //  we'll run the build task by default.
  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);
};