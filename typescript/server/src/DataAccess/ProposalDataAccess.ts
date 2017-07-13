import { IDataAccess } from "./iDataAccess";
import { Proposal } from "../Models/proposal";

export class ProposalDataAccess implements IDataAccess<Proposal> { 
    
    constructor(){

    }

    read() : Proposal[]{
        return new Array<Proposal>();
    }
}