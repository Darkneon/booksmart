import * as os from "os";

const fs = require('fs');
const { promisify } = require("util");

import {Tag} from "../tags";
import {Bookmark} from "../bookmarks";
import {loadRecords} from "./load-records";
import * as path from "path";

const db: Bookmark[] = [];

export const insert = async (bookmark: Bookmark) => {
    const id = db.length + 1;
    const record = Object.assign(bookmark, {
        attributes: { id, createdDate: Date.now() }
    });

    db.push(record);

    const appendFile = promisify(fs.appendFile);
    await appendFile(path.join(__dirname, '..', 'db-records'), JSON.stringify(record) + os.EOL);

    return record;
};

interface findArgs {
    tags: string[]
}

export const find = ({tags}: findArgs) => {
    return db.filter(record => hasTag(record.tags, tags));
};

export const all = () => {
    return db;
};

export const search = ({keywords, tags = [], excludeTags = []}): Bookmark[] => {
    const result = new Set<Bookmark>();

    const tokensKeywords = keywords.split(' ');

    console.log(keywords, tags, db.length);
    for (let bookmark of db) {
        if (has(bookmark, tokensKeywords)) {
            result.add(bookmark);
        } else if (hasTags(bookmark, tags) && !hasTags(bookmark, excludeTags) ) {
            result.add(bookmark);
        }
    }

    return Array.from(result);
};

function hasTags(bookmark, words) {
    for (let keyword of words) {
        if (!keyword) { continue }

        if (bookmark.tags.find(t => t.name === keyword)) {
            return true;
        }
    }

    return false;
}
function has(bookmark, words) {
    for (let keyword of words) {
        if (!keyword) { continue }

        if ((bookmark.note || '').indexOf(keyword) >= 0) {
            return true;
        }

        if ((bookmark.quote || '').indexOf(keyword) >= 0) {
            return true;
        }
    }

    return false;
}

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
    loadRecords(db, path.join(__dirname, '..', 'db-records'));
}