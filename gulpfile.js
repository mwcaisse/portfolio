/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var nunjucksRender = require("gulp-nunjucks-render");
var gulpClean = require("gulp-clean");
var gulpData = require("gulp-data");
var gulpRename = require("gulp-rename");

var libs = './src/lib/';
var dist = './dist/';
var stage = "./dist-stage/";
var nunjucksStage = stage + "/nunjucks/";

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('restore:bootstrap', function () {
    gulp.src([
        'node_modules/bootstrap/dist/**/*.*'
    ]).pipe(gulp.dest(libs + 'bootstrap'));
});

gulp.task('restore:font-awesome', function () {
    gulp.src([
        'node_modules/font-awesome/css/*.*'
    ]).pipe(gulp.dest(libs + 'font-awesome/css'));

    gulp.src([
        'node_modules/font-awesome/fonts/*.*'
    ]).pipe(gulp.dest(libs + 'font-awesome/fonts'));
});

gulp.task('restore', [
    'restore:bootstrap',
    'restore:font-awesome'
]);

function getDataForFile(file) {
    var fileName = file.relative;
    console.log("File: " + fileName);
    if (fileName === "index.njk") {
        return require("./src/data/index.json");
    } else if (fileName === "cartracker.njk") {
        return require("./src/data/projects/cartracker.json");
    } else {
        return {};
    }
}

gulp.task('nunjucks', [
    "nunjucks:stage",
    "nunjucks:render"
]);

gulp.task('nunjucks:render', function () {
    console.log("nunjucks render");
    gulp.src(nunjucksStage + "/**/*.+(html|njk)")
        .pipe(gulpData(getDataForFile))
        .pipe(nunjucksRender({
            path: ["src/templates"]
        }))
        .pipe(gulp.dest(dist + "/"));
});

gulp.task("nunjucks:stage", [
    "nunjucks:stage:other",
    "nunjucks:stage:projects"
]);

gulp.task("nunjucks:stage:other", function() {
    gulp.src(["src/pages/**/*.+(html|njk)", "!src/pages/project.njk"])
        .pipe(gulp.dest(nunjucksStage)); 
});

gulp.task("nunjucks:stage:projects", function() {
    var projects = [
        "cartracker",
        "showreminder",
        "mirrormirror",
        "mwcaisse",
        "pushfile"
    ];

    for (var i = 0; i < projects.length; i++) {
        var project = projects[i];

        gulp.src("src/pages/project.njk")
            .pipe(gulpRename({
                dirname: "projects/",
                basename: project,
                extname: ".njk"
            }))
            .pipe(gulp.dest(nunjucksStage));
    }
});

gulp.task("stage:clean", function() {
    gulp.src(stage, { read: false }).pipe(gulpClean());
});

gulp.task("dist:clean",
    function() {
        gulp.src(dist, { read: false }).pipe(gulpClean());
    });

gulp.task('dist:css',
    function() {
        gulp.src([
            "src/css/**/*.css"
        ]).pipe(gulp.dest(dist + "/css"));
    });

gulp.task('dist:js',
    function () {
        gulp.src([
            "src/js/**/*.js"
        ]).pipe(gulp.dest(dist + "/js"));
    });

gulp.task('dist:img',
    function () {
        gulp.src([
            "src/img/**/*.jpg",
            "src/img/**/*.png"
        ]).pipe(gulp.dest(dist + "/img"));
    });

gulp.task('dist:html',
    function () {
        gulp.src([
            "src/**/*.html"
        ]).pipe(gulp.dest(dist + "/"));
    });

gulp.task('dist:lib',
    function () {
        gulp.src([
            "src/lib/**/*.*"
        ]).pipe(gulp.dest(dist + "/lib"));
    });

gulp.task('dist', [
    'dist:css',
    'dist:js',
    'dist:img',
    'nunjucks',
    'dist:lib'//,
    //'stage:clean'
]);

gulp.task("clean", [
    "dist:clean",
    "stage:clean"
]);