var fs = require('fs');
var path = require('path');
var UglifyJS = require('uglify-js');
var sourcePath = path.resolve(__dirname, './src/index.js');
var indexPath = path.resolve(__dirname, './index.html');
var log = function (text) {

  return console.log(text); // eslint-disable-line no-console

};

log('Creating bookmarklet from ' + sourcePath + '.');
log('Minified JavaScript will be as follows.');

var code = UglifyJS.minify(sourcePath).code;

log('');
log(code);
log('');

var link = 'javascript:' + encodeURI(code);

var indexHtml = [
  '<!DOCTYPE html>', '<html lang="en">',
  '<head>',
  '<meta charset="utf-8">', '<title>Forceboard Bookmarklet</title>',
  '</head>',
  '<body>',
  '<h1>Drag and drop this sweet bookmarklet to your bookmarks bar, if you so dare ;)</h1>',
  '<p>',
  '<a href="' + link + '"><img src="./bookmark.png" alt="Activate Forceboard!"/></a>',
  '<br>',
  'Then navigate to some Salesforce Dashboard and click on the bookmark to activate!',
  '<br>',
  'The source code is available on <a href="https://github.com/janraasch/forceboard-bookmarklet">GitHub</a>.',
  '</p>',
  '</body>',
  '</html>'
].join('');

log('Generating index.html.');

fs.writeFileSync(indexPath, indexHtml);

log('Done.');
