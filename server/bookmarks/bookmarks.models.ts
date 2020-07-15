import {Tag} from "../tags";

export interface Bookmark {
    id: number;
    url: string;
    quote: string;
    tags: Tag[];
}