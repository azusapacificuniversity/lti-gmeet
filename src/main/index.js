const express = require('express');
const fs = require('fs');
const path = require('path');
const exegesisExpress = require('exegesis-express');
const exegesisContext = require('exegesis-plugin-context');

const bodyParser = require('body-parser');
const env = require('./env.js');
const Views = require('./classes/views.js');
const session = require('./classes/session.js');

const pathApi = 'api/api.yaml';
const pathViews = 'api/views.yaml';

// create environment
const knex = env.createKnexConn();
const views = new Views();
const oAuth1Sign = env.createOAuth1Sign();

async function startServer() {
  // set options for exegesis
  const options = {
    plugins: [
      exegesisContext({
        knex,
        views,
        oAuth1Sign,
      }),
    ],
    controllers: path.resolve(__dirname, './controllers'),
    allowMissingControllers: false,
  };

  // initialize exegesis for api.yaml
  const exegesisApiMiddleware = await exegesisExpress.middleware(
    path.resolve(__dirname, pathApi),
    options,
  );

  // initialize exegesis for views.yaml
  const exegesisViewsMiddleware = await exegesisExpress.middleware(
    path.resolve(__dirname, pathViews),
    options,
  );

  // initialize express
  const app = express();
  const port = 3000;

  app.set('trust proxy', true);
  app.use(session);

  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  // configure express
  app.use(express.static(path.resolve(`${__dirname}/static`)));
  app.use('/api/v1', exegesisApiMiddleware);
  app.use(exegesisViewsMiddleware);

  app.get('/spec', (req, res) => {
    fs.readFile(path.resolve(`${__dirname}/${pathApi}`), (err,
      data) => {
      res.setHeader('Content-type', 'text/plain');
      res.send(data);
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  // start listening to port 3000 through express
  app.listen(port, () => console.log(`Google Meet LTI app listening on port ${port}!`));
}

startServer();
