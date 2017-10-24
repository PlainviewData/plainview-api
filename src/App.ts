import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as colors from 'colors';
import mongoose = require("mongoose");

import * as tools from './etc/tools';
import QuoteRouter from './controllers/QuoteRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  public dbConfig: tools.databaseConfig;
  public connection: mongoose.Connection;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.dbConfig = new tools.databaseConfig();
    this.connection  = mongoose.createConnection(this.dbConfig.database_uri, { useMongoClient: true });
    this.middleware();
    this.routes();
    this.connection.on('connected', function () {  
      console.log(colors.green('Connected successfully to Mongo database!'));
    });
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
      res.redirect('http://www.github.com/plainviewdata/plainview-api');
    });
    this.express.use('/', router);
    this.express.use('/quotes', QuoteRouter);
  }

}

export default new App().express;