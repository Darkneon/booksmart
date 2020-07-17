import {InMemoryCache, NormalizedCacheObject} from "apollo-cache-inmemory";
import {ApolloClient} from "apollo-client";
import { HttpLink } from 'apollo-link-http';
import gql from "graphql-tag";
import debounce from 'lodash.debounce';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:3000/'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link
});

type ID = number | string;

interface Bookmark {
    id: ID;
    title: string;
    note: string;
    tags: {name: string}[];
    quote: string;
    date: Date;
    url: URL;
}


const state = {
    primary: [],
    secondary: []
};

async function loadAllBookmarks() {
    const result = await client.query({
        query: gql`
            query GetBookmarks {
                bookmarks {
                    note,
                    title,
                    url,
                    quote,
                    tags {name}                     
                }
        }`
    });

    state.primary = result.data && result.data.bookmarks || [];
    renderList('list-primary', state.primary);
}

async function execSearch() {
    const editor = document.getElementById('editor');
    const result = await client.query({
        query: gql(`
            query Search {
            ${editor.innerText} {
                    title,
                    quote,
                    url,
                    note
                    tags {name}
                }
            }`)
    }) ;

    state.primary = result.data && result.data.search || [];
    renderList('list-primary', state.primary);
    renderList('list-secondary', []);
}

async function execSearchExcludeTags(tags, excludetags) {
    const result = await client.query({
        query: gql(`
            query Search {
                search (
                    keywords: ""                        
                    tags: [${tags.map(t => `"${t}"`).join(',')}]
                    excludeTags: [${excludetags.map(t => `"${t}"`).join(',')}]                   
                ) {        
                    title,
                    quote,
                    url,
                    note
                    tags {name}
                }
            }`)
    }) ;

    state.secondary = result.data && result.data.search || [];
    renderList('list-secondary', state.secondary);
}

window.addEventListener('DOMContentLoaded', async () => {
    await loadAllBookmarks();
    const editor = document.getElementById('editor');
    editor.addEventListener('input',  debounce(execSearch, 350, { 'maxWait': 1000 }));
});

const getSecondaryList = () => document.getElementById('list-secondary');

function extractArguments(queryGQL) {
    if (queryGQL.definitions.length > 0) {
        return queryGQL.definitions[0].selectionSet.selections[0].arguments[1].value.values.map(x => x.value);
    }
}

function onNoteClicked(bookmark: Bookmark) {
    return async function () {
        getSecondaryList().style.display = 'block';
        const editor = document.getElementById('editor');
        const query = gql(`
            query Search {
            ${editor.innerText} {
                    title,
                    quote,
                    url,
                    note
                    tags {name}
                }
            }`);

        const excludeArgs =  extractArguments(query);
        let tags = [];
        for (let tag of bookmark.tags.map(t => t.name)) {
            if (excludeArgs.indexOf(tag) === -1) {
                tags.push(tag);
            }
        }

        await execSearchExcludeTags(tags, excludeArgs);
    }
}

function renderList(containerId: string, bookmarks: Bookmark[]) {
    const container = document.getElementById(containerId);
    let child = container.firstChild;
    while (child) {
        container.removeChild(child);
        child = container.firstChild;
    }

    bookmarks.forEach(bookmark => {
        const template = (document.querySelector('#template-list-item-bookmark') as HTMLTemplateElement);
        const fragment = template.content.cloneNode(true) as HTMLElement;

        const quote = fragment.querySelector('.quote');
        quote.textContent = `"${bookmark.quote}"`;

        const note = fragment.querySelector('.note');
        note.textContent = bookmark.note;

        const details = fragment.querySelector('.list-item-bookmark-details');
        details.addEventListener('click', onNoteClicked(bookmark));

        const title = fragment.querySelector('.title') as HTMLAnchorElement;
        title.textContent = bookmark.title;
        if (bookmark.url) {
            title.href = (new URL(bookmark.url.toString())).href;
        }


        if (bookmark.tags) {
            fragment.querySelector('.tags').textContent = bookmark.tags.map(t => `[${t.name}]`).join(' ');
        }

        container.appendChild(fragment);
    });
}