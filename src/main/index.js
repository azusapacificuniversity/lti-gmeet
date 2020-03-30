const express = require('express');
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

const knex = env.createKnexConn();
const views = new Views();
const oAuth1Sign = env.createOAuth1Sign();

async function startServer() {
    const options = {
        plugins: [
            exegesisContext({
                knex: knex,
                views: views,
                oAuth1Sign: oAuth1Sign
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
    const app = express();
    const port = 3000;

    app.set('trust proxy', true);
    app.use(require('./session.js'));

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
        });
    });

    app.use((req, res) => {
        res.status(404).json({
            message: `Not found`
        });
    });

    app.listen(port, () => console.log(`Google Meet LTI app listening on port ${port}!`))
}

startServer();
