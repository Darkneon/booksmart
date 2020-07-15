import {Bookmark} from "../bookmarks";
import * as fs from "fs";

export function loadRecords(db, filepath) {
    if (!fs.existsSync(filepath)) {
        console.log(`[DB] Loaded: 0 records`);
        return;
    }

    const input = fs.createReadStream(filepath);
    const onNewLine = (line) => pushRecord(db, JSON.parse(line));
    const onEnd = () => console.log(`[DB] Loaded: ${db.length} records`);

    readLines(input, onNewLine, onEnd);
}

function readLines(input, onNewLine, onEnd) {
    let remaining = '';

    input.on('data', function(data) {
        remaining += data;
        let index = remaining.indexOf('\n');
        let last  = 0;
        while (index > -1) {
            const line = remaining.substring(last, index);
            last = index + 1;
            onNewLine(line);
            index = remaining.indexOf('\n', last);
        }

        remaining = remaining.substring(last);
    });

    input.on('end', function() {
        if (remaining.length > 0) {
            onNewLine(remaining);
        }

        onEnd();
    });
}

function pushRecord(db: Bookmark[], record: Bookmark) {
    db.push(record);
}