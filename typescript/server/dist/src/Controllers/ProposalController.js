"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const basicService_1 = require("../Services/basicService");
const proposalDataAccess_1 = require("../DataAccess/proposalDataAccess");
const Message = '[ "Hello from Proposals", "Message 2"]';
class ProposalsController {
    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all Heroes.
     */
    getAll(req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        var dataAccess = new proposalDataAccess_1.ProposalDataAccess();
        var basicService = new basicService_1.BasicService(dataAccess);
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
exports.ProposalsController = ProposalsController;
// Create the HeroRouter, and export its configured Express.Router
var controller = new ProposalsController();
const proposalsController = controller;
exports.default = proposalsController.router;
