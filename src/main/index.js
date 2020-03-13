const express = require('express')
const fs = require('fs');
const path = require('path');
const exegesisExpress = require('exegesis-express');
const pathApi = 'api/api.yaml';
const bodyParser = require('body-parser');

async function startServer() {
  const options = {
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

  app.use((req, res) => {
    res.status(404).json({
      message: `Not found`
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: `Internal error: ${err.message}`
    });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

startServer();