// Based off of code found here (recursive example):
// https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js

const fs = require('fs');
const path = require('path');

function isYamlFile(file) {
  return (path.extname(file) === '.yaml');
}

function getYamlFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
      if (file !== 'node_modules') {
        arrayOfFiles = getYamlFiles(`${dirPath}/${file}`, arrayOfFiles);
      }
    } else if (isYamlFile(file)) {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  });

  return arrayOfFiles;
}

module.exports = getYamlFiles;
