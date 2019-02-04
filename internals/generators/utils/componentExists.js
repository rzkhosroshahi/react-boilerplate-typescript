/**
 * componentExists
 *
 * Check whether the given component exist in either the components or components directory
 */

const fs = require('fs');
const path = require('path');
const pageComponents = fs.readdirSync(
  path.join(__dirname, '../../../app/components'),
);
// const pageContainers = fs.readdirSync(
//   path.join(__dirname, '../../../app/components'),
// );

const modules = fs.readdirSync(path.join(__dirname, '../../../app/modules'));
const pages = fs.readdirSync(path.join(__dirname, '../../../app/pages'));
const components = pageComponents.concat(modules).concat(pages);

function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

module.exports = componentExists;
