var gulp = require("gulp");
var tslint = require("gulp-tslint");

gulp.task("tslint", () =>
   gulp.src(["public/**/*.ts", "server.ts","app/**/*.ts"])
    .pipe(tslint({
        configuration : "tslint.json",
        formatter: "verbose"
    }))
    .pipe(tslint.report())
);