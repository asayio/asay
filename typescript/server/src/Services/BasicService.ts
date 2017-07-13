import { IBasicService } from "./iBasicService";
import { Proposal } from "../Models/proposal";
import { IDataAccess } from "../DataAccess/iDataAccess";
import { ProposalDataAccess } from "../DataAccess/proposalDataAccess";


export class BasicService implements IBasicService {

    constructor(private dataAccess: ProposalDataAccess){

    }

    getProposals() : Proposal[]{
        // return new Array<Proposal>();
        return this.dataAccess.read();
    }




}