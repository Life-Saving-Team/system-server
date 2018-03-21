var gulp = require('gulp');
var apidoc = require('gulp-apidoc');
var browserSync = require('browser-sync');
var spawn = require('child_process').spawn;   // Running node simply


gulp.task('buildDocs', function(done) {
    apidoc({
        src: "src/routes/",
        dest: "api_doc",
        template: "node_modules/apidoc/template",
        debug: true,
    }, done);
})



// Developing documentation for IOS and Android
gulp.task('watchDocs', ['buildDocs'], function() {
    // spawn('node', ['app.js'], { stdio: 'inherit' });
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["api_doc/api_data.json"],
        browser: "google chrome",
        port: 3001,
    });
    gulp.watch('routes/**/*.*', ['buildDocs']);
});



