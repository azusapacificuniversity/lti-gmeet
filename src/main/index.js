const express = require('express')
const fs = require('fs');
const path = require('path');
const env = require('./env.js');
const exegesisExpress = require('exegesis-express');
const exegesisContext = require('exegesis-plugin-context');
const pathApi = 'api/api.yaml';
const bodyParser = require('body-parser');
const handlebars = require('handlebars');
const LtiMeet = require('./classes/LtiMeet.js');
const knex = env.createKnexConn()

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

    const exegesisMiddleware = await exegesisExpress.middleware(
        path.resolve(__dirname, pathApi),
        options
    );

    const app = express()
    const port = 3000

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use('/api/v1', exegesisMiddleware);

    app.get('/spec', (req, res) => {
        fs.readFile(path.resolve(__dirname + "/" + pathApi), function(err,
            data) {
            res.setHeader('Content-type', 'text/plain');
            res.send(data);
        })
    });

    app.post('/html', async (req, res) => {
        let ltiMeet = new LtiMeet(env.createGCal(), env.createStoreRepo(knex));
        console.log(req.body);
        let meet = await ltiMeet.meetByClassId(req.body.custom_canvas_course_id);

        var source = fs.readFileSync(path.resolve(__dirname + "/views/index.html"));
        var template = handlebars.compile(source);

        var result = template(meet);

        res.send(result);
    });

    app.use((req, res) => {
        res.status(404).json({
            message: `Not found`
        });
    });

    app.listen(port, () => console.log(`Google Meet LTI app listening on port ${port}!`))
}

startServer();