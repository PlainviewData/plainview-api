"use strict";
const express_1 = require('express');
class QuoteRouter {
    /**
     * Initialize the ArchiveRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET Archive by id.
     */
    getById(req, res, next) {
        res.send("TBD");
    }
    /**
     * POST new Archive.
     */
    postNew(req, res, next) {
        res.send("TBD");
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/:id', this.getById);
        this.router.post('/', this.postNew);
    }
}
exports.QuoteRouter = QuoteRouter;
// Create the ArchiveRouter, and export its configured Express.Router
const quoteRoutes = new QuoteRouter();
quoteRoutes.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = quoteRoutes.router;
