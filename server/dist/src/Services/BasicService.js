"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasicService {
    constructor(dataAccess) {
        this.dataAccess = dataAccess;
    }
    getProposals() {
        // return new Array<Proposal>();
        return this.dataAccess.read();
    }
}
exports.BasicService = BasicService;
