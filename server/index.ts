import * as path from "path";
import * as fs from "fs";

import * as http from "http";
import * as httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer({});

let root = {
    '/': {filename: 'index.html', contentType: 'text/html'},
};

let files = {
    '/index.js': {filename: 'index.js', contentType: 'text/javascript'}
};

http.createServer(function(req, res) {
    console.debug(`${req.method} ${req.url}`);
    if (req.method === 'GET' && (req.url === '/' || Object.keys(files).includes(req.url))) {
        const { filename, contentType } = root[req.url] || files[req.url];
        const filepath = path.join(__dirname, '..', 'client', 'src', filename);
        fs.readFile(filepath, function (err, buf) {
            if (err) {
                return res.end({error: err.message});
            }

            console.debug(`Response: 200 ${filepath}`);

            res.setHeader('Content-Type', contentType);
            res.end(buf);
        });
    } else {
        // GraphQL
    }
}).listen(3000, () => console.log('Running on 3000'));

