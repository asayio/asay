import { Attachment } from "./attachment";
import { Poll } from "./poll";
import { Article } from "./article";

export class Proposal {
    public refNumber : number; //Natural ID
    public title : string;
    public type : string;
    public session : string;
    public tags : string[];
    public attachments : Attachment[];
    public polls : Poll[];
    public articles : Article[];
}