import { Proposal } from "../Models/proposal";

export interface IBasicService{
    getProposals() : Proposal[];
}