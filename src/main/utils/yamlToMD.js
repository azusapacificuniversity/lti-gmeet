const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const findYamlFiles = require('./findYamlFiles.js');

const ProjRoot = path.resolve(`${__dirname}../../../`);

// Read and Parse YAML files
const filePaths = findYamlFiles(ProjRoot);

// Loop through YAML files
for (let i = 0; i < filePaths.length; i++) {
  try {
    const json_specs = {
      file: path.basename(filePaths[i]),
      specs: parseYAML(yaml.safeLoad(fs.readFileSync(filePaths[i], 'utf8'))),
    };
  } catch (err) {
    throw err;
  }
}

// Parse YAML file
function parseYAML(file) {
  const obj = file.paths;
  const specs = [];
  Object.keys(obj).forEach((key) => {
    const path = key;
    const methods = Object.keys(obj[key]);
    for (let i = 0; i < methods.length; i++) {
      const endpoint = obj[key][methods[i]];
      console.log(`\n### ${path} - ${methods[i].toUpperCase()}\n`);
      console.log(`Summary: ${formatString(endpoint.summary)}`);
      console.log(`Description: ${formatString(endpoint.description)}`);
      const parameters = [];
      console.log('#### Parameters');
      if (endpoint.parameters) {
        for (let j = 0; j < endpoint.parameters.length; j++) {
          console.log(` - ##### ${endpoint.parameters[j].name}`);
          console.log(`  - Description: ${endpoint.parameters[j].description}`);
          console.log(`  - Required: ${endpoint.parameters[j].required}`);
          console.log(`  - Data Type: ${endpoint.parameters[j].schema.type}`);
          parameters.push({
            param: endpoint.parameters[j].name,
            description: endpoint.parameters[j].description,
            required: endpoint.parameters[j].required,
            data_type: endpoint.parameters[j].schema.type,
          });
        }
      } else {
        console.log('None');
      }
      const codes = Object.keys(endpoint.responses);
      const responses = [];
      console.log('\n#### Responses');
      for (let k = 0; k < codes.length; k++) {
        console.log(` - **Status Code: ${codes[k]}**`);
        console.log(`  - Description: ${endpoint.responses[codes[k]].description}`);
        responses.push({
          code: codes[k],
          description: endpoint.responses[codes[k]].description,
        });
      }
      specs.push({
        path,
        method: methods[i],
        description: formatString(endpoint.description),
        summary: formatString(endpoint.summary),
        parameters: endpoint.parameters ? parameters : 'none',
        responses,
      });
    }
  });
  return specs;
}

// Format String
function formatString(string) {
  formatted_string = string.replace(/(\r\n|\n|\r)/gm, ' ');
  last_char = formatted_string.length - 1;
  return formatted_string[last_char] == ' ' ? formatted_string.substring(0, last_char) : formatted_string;
}
