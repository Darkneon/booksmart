import * as merge from 'lodash.merge';

import {ApolloServer, gql} from 'apollo-server';
import {bookmarksResolvers, bookmarksTypeDef} from './bookmarks';
import {tagsResolvers, tagsTypeDef} from './tags';
import {recordsTypeDef} from './records';

import * as path from "path";
import * as fs from "fs";

import * as http from "http";
import * as httpProxy from "http-proxy";
import { loadDB } from "./db";

const proxy = httpProxy.createProxyServer({});

const typeDefs = gql`
    type Query {
        _: String
    }
    type Mutation {
        _: String
    }
    type Subscription {
        _: String
    }

    ${recordsTypeDef}
    ${bookmarksTypeDef}
    ${tagsTypeDef}
    
`;

const resolvers = merge({}, bookmarksResolvers, tagsResolvers);
const server = new ApolloServer({ typeDefs, resolvers });

server
    .listen()
    .then(({ url }) => console.log(`Apollo Server is running on ${url}`));


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
        let body = "";
        req.on('data', function(chunk) {
            body += chunk;
        });
        req.on('end', function() {
            if (body !== '') {
                const { variables } = JSON.parse(body);
                console.log(`[HTTP] "${variables.quote}" ${variables.url} ${body}`);
            }
        });

        proxy.web(req, res, {target: 'http://localhost:4000'});
    }
}).listen(3000, () => {
    console.log('HTTP Server is running on http://localhost:3000/');
    loadDB();
});

