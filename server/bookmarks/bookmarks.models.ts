import {Tag} from "../tags";
import {Record} from "../records";


export interface Bookmark {
    attributes: Record
    url: string;
    title: string;
    quote: string;
    note: string;
    tags: Tag[];
}