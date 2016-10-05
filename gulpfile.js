var gulp = require("gulp");
var tslint = require("gulp-tslint");

var typescript = require('gulp-tsc');
 
gulp.task('tsc', function(){
  gulp.src(["public/**/*.ts", "server.ts","app/**/*.ts"])
    .pipe(typescript({
        "target": "es5",
        "module": "commonjs",
        "moduleResolution": "node",
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "removeComments": false,
        "noImplicitAny": false,
        "exclude": [
            "node_modules",
            "**/*.d.ts"
        ]
}))
    .pipe(gulp.dest('.'))
});

gulp.task("tslint", () =>
   gulp.src(["public/**/*.ts", "server.ts","app/**/*.ts"])
    .pipe(tslint({
        configuration : "tslint.json",
        formatter: "verbose"
    }))
    .pipe(tslint.report())
);