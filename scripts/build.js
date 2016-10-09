const fs = require('fs')
const path = require('path')
const pug = require('pug')

const langParamIndex = process.argv.indexOf("-l")
let lang = 'zh'
if (langParamIndex) {
  lang = process.argv[langParamIndex + 1]; 
  process.argv.splice(langParamIndex, 2);  
}

const baseDir = process.argv[2];
const translations = require(`../resources/${lang}/translations.json`);
const targetDir = `${process.argv[3]}/${lang}`;


fs.readdir(baseDir, (err, items) => {
  for (var i=0; i<items.length; i++) {
    const base = items[i]
    const fileName = path.parse(base).name
    const file = path.format({
      dir: baseDir,
      base: base
    });
    const targetFile = path.format({
      root: './',
      dir: targetDir,
      name: fileName,
      ext: ".html"
    })

    // render into html
    const html = pug.renderFile(file, {
      translate: function(text){ return translations[text]; }
    })

    fs.writeFile(targetFile, html, (err) => {
      if(err) {
        return console.log(err);
      }
    })
  }
});
