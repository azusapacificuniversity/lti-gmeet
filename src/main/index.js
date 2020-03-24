const express = require('express')
const fs = require('fs');
const path = require('path');
const env = require('./env.js');
const exegesisExpress = require('exegesis-express');
const exegesisContext = require('exegesis-plugin-context');
const pathApi = 'api/api.yaml';
const pathViews = 'views/views.yaml';
const bodyParser = require('body-parser');
const Views = require('./classes/views.js');
const LtiMeet = require('./classes/LtiMeet.js');

const knex = env.createKnexConn()
const views = new Views();
const yaml = require('js-yaml');

async function startServer() {
    const options = {
        plugins: [
            exegesisContext({
                knex: knex,
                views: views
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

async function readYaml() {
    try {
        let file = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname + "/" + pathApi), 'utf8'));
        let obj = file.paths;
        Object.keys(obj).forEach(function(key) {
            let path = obj[key];
            let methods = Object.keys(path);
            for (let i = 0; i < methods.length; i++) {
                let method = methods[i];
                let endpoint = obj[key][methods[i]];
                let description = endpoint.description;
                let summary = endpoint.summary;
                if (endpoint.parameters) {
                    let params = endpoint.parameters;
                    for (let j = 0; j < params.length; j++) {
                        let param_name = params[j].name;
                        let param_desc = params[j].description;
                    }
                }
                let responses = endpoint.responses;
                let codes = Object.keys(responses);
                for (let k = 0; k < codes.length; k++){
                    let code = codes[k];
                    let code_desc = responses[code].description;
                }
            }
        });
    } catch (err) { throw err; }
}

startServer();
readYaml();
