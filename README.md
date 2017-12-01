# gulp-jsont

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  [![NPM License][license-image]][license-url]
  
JSON transformation plugin for Gulp based on [JSONT](http://goessner.net/articles/jsont/) by Stefan Goessner.

## Usage

```js
var jsont = require('gulp-jsont');

gulp.task('jsont', function() {
    gulp.src('example.json')
        .pipe(jsont('template.json'))
        .pipe(gulp.dest('./build/'));
});
```

#### example.json

```json
{
  "link": {
    "uri": "http://company.com",
    "title":"company homepage"
  }
}
```

#### template.json

```json
{
  "link": "<a href=\"{link.uri}\">{link.title}</a>"
}
```

#### Results

```<a href="http://company.com">company homepage</a>```

#### More information

Here is the documentation got JSONT library: http://goessner.net/articles/jsont/


[npm-image]: https://img.shields.io/npm/v/gulp-jsont.svg
[npm-url]: https://npmjs.org/package/gulp-jsont
[downloads-image]: https://img.shields.io/npm/dm/gulp-jsont.svg
[downloads-url]: https://npmjs.org/package/gulp-jsont
[license-image]: https://img.shields.io/npm/l/gulp-jsont.svg
[license-url]: https://npmjs.org/package/gulp-jsont
