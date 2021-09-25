const gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat'); 
var cssnano = require('gulp-cssnano');


// Logs Message
gulp.task('message', function (done) {
    console.log('Gulp is running...');
    done();
    return;
}); 

// COPY ALL HTML FILES
gulp.task('copyHtml', done => {
    gulp.src('src/*.html')
        .pipe(gulp.dest(`backup/20210926`));
        done(); 
});

// UGLIFY

gulp.task('minify', done => {
    gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/jsfiles'));
    done(); 
});


// COMPILE SASS

gulp.task('sass', done => {
    gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
    done(); 
});



// compile all JS file

gulp.task('jsJoin', done => {
    gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/jsFiles'));
    done(); 
});


// css uglify

gulp.task('minCss', done => {
    gulp.src('src/sass/*.scss')
    .pipe(cssnano())
    .pipe(gulp.dest('dist/sass'));
    done(); 
});

// default

gulp.task('default', gulp.series('message', 'copyHtml', 'sass', 'jsJoin')); 

gulp.task('watch', ()=> {
    gulp.watch('src/js/*.js', gulp.series('jsJoin'));
    gulp.watch('src/sass/*.sass', gulp.series('sass')); 
    gulp.watch('src/*.html', gulp.series('copyHtml'))
});


// just minor comment