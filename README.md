# gulp-jsont

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  [![NPM License][license-image]][license-url]
  
JSON transformation plugin for Gulp based on [JSONT](http://goessner.net/articles/jsont/) by Stefan Goessner.

## Usage

```js
var jsont = require('gulp-jsont');

gulp.task('jsont', function() {
    gulp.src('*.json')
        .pipe(jsont('template.json'))
        .pipe(gulp.dest('./build/'));
});
```


[npm-image]: https://img.shields.io/npm/v/gulp-jsont.svg
[npm-url]: https://npmjs.org/package/gulp-jsont
[downloads-image]: https://img.shields.io/npm/dm/gulp-jsont.svg
[downloads-url]: https://npmjs.org/package/gulp-jsont
[license-image]: https://img.shields.io/npm/l/gulp-jsont.svg
[license-url]: https://npmjs.org/package/gulp-jsont
