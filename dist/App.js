"use strict";
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const apiInfo = fs.readFileSync("api.json");
const ArchiveRouter_1 = require('./controllers/ArchiveRouter');
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
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
            res.json(apiInfo);
        });
        this.express.use('/', router);
        this.express.use('/api/v1/archives', ArchiveRouter_1.default);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App().express;
