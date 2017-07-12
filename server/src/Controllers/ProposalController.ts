import {Router, Request, Response, NextFunction} from 'express';
import { IBasicService } from "../Services/iBasicService";
import { BasicService } from "../Services/basicService";
import { ProposalDataAccess } from "../DataAccess/proposalDataAccess";
import { IDataAccess } from "../DataAccess/iDataAccess";
import { TempService } from "../Services/tempservice";
import Deps = require('ts-dependency-injection');

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
    var dataAccess = new ProposalDataAccess();
    var basicService = new BasicService(dataAccess);
    var result = basicService.getProposals();
    var proposals = JSON.stringify(result);

    res.send(proposals);
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

var controller = new ProposalsController();

const proposalsController = controller;

export default proposalsController.router;