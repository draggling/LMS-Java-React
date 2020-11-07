"use strict";

var gulp = require('gulp'); // gulp
var connect = require('gulp-connect'); // server connection
var open = require('gulp-open'); // opens server
var browserify = require('browserify'); // converts to browser readable
var babelify = require("babelify"); // converts js to babel
var source = require('vinyl-source-stream'); // creates stream that can be copy-pasted to another location
var concat = require('gulp-concat'); // combines files e.g. css html jss
var lint = require('gulp-eslint'); //

var config = {
	port: 8080,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/images/*',
		css: [
      		'node_modules/bootstrap/dist/css/bootstrap.min.css',
      		'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'./src/css/*.css'
    	],
		dist: './dist',
		mainJs: './src/main.js'
	}
}

//Start a local development server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function() { // connects to the file
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() { // handles html tasks
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('js', function() { // handles js task

	browserify(config.paths.mainJs)
		.transform(babelify, {presets: ["es2015", "react", "stage-3"]})
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))

		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('css', function() { // handles css files task
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function() { // handles images task
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + "/images"))
		.pipe(connect.reload());
});

gulp.task('lint', function() { // debugging
	return gulp.src(config.paths.js)
		.pipe(lint())
		.pipe(lint.format());
});

gulp.task('watch', function() { // event listener
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);
