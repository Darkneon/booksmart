import * as os from "os";

var fs = require('fs');
const { promisify } = require("util");

import {Tag} from "../tags";
import {Bookmark} from "../bookmarks";
import {loadRecords} from "./load-records";
import * as path from "path";

const db: Bookmark[] = [];


interface insertArgs {
    url: string,
    quote: string,
    tags: Tag[]
}

export const insert = async ({url, quote, tags}: insertArgs) => {
    const id = db.length + 1;
    const record = {id, url, quote, tags, createdDate: Date.now()};
    db.push(record);

    const appendFile = promisify(fs.appendFile);
    await appendFile(path.join(__dirname, '..', 'records'), JSON.stringify(record) + os.EOL);

    return record;
};

interface findArgs {
    tags: string[]
}

export const find = ({tags}: findArgs) => {
    return db.filter(bookmark => hasTag(bookmark.tags, tags));
};

export const all = () => {
    return db;
};

function hasTag(dbTags: Tag[] = [], tags: string[] = []) {
    if (!dbTags || dbTags.length === 0) {
        return false;
    }

    const namesOnly = dbTags.map(x => x.name);
    return !!tags
        .map(t => !!namesOnly.includes(t))
        .find(t => t);
}

export function loadDB() {
    loadRecords(db, path.join(__dirname, '..', 'records'));
}