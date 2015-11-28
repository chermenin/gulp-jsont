'use strict';

var gutil = require('gulp-util');
var fs = require('fs');
var es = require('event-stream');
var _eval = require('eval');

module.exports = function(template) {
  if (!template) throw new Error('Template option missing');

  var json;
  try {
    json = _eval("module.exports = function (fs, require) { return " + fs.readFileSync(template, 'utf8') + "; };");
  } catch (e) {
    throw new Error(e.message);
  }

  function jsonT(self, rules) {
     var T = {
        output: false,
        init: function() {
           for (var rule in rules)
              if (rule.substr(0,4) != "self")
                 rules["self."+rule] = rules[rule];
           return this;
        },
        apply: function(expr) {
           var trf = function(s){ return s.replace(/{([A-Za-z0-9_\$\.\[\]\'@\(\)]+)}/g,
                                    function($0,$1){return T.processArg($1, expr);})},
               x = expr.replace(/\[[0-9]+\]/g, "[*]"), res;
           if (x in rules) {
              if (typeof(rules[x]) == "string")
                 res = trf(rules[x]);
              else if (typeof(rules[x]) == "function")
                 res = trf(rules[x](eval(expr)).toString());
           }
           else
              res = T.eval(expr);
           return res;
        },
        processArg: function(arg, parentExpr) {
           var expand = function(a,e){return (e=a.replace(/^\$/,e)).substr(0,4)!="self" ? ("self."+e) : e; },
               res = "";
           T.output = true;
           if (arg.charAt(0) == "@")
              res = eval(arg.replace(/@([A-za-z0-9_]+)\(([A-Za-z0-9_\$\.\[\]\']+)\)/,
                                     function($0,$1,$2){return "rules['self."+$1+"']("+expand($2,parentExpr)+")";}));
           else if (arg != "$")
              res = T.apply(expand(arg, parentExpr));
           else
              res = T.eval(parentExpr);
           T.output = false;
           return res;
        },
        eval: function(expr) {
           var v = eval(expr), res = "";
           if (typeof(v) != "undefined") {
              if (v instanceof Array) {
                 for (var i=0; i<v.length; i++)
                    if (typeof(v[i]) != "undefined")
                       res += T.apply(expr+"["+i+"]");
              }
              else if (typeof(v) == "object") {
                 for (var m in v)
                    if (typeof(v[m]) != "undefined")
                       res += T.apply(expr+"."+m);
              }
              else if (T.output)
                 res += v;
           }
           return res;
        }
     };
     return T.init().apply("self");
  }

  function modifyContents(file, cb) {

    function throwError(message) {
      return cb(new gutil.PluginError('gulp-jsont', message));
    }

    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return throwError('Streaming not supported');
    }

    if (file.isBuffer()) {
      try {
        var document = JSON.parse(String(file.contents));
        file.contents = new Buffer(jsonT(document, json(fs, require)));
      } catch (e) {
        return throwError(e.message);
      }
    }
    return cb(null, file);
  }

  return es.map(modifyContents);
};
