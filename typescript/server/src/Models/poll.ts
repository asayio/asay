export class Poll{
    public id : number;
    public dueDate : Date;
    public platformScorePro : number;
    public platformScoreCon : number;
    public parlementScorePro : number;
    public parlementScoreCon : number;
    public userVote : UserVote;
    public status : Status;
}