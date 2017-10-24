import {Router, Request, Response, NextFunction} from 'express';

export class ArchiveRouter {
  router: Router

  /**
   * Initialize the ArchiveRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET Archive by id.
   */
  public getById(req: Request, res: Response, next: NextFunction) {
    res.send("TBD");
  }

  /**
   * POST new Archive.
   */
  public postNew(req: Request, res: Response, next: NextFunction) {
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

// Create the ArchiveRouter, and export its configured Express.Router
const archiveRoutes = new ArchiveRouter();
archiveRoutes.init();

export default archiveRoutes.router;