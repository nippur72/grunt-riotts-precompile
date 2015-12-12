/*
 * grunt-riotts-precompile
 * https://github.com/Nino/grunt-riotts-precompile
 *
 * Copyright (c) 2015 Antonino Porcino
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {    

  // build or turn off  
  function taskPrecompileTags(arg1) {
    if(arg1==="clean"||arg1==="off") 
    {
      doCleanPrecompiledTags();
    }
    else 
    {
      doPrecompileTags();
    }
  }  

  // turn off precompiled tags
  function doCleanPrecompiledTags() {
      var opts = grunt.config()["precompileTags"];
      grunt.log.writeln("cleaning "+opts.dest+"...");
      grunt.file.write(opts.dest, "");
  }
  
  // precompile tags 
  function doPrecompileTags() {         
      var opts = grunt.config()["precompileTags"]; 
      var riot = require('riot');     
      var jsesc = require('jsesc');      
      
      grunt.log.writeln("using riot "+riot.version);
      grunt.log.writeln("reading all files in "+opts.src);
      grunt.log.writeln("dest to "+opts.dest);
      
      var files = grunt.file.expand(opts.src);
      var compiledTags = [];
      
      files.map(function(f) {                  
         var template = grunt.file.read(f);                 
         var compiledTag = riot.compile(template, {entities: true})[0];         

         compiledTags.push({
            fileName: f,
            tagName: compiledTag.tagName, 
            html: compiledTag.html, 
            css: compiledTag.css, 
            attribs: compiledTag.attribs, 
            brackets: riot.settings.brackets
         });
         
         grunt.log.writeln("compiled: "+f);                           
      });
      
      var bundled = "";
      
      compiledTags.map(function(tag) {
         var key = opts.indexByTagName ? tag.tagName : tag.fileName; 
         
         bundled += "Riot.precompiledTags['"+key+"'] = { "+
                    "tagName: '" + jsesc(tag.tagName) +"', "+
                    "html: '"    + jsesc(tag.html)    +"', "+
                    "css: '"     + jsesc(tag.css)     +"', "+
                    "attribs: '" + jsesc(tag.attribs) +"' }; \n";            
      });
      
      grunt.log.writeln("writing to "+opts.dest+"...");
      grunt.file.write(opts.dest, bundled);
  }

  grunt.registerTask('precompileTags', 'precompile tags for RiotTS', taskPrecompileTags );
  
};
