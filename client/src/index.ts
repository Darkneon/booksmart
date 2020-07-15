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

async function execQuery() {
    const editor = document.getElementById('editor');

    const result = await client.query({
        query: gql`
            query GetBookmarks {
                bookmarks {
                    id,
                    url,
                    quote,
                    tags {name}
                }
        }`
    });

    state.primary = result.data && result.data.bookmarks || [];
    renderList('list-primary', state.primary);
}

window.addEventListener('DOMContentLoaded', async () => {
    await execQuery();
    const editor = document.getElementById('editor');
    editor.addEventListener('input',  debounce(execQuery, 250, { 'maxWait': 1000 }));
});

const getSecondaryList = () => document.getElementById('list-secondary');

function onNoteClicked(id: ID) {
    return function () {
        getSecondaryList().style.display = 'block';
        renderList('list-secondary', state.secondary);
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

        const note = fragment.querySelector('.note');
        note.textContent = bookmark.note;
        note.addEventListener('click', onNoteClicked(bookmark.id));

        const title = fragment.querySelector('.title') as HTMLAnchorElement;
        title.textContent = bookmark.url.toString();
        title.href = (new URL(bookmark.url.toString())).href;

        if (bookmark.tags) {
            fragment.querySelector('.tags').textContent = bookmark.tags.map(t => `[${t.name}]`).join(' ');
        }

        container.appendChild(fragment);
    });
}