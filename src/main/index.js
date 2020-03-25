const express = require('express')
const fs = require('fs');
const path = require('path');
const env = require('./env.js');
const exegesisExpress = require('exegesis-express');
const exegesisContext = require('exegesis-plugin-context');
const pathApi = 'api/api.yaml';
const pathViews = 'views/views.yaml';
const bodyParser = require('body-parser');
const handlebars = require('handlebars');
const LtiMeet = require('./classes/LtiMeet.js');
const knex = env.createKnexConn()
const yaml = require('js-yaml');

async function startServer() {
    const options = {
        plugins: [
            exegesisContext({
                knex: knex
            })
        ],
        controllers: path.resolve(__dirname, './controllers'),
        allowMissingControllers: false,
    };

    const exegesisApiMiddleware = await exegesisExpress.middleware(
        path.resolve(__dirname, pathApi),
        options
    );

    const exegesisViewsMiddleware = await exegesisExpress.middleware(
        path.resolve(__dirname, pathViews),
        options
    );
    const app = express()
    const port = 3000

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(express.static(path.resolve(__dirname + '/static')));
    app.use('/api/v1', exegesisApiMiddleware);
    app.use(exegesisViewsMiddleware);

    app.get('/spec', (req, res) => {
        fs.readFile(path.resolve(__dirname + "/" + pathApi), function(err,
            data) {
            res.setHeader('Content-type', 'text/plain');
            res.send(data);
        })
    });

    app.use((req, res) => {
        res.status(404).json({
            message: `Not found`
        });
    });

    app.listen(port, () => console.log(`Google Meet LTI app listening on port ${port}!`))
}

startServer();


// Read and Parse YAML files
const filePaths = process.argv.slice(2);

for (let i = 0; i < filePaths.length; i++) {
    try {
        let json_specs = {
            file: path.basename(filePaths[i]),
            specs: readYaml(yaml.safeLoad(fs.readFileSync(filePaths[i], 'utf8')))
        };
        console.logs(json_specs);
    } catch (err) { throw err; }
}

function readYaml(file) {
    let obj = file.paths;
    let specs = [];
    Object.keys(obj).forEach(function(key) {
        let path = key;
        let methods = Object.keys(obj[key]);
        for (let i = 0; i < methods.length; i++) {
            let endpoint = obj[key][methods[i]];
            let parameters = [];
            if (endpoint.parameters) {
                for (let j = 0; j < endpoint.parameters.length; j++) {
                    parameters.push({
                        param: endpoint.parameters[j].name,
                        description: endpoint.parameters[j].description,
                        required: endpoint.parameters[j].required,
                        data_type: endpoint.parameters[j].schema.type
                    })
                }
            }
            let codes = Object.keys(endpoint.responses);
            let responses = [];
            for (let k = 0; k < codes.length; k++){
                responses.push({
                    code: codes[k],
                    description: endpoint.responses[codes[k]].description
                })
            }
            specs.push({
                path: path,
                method: methods[i],
                description: formatString(endpoint.description),
                summary: formatString(endpoint.summary),
                parameters: endpoint.parameters ? parameters : "none",
                responses: responses
            });
        }
    });
    return specs;
}

function formatString(string) {
    formatted_string = string.replace(/(\r\n|\n|\r)/gm," ");
    last_char = formatted_string.length - 1;
    return formatted_string[last_char] == ' ' ? formatted_string.substring(0, last_char) : formatted_string;
}
