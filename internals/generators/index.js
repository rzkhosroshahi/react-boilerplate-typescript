/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const componentGenerator = require('./component/index.js');
// const containerGenerator = require('./container/index.js');
const pagesGenerator = require('./pages/index');
const languageGenerator = require('./language/index.js');
const modulesGenerator = require('./modules/index');

module.exports = plop => {
  plop.setGenerator('component', componentGenerator);
  // plop.setGenerator('container', containerGenerator);
  plop.setGenerator('language', languageGenerator);
  plop.setGenerator('modules', modulesGenerator);
  plop.setGenerator('pages', pagesGenerator);

  plop.addHelper('directory', comp => {
    try {
      fs.accessSync(
        path.join(__dirname, `../../app/containers/${comp}`),
        fs.F_OK,
      );
      return `containers/${comp}`;
    } catch (e) {
      return `components/${comp}`;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
  plop.setActionType('prettify', (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      '/../../app/',
      config.path,
      plop.getHelper('properCase')(answers.name),
      '**.ts*',
    )}`;
    exec(`npm run prettify -- "${folderPath}"`);
    return folderPath;
  });
};
