const gulp = require('gulp'); 
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

const pug = require('gulp-pug')
// const urlBuilder = require('gulp-url-builder')
 
gulp.task('pug', () => {
  return gulp.src(['src/pug/views/**/*.pug'
  ]).pipe( pug(
    {
        pretty: true,
        comments: true
      }
  ) )
    
    .pipe( gulp.dest('./dist') )
})

gulp.task('es6', function () { 
    return gulp.src('src/js/**/*.js')
  
    .pipe(babel({ "presets": ["env"]
}))    
.pipe(gulp.dest('js'));
 });

 gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        // .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(sourcemaps.write({ includeContent: false }))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(autoprefixer('last 10 version'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(notify("Sass Compiled!"));

});



gulp.task('watchSass', function () {
    return gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
});
 
 gulp.task('process', function () {
    return gulp.src(['./src/js/**/*.js'])
        .pipe(babel({  presets: ['@babel/preset-env']}))
        // .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(notify("JS Compiled!"));

});

 gulp.task('default', function () {
    gulp.watch('./src/js/**/*.js', gulp.series('process'));
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
});