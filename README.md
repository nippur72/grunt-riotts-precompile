# grunt-riotts-precompile

> Precompile tags for RiotTS

This task is meant to be used with [RiotTS](https://github.com/nippur72/RiotTS), 
the TypeScript friendly version of [Riot.js](riotjs.com).

It reads HTML template files from a directory, compiles them with Riot and 
makes them available to RiotTS into a single concatenated JavaScript file.
 
See [RiotTS documentation](https://github.com/nippur72/RiotTS/blob/master/README.md#precompiled)
for more details on how to use precompiled tags.

## How to use it

Install with
```shell
npm install grunt-riotts-precompile --save-dev
```
Then customize your `Gruntfile.js` with something like this:
```js
grunt.initConfig({
  precompileTags: {
    src: ['tags/**/*.html'],
    dest: 'precompiled-tags.js',
    indexByTagName: false
  }
});

grunt.loadNpmTasks('grunt-riotts-precompile');

grunt.registerTask('default', ['precompileTags']);  
grunt.registerTask('clean', ['precompileTags:off']);
```

With the above example task, all tags from the `tags/` directory are read and compiled into `precompiled-tags.js`.
  
- `src` is the source folder
- `dest` is the output JavaScript file to be linked in your application
- `indexByTagName` if set to `true` will index compiled tags by tagname rather than file path. 

