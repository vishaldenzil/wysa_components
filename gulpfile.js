const gulp = require("gulp");
const babel = require("gulp-babel");
const cleanCSS = require("gulp-clean-css");
const imagemin = require('gulp-imagemin');
const del = require("del");

// output destination
const destination = "./build";

gulp.task("default", () =>
  gulp
    .src("src/components/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env", "@babel/preset-react"],
        plugins: ["@babel/plugin-proposal-class-properties"],
      })
    )
    .pipe(gulp.dest(destination))
);

gulp.task("css", (done) => {
  gulp
    .src("src/components/**/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest(destination));
  done();
});

gulp.task("assets", (done) => {
  gulp.src("src/Assets/*").pipe(imagemin()).pipe(gulp.dest(`${destination}/Assets`));
  done();
});

gulp.task("clean", () => {
  return del(`${destination}/**`, { force: true });
});
