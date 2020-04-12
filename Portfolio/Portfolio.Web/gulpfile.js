/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var nunjucksRender = require("gulp-nunjucks-render");
var gulpData = require("gulp-data");
var gulpRename = require("gulp-rename");
var merge = require("merge-stream");
var del = require("del");

var tokenReplacer = require("./util/gulp-token-replacer");


const dir = {
    libs: './src/lib/',
    dist: "./dist/",
    stage: "./dist-stage/",
    nunjucks_stage: "./dist-stage/nunjucks/"
};


var tokens = {
    api_root: "/api/",
    context_root: "/"
};

function restoreFontAwesome() {
    var css = gulp.src([
        'node_modules/@fortawesome/fontawesome-free/css/*.*'
    ]).pipe(gulp.dest(dir.libs + 'font-awesome/css'));

    var other = gulp.src([
        'node_modules/@fortawesome/fontawesome-free/webfonts/*.*'
    ]).pipe(gulp.dest(dir.libs + 'font-awesome/webfonts'));

    return merge(css, other);
}

function restoreBulma() {
    return gulp.src([
        "node_modules/bulma/css/*.*"
    ]).pipe(gulp.dest(dir.libs + "bulma/css"));
}

function restoreVue() {
    return gulp.src([
        "node_modules/vue/dist/vue.js",
        "node_modules/vue/dist/vue.min.js"
    ]).pipe(gulp.dest(dir.libs + "vue/js"));
}

function getDataForFile(file) {
    var fileName = file.relative.replace(".njk", ".json");
    try {
        return require("./src/data/" + fileName);
    } catch (ex) {
        return {};
    }
}
function taskNunjucksRender() {
    return gulp.src(dir.nunjucks_stage + "/**/*.+(html|njk)")
        .pipe(gulpData(getDataForFile))
        .pipe(nunjucksRender({
            path: ["src/templates"]
        }))
        .pipe(gulpRename({
            extname: ".html.ptd"
        }))
        .pipe(gulp.dest(dir.dist + "/"));
}

function nunjucksStage() {
    return gulp.src(["src/pages/**/*.+(html|njk)", "!src/pages/project.njk"])
        .pipe(gulp.dest(dir.nunjucks_stage));
}
//Not really used anymore
function nunjucksStageProjects() {
    var projects = [
        "cartracker",
        "showreminder",
        "mwcaisse"
    ];

    var streams = merge();

    for (var i = 0; i < projects.length; i++) {
        var project = projects[i];

        streams.add(gulp.src("src/pages/project.njk")
            .pipe(gulpRename({
                dirname: "projects/",
                basename: project,
                extname: ".njk"
            }))
            .pipe(gulp.dest(dir.nunjucks_stage)));
    }
    return streams;
}

function nunjucks() {
    return gulp.series(nunjucksStage, taskNunjucksRender);
}

function stageClean() {
    return del([dir.stage]);    
}

function distClean() {
    return del([dir.dist]);    
}

function distCss() {
    return gulp.src([
        "src/css/**/*.css"
    ]).pipe(gulp.dest(dir.dist + "/css"));
}

function distJs() {
    return gulp.src([
        "src/js/**/*.js"
    ]).pipe(gulp.dest(dir.dist + "/js"));
}

function distImg() {
    return gulp.src([
        "src/img-fin/**/*.jpg",
        "src/img-fin/**/*.png",
        "src/img-fin/**/*.gif",
        "src/img-fin/**/*.svg"
    ]).pipe(gulp.dest(dir.dist + "/img"));
}

function distRes() {
    return gulp.src([
        "src/res/**/*"
    ]).pipe(gulp.dest(dir.dist + "/res"));
}

function distLib() {
    return gulp.src([
        "src/lib/**/*.*"
    ]).pipe(gulp.dest(dir.dist + "/lib"));
}

function distMisc() {
    return gulp.src([
        "src/misc/pgp"
    ]).pipe(gulp.dest(dir.dist ));
}

function distReplaceTokens() {
    return gulp.src(dir.dist + "/**/*.ptd") 
        .pipe(tokenReplacer(tokens))
        .pipe(gulpRename(function(path) {
            path.extname = path.extname.replace(".ptd", ""); // remove the ptd extension from the files
        }))
        .pipe(gulp.dest(dir.dist));
}

function dist() {
    return gulp.series(
        gulp.parallel(distCss, distJs, distImg, distRes, distMisc, nunjucks(), distLib),
        distReplaceTokens
    );
}

function clean() {
    return gulp.parallel(distClean, stageClean)
}

exports.nunjucks = nunjucks();
exports.dist = dist();
exports.restore = gulp.parallel(restoreFontAwesome, restoreBulma, restoreVue);
exports.clean = clean();

