import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
const apiInfo = fs.readFileSync("api.json");

import ArchiveRouter from './controllers/ArchiveRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
private routes(): void {
  let router = express.Router();
  router.get('/', (req, res, next) => {
    res.json(apiInfo);
  });
  this.express.use('/', router);
  this.express.use('/api/v1/archives', ArchiveRouter);
}

}

export default new App().express;