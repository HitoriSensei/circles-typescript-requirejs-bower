requirejs.config({
    shim: {

    },
    paths: {
        jquery: "bower_components/jquery/dist/jquery",
        sugar: "bower_components/sugar/release/sugar.min"
    },
    packages: [

    ]
});
require(['app', 'sugar'], function (app) {
    app.app.init();
});