module.exports = function(grunt) {
    grunt.initConfig({
        jade: {
            html: {
                files: {
                    'index.html': ['*.jade']
                }
            }
        }
        //typescript: {
        //    base: {
        //        src: ['app.ts'],
        //        dest: '.',
        //        options: {
        //            module: 'amd', //or commonjs
        //            target: 'es5', //or es3
        //            basePath: '.',
        //            sourceMap: true,
        //            declaration: true
        //        },
        //        references: [
        //            "declarations/**/*.d.ts"
        //        ]
        //    }
        //}
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    //grunt.loadNpmTasks('grunt-typescript');

    grunt.registerTask('default', ['jade']);
};