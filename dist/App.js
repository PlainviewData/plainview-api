"use strict";
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const colors = require('colors');
const mongoose = require("mongoose");
const tools = require('./etc/tools');
const QuoteRouter_1 = require('./controllers/QuoteRouter');
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.dbConfig = new tools.databaseConfig();
        this.connection = mongoose.createConnection(this.dbConfig.database_uri, { useMongoClient: true });
        this.middleware();
        this.routes();
        this.connection.on('connected', function () {
            console.log(colors.green('Connected successfully to Mongo database!'));
            mongoose.connection.close();
        });
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        router.get('/', (req, res, next) => {
            res.redirect('http://www.github.com/plainviewdata/plainview-api');
        });
        this.express.use('/', router);
        this.express.use('/quotes', QuoteRouter_1.default);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App().express;
