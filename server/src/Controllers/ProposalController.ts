import {Router, Request, Response, NextFunction} from 'express';
const Message = '[ "Hello from Proposals", "Message 2"]';

export class ProposalsController {
  router: Router

  /**
   * Initialize the HeroRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Heroes.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.setHeader('Content-Type', 'application/json');
    res.send(Message);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
  }

}

// Create the HeroRouter, and export its configured Express.Router
const proposalsController = new ProposalsController();
proposalsController.init();

export default proposalsController.router;