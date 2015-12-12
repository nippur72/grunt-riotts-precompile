/*
 * grunt-riotts-precompile
 * https://github.com/nippur72/grunt-riotts-precompile
 *
 * Copyright (c) 2015 Antonino Porcino
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Configuration to be run (and then tested).
    precompileTags: {
      src: ['tags/**/*.html'],
      dest: 'precompiled-tags.js',
      indexByTagName: true
    },    

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');     
};
