var gulp = require('gulp')
var ts = require('gulp-typescript')

gulp.task('default', function() {
    var tsResult = gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'main.js'
        }))
    return tsResult.js.pipe(gulp.dest('built'))
})